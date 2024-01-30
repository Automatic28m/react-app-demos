import axios from "axios";
import { useState, useEffect } from "react";
import toastr from 'toastr';
import { useDispatch, useSelector } from "react-redux";
import { setStoreUserData } from "../UserDataSlice";
import { useNavigate } from "react-router-dom";


function SigninForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = `http://localhost:8080/api/auth/signin`;
    const store_username = useSelector((state) => state.UserData.username)
    const store_userId = useSelector((state) => state.UserData.userId)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignin = () => {
        axios.post(url, {
            username,
            password
        }, { withCredentials: true })
            .then(async response => {
                const userDataResponse = await axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
                    .then( async res => {
                        toastr.success("Sign in success");
                        console.log(res);
                        await dispatch(setStoreUserData( res.data ))
                        navigate('/')
                    }).catch(e => {
                        toastr.error("Userdata " + e);
                    });
            }).catch(error => {
                toastr.error(error.response.data.message);
                // console.log(error.response.data.message);
            });
    };

    return (
        <>
            <b>Sign in</b>
            <form>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        placeholder="Type here" className="input input-bordered w-full"
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        placeholder="Type here" className="input input-bordered w-full"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mt-3'>
                    <button type="button" onClick={handleSignin} className='btn btn-accent w-full'>
                        Sign in
                    </button>
                </div>
                {/* <div className='mt-3'>
                    Not a member? <Link to='/Signup' className='underline'>Create an account</Link>
                </div> */}
            </form>
        </>
    )
}

export default SigninForm;