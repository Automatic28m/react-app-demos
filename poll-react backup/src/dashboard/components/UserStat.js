import axios from "axios";
import User from "./User"
import { useEffect, useState } from "react";
import toastr from "toastr";

function UserStat(props) {

    const [pollAmount, setPollAmount] = useState(0);
    const [pollLogAmount, setPollLogAmount] = useState(0);


    const fetchCountPolls = (userId) => {
        if (userId != null) {
            axios.get(`http://localhost:8080/api/poll/countPollsByUserId/${userId}`, { withCredentials: true })
                .then((res) => {
                    setPollAmount(res.data);
                })
                .catch((e) => {
                    console.log("error: ", e);
                });
        }
    };

    const fetchCountPollLogs = (userId) => {
        if (userId != null) {
            axios.get(`http://localhost:8080/api/poll/countPollLogsByUserId/${userId}`, { withCredentials: true })
                .then((res) => {
                    setPollLogAmount(res.data);
                })
                .catch((e) => {
                    console.log("error: ", e);
                });
        }
    };

    useEffect(() => {
        fetchCountPolls(props.id);
        fetchCountPollLogs(props.id);
    }, [props.id]);


    useEffect(() => {
        fetchCountPolls();
    }, [])

    console.log("Props : ", props);
    const username = String(props.username);
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                </div>
                <div className="stat-title">Total Poll</div>
                <div className="stat-value text-accent">{pollAmount}</div>
                <div className="stat-desc">Total amount of questioned poll <br></br>(exclude deleted poll)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="stat-title">Total Vote</div>
                <div className="stat-value text-accent">{pollLogAmount}</div>
                <div className="stat-desc">Total amount of voted poll</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-16">
                            <span>{username.substring(2, 0)}</span>
                        </div>
                    </div>
                </div>
                <div className="stat-value">{props.username}</div>
                <div className="stat-title">{props.email}</div>
                <div className="stat-desc text-accent">#{props.id}</div>
            </div>

        </div>
    )
}

export default UserStat