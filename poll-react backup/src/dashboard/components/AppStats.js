import axios from "axios";
import React, { useEffect, useState } from "react";
import toastr from "toastr";
function AppStat() {

    const [userAmount, setUserAmount] = useState(0);
    const [adminAmount, setAdminAmount] = useState(0);
    const [modAmount, setModAmount] = useState(0);
    const [pollAmount, setPollAmount] = useState(0);
    const [pollLogAmount, setPollLogAmount] = useState(0);

    const countUsers = async () => {
        await axios.get(`http://localhost:8080/api/user/countUsers`, { withCredentials: true })
            .then((result) => {
                setUserAmount(result.data);
            }).catch((err) => {
                toastr.error("Count user error: ", err)
                console.log("Count user error: ", err)
            });
    }
    const countAdmins = async () => {
        await axios.get(`http://localhost:8080/api/user/countAdmins`, { withCredentials: true })
            .then((result) => {
                setAdminAmount(result.data);
            }).catch((err) => {
                toastr.error("Count admin error: ", err)
                console.log("Count admin error: ", err)
            });
    }
    const countMods = async () => {
        await axios.get(`http://localhost:8080/api/user/countMods`, { withCredentials: true })
            .then((result) => {
                setModAmount(result.data);
            }).catch((err) => {
                toastr.error("Count mod error: ", err)
                console.log("Count mod error: ", err)
            });
    }
    const countPolls = async () => {
        await axios.get(`http://localhost:8080/api/poll/countPolls`, { withCredentials: true })
            .then((result) => {
                setPollAmount(result.data);
            }).catch((err) => {
                toastr.error("Count poll error: ", err)
                console.log("Count poll error: ", err)
            });
    }

    const countPollLogs = async () => {
        await axios.get(`http://localhost:8080/api/poll/countPollLogs`, { withCredentials: true })
            .then((result) => {
                setPollLogAmount(result.data);
            }).catch((err) => {
                toastr.error("Count Poll Log error: ", err)
                console.log("Count Poll Log error: ", err)
            });
    }

    useEffect(() => {
        countUsers();
        countAdmins();
        countMods();
        countPolls();
        countPollLogs();
    }, []);

    return (
        <div className="w-full flex justify-between">
            <div className="stats shadow w-full">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Polls</div>
                    <div className="stat-value">{pollAmount}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Votes</div>
                    <div className="stat-value">{pollLogAmount}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{userAmount}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Admins</div>
                    <div className="stat-value">{adminAmount}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Moderators</div>
                    <div className="stat-value">{modAmount}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

            </div>
        </div>
    )
}

export default AppStat