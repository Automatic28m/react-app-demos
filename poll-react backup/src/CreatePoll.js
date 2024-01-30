import { Link } from 'react-router-dom'
import Sidebar from './component/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';

function CreatePoll() {

    const [title, setTitle] = useState("");
    const [choice, setChoice] = useState("");
    const [choices, setChoices] = useState([]);
    const [userId, setUserId] = useState("");
    const url = `http://localhost:8080/api/poll/createPoll`;;

    const handleAddChoice = (e) => {
        e.preventDefault();

        if (choice.trim() !== '') {
            setChoices((prevList) => [...prevList, choice]);
            setChoice(""); // Clear the input field
        }
    };

    const fetchUserData = () => {
        axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
            .then((res) => {
                setUserId(res.data.id);
            }).catch((e) => {
                toastr.error("Userdata : " + e);
            });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleDeleteChoice = (index) => {
        const updatedChoices = [...choices];
        updatedChoices.splice(index, 1); // Remove the choice at the specified index
        setChoices(updatedChoices);
    };

    const handleConfirmCreation = async (e) => {
        e.preventDefault();

        const formattedChoices = choices.map(choice => ({ title: choice }));

        const data = {
            title,
            userId,
            formattedChoices
        };

        console.log(JSON.stringify(data, null, 2));

        try {
            const formattedChoices = choices.map(choice => ({ title: choice }));
            const postData = {
                title: title,
                userId: userId,
                choices: formattedChoices
            };

            const res = await axios.post(url, postData, { withCredentials: true });
            toastr.success(res.data);
            setTitle("")
            setChoice("")
            setChoices([])
        } catch (e) {
            toastr.error("An error occurs : " + e);
        }
    }


    return (
        <div>
            <Sidebar />
            <div className="container mx-auto my-10 max-w-screen-lg">
                <div className='mb-5'>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link to={`/YourPoll`}>Your poll</Link></li>
                            <li>Create poll</li>
                        </ul>
                    </div>
                    <b className='text-5xl'>Create your poll</b>
                </div>
                <div className='mb-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">What are you wondering about?</span>
                        </label>
                        <input type="text" placeholder="Your title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                {/* <div className='mb-5'>
                    <b className='text-3xl'>Give them some choices</b>
                </div> */}
                <div>
                    <div className="form-control flex flex-row mb-3 items-end gap-3">
                        <div className='w-5/6'>
                            <label className="label">
                                <span className="label-text">What choice do you want?</span>
                            </label>
                            <input type="text" placeholder="Your choice" className="input input-bordered w-full" value={choice} onChange={(e) => setChoice(e.target.value)} />
                        </div>
                        <div className='form-control w-1/6'>
                            <button type="submit" className='btn btn-primary' onClick={handleAddChoice}>Add a choice</button>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className='mb-3'>
                        <b className="">{choices.length} Choices</b>
                    </div>
                    <ul>
                        {choices.map((choice, index) => (
                            <>
                                <div className='flex justify-between items-center'>
                                    <li key={index} className='text-lg'>{choice}</li>
                                    <button className='btn btn-outline btn-error' onClick={() => handleDeleteChoice(index)}>Delete</button>
                                </div>
                                <div className="divider"></div>
                            </>

                        ))}
                    </ul>
                </div>
                <div className='mb-3'>
                    <h>After a poll is created, it cannot be edited later.</h>
                </div>
                <div>
                    <button className='btn btn-success' onClick={handleConfirmCreation}>Confirm poll</button>
                </div>

            </div>
        </div>
    );
}

export default CreatePoll;