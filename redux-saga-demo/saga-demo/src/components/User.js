import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    doGetUser
} from '../saga/userSaga';

function User() {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const isLoading = useSelector((state) => state.users.user.isLoading);
    const data = useSelector((state) => state.users.user.data);

    useEffect(() => {
        console.log('Dispatching getUserAction with id:', id);
        console.log(isLoading);
        dispatch(doGetUser(id));
    }, [dispatch,id]);

    return (
        <>
            {
                isLoading
                    ?
                    (<span>Loading...</span>)
                    :
                    data
                        ?
                        (<div>Hi, I'm {data.name}</div>)
                        :
                        (<span>No user found!</span>)
            }
        </>
    )
}

export default User;