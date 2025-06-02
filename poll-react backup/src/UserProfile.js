import Sidebar from "./components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import toastr from "toastr";
import UserDataSlice from "./UserDataSlice";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";

function UserProfile() {

    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const fetchUserData = () => {
        axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
            .then((res) => {
                setUserData(res.data);
                setUsername(res.data.username);
                setEmail(res.data.email);
                console.log(res.data)
            }).catch((e) => {
                toastr.error("Userdata : " + e);
            });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const [editStatus, setEditStatus] = useState(false);

    const editProfile = () => {
        setEditStatus(!editStatus);
        console.log(editStatus);
    }

    const cancleChange = () => {
        setUsername(userData.username);
        setEmail(userData.email);
        setEditStatus(false);
    }

    const saveChangeUserData = () => {
        // console.log(userData.id,' ',username,' ',email);
        axios.put(`http://localhost:8080/api/user/UpdateUser`,
            {
                id: userData.id,
                username: username,
                email: email,
            },
            { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.data.status == "400") {
                    toastr.error(response.data.message);
                }
                if (response.data.status == "200") {
                    toastr.success(response.data.message);
                    toastr.success("Please sign in with your new Username");
                    navigate("/Signin");
                }

            }).catch((err) => {
                toastr.error(err);
                console.log(err);
            })
    }

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
                        <input type="text" placeholder="Type here"
                            value={username}
                            className="input input-bordered w-full max-w-xs"
                            disabled={!editStatus}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={email}
                            disabled={!editStatus}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-accent"
                        onClick={(e) => editProfile()}
                        style={{ display: !editStatus ? 'inline-block' : 'none' }}
                    >
                        Edit profile
                    </button>
                    <button
                        className="btn btn-accent"
                        onClick={saveChangeUserData}
                        style={{ display: !editStatus ? 'none' : 'inline-block' }}
                    >
                        Save change
                    </button>
                    <button
                        className="btn"
                        style={{ display: !editStatus ? 'none' : 'inline-block' }}
                        onClick={cancleChange}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default UserProfile;