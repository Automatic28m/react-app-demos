import axios from 'axios';
import { Router, Link } from 'react-router-dom'
import toastr from 'toastr';
import { useDebugValue, useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

function Sidebar() {
    const store_username = useSelector((state) => state.UserData.username)
    const store_userId = useSelector((state) => state.UserData.userId)

    const [userData, setUserData] = useState([]);

    const SignOut = () => {
        const url = `http://localhost:8080/api/auth/signout`;
        axios.get(url, { withCredentials: true })
            .then((res => {
                toastr.success(res.data);
                window.location.href = '/Signin'
            })).catch((e => {
                toastr.error("An error occurs : " + e)
            }))
    }

    const fetchUserData = () => {
        axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
            .then((res) => {
                setUserData(res.data);
            }).catch((e) => {
                toastr.error("Userdata : " + e);
            });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="drawer drawer-end sticky top-0 z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-slate-950 p-3 flex justify-between items-center">
                <Link to="/" className="text-3xl text-white"><b>Pollanswer.org</b></Link>
                <label htmlFor="my-drawer" className="btn drawer-button"><box-icon name='menu'></box-icon></label>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                    <li><Link to='/'><b className="text-3xl">Pollanswer.org</b></Link></li>
                    <li className="tooltip tooltip-left" data-tip="Go to your profile"><Link to='/UserProfile'>Hi, {userData.username}</Link></li>
                    <li><Link to='/CreatePoll'>Create your poll</Link></li>
                    <li><Link to='/YourPoll'>Your poll</Link></li>
                    <li><Link to='/PollHistory'>History</Link></li>
                    <li><Link to='/signin'>Sign in</Link></li>
                    <li><Link to='/' onClick={SignOut}>Sign out</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;