import { useState } from "react";
import { Router, Link } from 'react-router-dom';
import axios from 'axios'
import toastr from 'toastr'
import { changeStatus } from "../SigninSlice";
import { useDispatch } from "react-redux";

function SignupForm() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const url = `http://localhost:8080/api/auth/signup`;

    const handleSignup = (e) => {
        e.preventDefault();

        if (password == confirmPassword) {
            axios.post(url, {
                username,
                email,
                password
            })
                .then(response => {
                    toastr.success(response.data.message);
                    dispatch(changeStatus());
                }).catch(e => {
                    toastr.error(e.response.data.message);
                })
        } else {
            const message = "Confirm password is incorrect";
            toastr.error(message);
        }
    };
    return (
        <>
            <b>Sign up</b>
            <form>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        placeholder="you@example.com" className="input input-bordered w-full"
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        placeholder="Your username" className="input input-bordered w-full"
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
                        placeholder="Your password" className="input input-bordered w-full"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        placeholder="Your confirm password" className="input input-bordered w-full"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='mt-3'>
                    <button type="button" onClick={handleSignup} className='btn btn-accent w-full'>
                        Sign up
                    </button>
                </div>
                {/* <div className='mt-3'>
                    Already have an account? <Link to='/Signin' className='underline'>Sign in</Link>
                </div> */}
            </form>
        </>
    )
}

export default SignupForm;