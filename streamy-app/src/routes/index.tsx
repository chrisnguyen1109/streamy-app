import { Navigate, useRoutes } from 'react-router-dom';
import { authUserSelector } from 'redux/authSlice/selector';
import { useAppSelector } from 'redux/hooks';
import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';

const AppRoutes = () => {
    const currentAuth = useAppSelector(authUserSelector);

    const routes = currentAuth
        ? [...publicRoutes, ...privateRoutes]
        : publicRoutes;

    const element = useRoutes([
        ...routes,
        { path: '*', element: <Navigate replace to="/" /> },
    ]);

    return <>{element}</>;
};

export default AppRoutes;
