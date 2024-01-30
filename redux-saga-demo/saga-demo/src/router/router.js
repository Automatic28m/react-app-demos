import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import User from '../components/User';

const router = createBrowserRouter([
    {
        path:"/User",
        element: <User/>
    }
]);

export default router;