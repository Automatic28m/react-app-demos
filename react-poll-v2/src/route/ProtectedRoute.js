import { Outlet } from "react-router-dom";
import Link from '../../node_modules/antd/es/typography/Link';

export default function ProtectedRoute() {
    return (
        <>
            <div style={{ background: 'lightblue' }}>
                <b>Navbar</b>
                <ul>
                    <li>
                        <a href="/">Home</a>
                        <a href="/createPoll">Create Poll</a>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}