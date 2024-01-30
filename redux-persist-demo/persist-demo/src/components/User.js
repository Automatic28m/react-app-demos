import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    doAddUser,
    doGetUser,
    doDeleteUser,
} from '../saga/userSaga';

function User() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.users.user.isLoading);
    const data = useSelector((state) => state.users.user.data);
    const userStored = useSelector((state) => state.users.storedName);

    //Add a User to Store
    const handleAddToStore = () => {
        // Dispatch the addNameToStore action with the name from data
        if (data && data.name) {
            dispatch(doAddUser(data.name));
        }
    };

    //Delete a User from store
    const handleDeleteFromStore = (index) => {
        dispatch(doDeleteUser(index));
    };

    useEffect(() => {
        dispatch(doGetUser(id));
    }, [dispatch, id]);

    return (
        <div className="container max-w-xl mt-20 m-auto border-inherit">
            <div>
                <b className="text-2xl">Redux-Saga + Redux-Persist Demo</b>
            </div>
            <div className="divider"></div>
            <div className="">
                {
                    isLoading
                        ?
                        (<span className="loading loading-bars loading-lg text-accent"></span>)
                        :
                        data
                            ?
                            (
                                <div className="flex items-center justify-between">
                                    <div className="text-accent">User : {data.name}</div>
                                    <div>
                                        <button className="btn btn-outline btn-accent" onClick={handleAddToStore}>Add to store</button>
                                    </div>
                                </div>
                            )
                            :
                            (<span className="text-accent">No user found!</span>)
                }
            </div>
            <div className="divider"></div>
            <div>
                <div className="mb-3">
                    <b>Stored user</b>
                </div>
                <ul>
                    {userStored !== null &&
                        userStored.map((name, index) => {
                            return (
                                <div className="flex items-center justify-between mb-2">
                                    <li key={index}>{name}</li>
                                    <button className="hover:text-accent" onClick={() => handleDeleteFromStore(index)}>Delete</button>
                                </div>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default User;