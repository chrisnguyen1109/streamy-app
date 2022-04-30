import { useAuth } from 'hooks';
import { Button, Container, Image, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, logOut } from 'redux/authSlice/actions';
import { authUserSelector } from 'redux/authSlice/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const Navigation: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector(authUserSelector);
    const { signIn, signOut } = useAuth({
        onLogin: response => {
            const user = response.profileObj;
            dispatch(logIn(user));
        },
        onLogout: () => {
            dispatch(logOut());
        },
    });

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="text-white text-decoration-none">
                        Home
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {(() => {
                            if (currentUser) {
                                return (
                                    <div className="d-flex align-items-center gap-1">
                                        <Link
                                            to="/auth/streams/me"
                                            className="text-decoration-none"
                                        >
                                            My streams
                                        </Link>
                                        <NavDropdown title={currentUser.name}>
                                            <NavDropdown.Item className="text-dark d-flex align-items-center gap-2">
                                                {currentUser.name}
                                                <Image
                                                    src={currentUser.imageUrl}
                                                    alt="avatar"
                                                    roundedCircle
                                                    width={30}
                                                    height={30}
                                                />
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() =>
                                                    navigate(
                                                        '/auth/streams/new'
                                                    )
                                                }
                                                className="text-dark"
                                            >
                                                Ctreate new stream
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={signOut}
                                                className="text-dark"
                                            >
                                                Log out
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                );
                            } else {
                                return (
                                    <Button
                                        variant="link"
                                        onClick={signIn}
                                        className="text-white"
                                    >
                                        Sign in
                                    </Button>
                                );
                            }
                        })()}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
