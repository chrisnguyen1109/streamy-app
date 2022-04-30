import React from 'react';
import { RouteObject } from 'react-router-dom';

const Streams = React.lazy(() => import('pages/streams'));
const StreamView = React.lazy(() => import('pages/streams/StreamView'));

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Streams />,
    },
    { path: '/streams', element: <Streams /> },
    { path: '/streams/:id', element: <StreamView /> },
];

export default publicRoutes;
