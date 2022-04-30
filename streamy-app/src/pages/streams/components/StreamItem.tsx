import CustomModal from 'components/CustomModal';
import { formatDistanceToNow } from 'date-fns';
import { useFetch } from 'hooks';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authUserSelector } from 'redux/authSlice/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { removeStream } from 'redux/streamsSlice/actions';
import { Stream } from 'types';

interface StreamItemProps {
    stream: Stream;
}

const StreamItem: React.FC<StreamItemProps> = ({ stream }) => {
    const { createdAt, descriptions, title, id, userName, userId } = stream;
    const [showModal, setShowModal] = useState<boolean>(false);
    const { isLoading, queryData } = useFetch();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(authUserSelector);

    const deleteLivestream = () => {
        queryData(
            {
                url: `streams/${id}`,
                config: {
                    method: 'DELETE',
                },
            },
            () => {
                dispatch(removeStream(id));
                toast.success('Delete livestream successfully!');
                setShowModal(false);
            }
        );
    };

    return (
        <Card className="text-start my-4">
            <Card.Header as="h5">Live Stream</Card.Header>
            <Card.Body>
                <Card.Title className="text-uppercase">{title}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Text className="mb-0">
                        {descriptions}
                        <br />
                        <br />
                        Created by {userName}
                    </Card.Text>
                    <div>
                        <Link to={`/streams/${id}`}>
                            <Button
                                variant="link"
                                className="text-primary text-decoration-none"
                            >
                                View
                            </Button>
                        </Link>
                        {auth && auth.googleId === userId && (
                            <>
                                <Link to={`/auth/streams/edit/${id}`}>
                                    <Button
                                        variant="link"
                                        className="text-secondary text-decoration-none"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="link"
                                    className="text-danger text-decoration-none"
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Card.Footer>
            <CustomModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                title="Delete"
                handleOk={deleteLivestream}
                okText={isLoading ? 'Deleting...' : 'Delete'}
            >
                Do you want to delete the livestream: {id}
            </CustomModal>
        </Card>
    );
};

export default StreamItem;
