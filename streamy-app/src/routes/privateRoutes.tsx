import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const NewStream = React.lazy(() => import('pages/streams/NewStream'));
const StreamEdit = React.lazy(() => import('pages/streams/StreamEdit'));
const MyStream = React.lazy(() => import('pages/streams/MyStream'));

const privateRoutes: RouteObject[] = [
    {
        path: '/auth/streams',
        element: <Outlet />,
        children: [
            { path: 'new', element: <NewStream /> },
            { path: 'me', element: <MyStream /> },
            { path: 'edit/:id', element: <StreamEdit /> },
        ],
    },
];

export default privateRoutes;
