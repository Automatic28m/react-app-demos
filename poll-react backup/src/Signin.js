import { useState } from 'react';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeStatus } from './SigninSlice';
import { useParams } from "react-router-dom";

function Signin() {

    const signinStatus = useSelector((state) => state.SigninSignup.value)
    const dispatch = useDispatch();

    return (
        <div className='bg-slate-200'>
            <div className="container mx-auto max-w-screen-lg h-screen flex items-center">
                <div className="card lg:card-side bg-base-100 shadow-xl rounded-lg w-full min-h-1/2">
                    <div className="card-body w-3/6 bg-slate-950 rounded-l-lg">
                        <b className='text-5xl text-white'>Pollanswer.org</b>
                        <p className='text-white'>Let the world knows your opinions</p>
                    </div>
                    <div className="card-body w-3/6">
                        {signinStatus ? (
                            <>
                                <SigninForm />
                                <p>Not a member? <a className="underline cursor-pointer" onClick={() => {dispatch(changeStatus())}}>Create an account</a></p>
                            </>
                        ) : (
                            <>
                                <SignupForm />
                                <p>Already have an account? <a className="underline cursor-pointer" onClick={() => {dispatch(changeStatus())}}>Sign in</a></p>
                            </>

                        )}
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <b className='fixed bottom-2'>Pollanswer.org</b>
            </div>
        </div>
    );
}

export default Signin;
