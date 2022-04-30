import { GOOGLE_CLIENT_ID } from 'config';
import {
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
    useGoogleLogin,
    useGoogleLogout,
} from 'react-google-login';
import { toast } from 'react-toastify';

interface UseAuthProps {
    onLogin?: (response: GoogleLoginResponse) => void;
    onLogout?: () => void;
}

export const useAuth = ({ onLogin, onLogout }: UseAuthProps = {}) => {
    const onLoginSuccess = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        onLogin?.(response as GoogleLoginResponse);
    };

    const onLoginFailure = (error: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }
        toast.error('Login failed!');
    };

    const onLogoutSuccess = () => {
        onLogout?.();
    };

    const onLogoutFailure = () => {
        toast.error('Logout failed!');
    };

    const { loaded, signIn } = useGoogleLogin({
        clientId: GOOGLE_CLIENT_ID,
        onSuccess: onLoginSuccess,
        onFailure: onLoginFailure,
        cookiePolicy: 'single_host_origin',
        isSignedIn: true,
    });

    const { signOut } = useGoogleLogout({
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess,
        onFailure: onLogoutFailure,
    });

    return { signIn, signOut, loaded };
};
