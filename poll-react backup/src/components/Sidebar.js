import axios from 'axios';
import { Router, Link, useNavigate } from 'react-router-dom'
import toastr from 'toastr';
import { useDebugValue, useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

function Sidebar() {
    const store_username = useSelector((state) => state.UserData.username)
    const store_userId = useSelector((state) => state.UserData.userId)
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

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
                console.log(res.data);
            }).catch((e) => {
                if (e.response.status == "401") {
                    toastr.error("Please sign in");
                    navigate('/Signin')
                } else {
                    toastr.error("An error occurs : ", e);
                    console.log("Get user data error : ", e);
                }
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
                <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content flex justify-between">
                    <div>
                        <li><Link to='/'><b className="text-3xl">Pollanswer.org</b></Link></li>
                        <li className="tooltip tooltip-left w-full" data-tip="Go to your profile">
                            <Link to='/UserProfile'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                </svg>
                                Hi, {userData.username}</Link>
                        </li>
                        <li><Link to='/CreatePoll'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>
                            Create your poll</Link>
                        </li>
                        <li><Link to='/YourPoll'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clip-rule="evenodd" />
                            </svg>
                            Your poll
                        </Link></li>
                        <li><Link to='/PollHistory'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
                            </svg>
                            History
                        </Link></li>
                        {/* <li><Link to='/signin'>Sign in</Link></li> */}
                        <li><Link to='/' onClick={SignOut}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clip-rule="evenodd" />
                            </svg>
                            Sign out
                        </Link></li>
                    </div>
                    <div>
                        <li><Link to='/admin/dashboard'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z" clip-rule="evenodd" />
                            </svg>
                            Admin page
                        </Link></li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;