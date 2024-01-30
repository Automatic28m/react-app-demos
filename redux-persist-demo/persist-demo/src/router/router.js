import { createBrowserRouter } from 'react-router-dom';
import User from '../components/User';
import App from '../App';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "*",
        element: <App />,
    },
    {
        path: "/User/:id",
        element: <User />
    }
]);

export default router;