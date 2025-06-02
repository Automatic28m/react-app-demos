import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import toastr from "toastr";
import { Link } from "react-router-dom";
import UserStat from "./UserStat";
function UserInsight() {

    const { user_id } = useParams();
    const [userData, setUserData] = useState([]);

    const fetchUserData = () => {
        axios.get(`http://localhost:8080/api/auth/getUserById/${user_id}`, { withCredentials: true })
            .then((res) => {
                setUserData(res.data);
                console.log(res.data);
            }).catch((e) => {
                toastr.error("An error occurs : ", e);
            })
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <div>
            {/* <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link to={"/admin/users"}></Link></li>
                    <li><a className="text-accent">User insight</a></li>
                </ul>
            </div> */}
            <div>
                <div>
                    <b className="text-xl">User Insight</b>
                </div>
                <div className="divider"></div>
                <div className="flex items-end">
                    <div className="w-2/6">
                        <b>User ID</b>
                    </div>
                    <div className="w-4/6 text-primary">
                        {userData.id}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex items-end">
                    <div className="w-2/6">
                        <b>Username</b>
                    </div>
                    <div className="w-4/6 text-primary">
                        {userData.username}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex items-end">
                    <div className="w-2/6">
                        <b>Email</b>
                    </div>
                    <div className="w-4/6 text-primary">
                        {userData.email}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex items-end">
                    <div className="w-2/6">
                        <b>Role</b>
                    </div>
                    <div className="w-4/6 text-primary">
                        <ul className="list-disc">
                            {userData.roles && userData.roles.map((role, index) => {
                                return (
                                    <li key={index}>
                                        {role.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="divider"></div>
                <UserStat {...userData} />
            </div>
        </div>
    )
}
export default UserInsight