import Sidebar from "./component/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import toastr from "toastr";
import UserDataSlice from "./UserDataSlice";
import Footer from "./component/Footer";

function UserProfile() {

    const [userData, setUserData] = useState([]);

    const fetchUserData = () => {
        axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
            .then((res) => {
                setUserData(res.data);
                console.log(res.data)
            }).catch((e) => {
                toastr.error("Userdata : " + e);
            });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="container mx-auto py-10 max-w-screen-lg">
                <div className="mb-5">
                    <b className='text-5xl'>Profile</b>
                </div>
                <div className="mb-3">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" value={userData.username} className="input input-bordered w-full max-w-xs" disabled />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Type here" value={userData.email} className="input input-bordered w-full max-w-xs" disabled />
                    </div>
                </div>
                <button className="btn btn-primary">Edit profile</button>
            </div>
            <Footer/>
        </>
    );
}
export default UserProfile;