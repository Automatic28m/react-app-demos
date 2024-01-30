import axios from 'axios';
import { useState, useEffect } from 'react';
import toastr from 'toastr';
import PollCard from '../component/PollCard';
import { Link } from 'react-router-dom';

function FetchCreatedPoll(props) {

    const [listPoll, setListPoll] = useState([]);
    // const [pollDetail, setPollDetail] = useState([]);

    const fetchUserData = async () => {
        return await axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
            .then((res) => {
                FetchPoll(res.data)
            }).catch((e) => {
                toastr.error("Userdata : " + e);
            });
    }

    const FetchPoll = async (userData) => {
        return await axios.get(`http://localhost:8080/api/poll/pollByUserId/${userData.id}`, { withCredentials: true })
            .then((response) => {
                setListPoll(response.data)
                // console.log("List poll : ",response.data);
            })
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    const filteredPoll = listPoll.filter((item) => {
        return (
            (props.keyword === '' || item.title.toLowerCase().includes(props.keyword.toLowerCase()))
        );
    });

    return (
        <>
            {filteredPoll.length !== 0 ? (
                <>
                    {filteredPoll.map((ObjPoll, index) => (
                        <div key={index}>
                            <PollCard {...ObjPoll} />
                        </div>
                    ))}
                </>
            ) : (
                <div className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>You don't have a poll yet. Ask people something! <Link className="underline" to={`/CreatePoll`}>Create a new poll</Link></span>
                </div>
            )}
        </>
    )
}
export default FetchCreatedPoll;