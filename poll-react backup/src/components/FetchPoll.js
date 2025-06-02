import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import PollChat from "./PollChat";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function FetchPoll(props) {
    const navigate = useNavigate();
    const [listPoll, setListPoll] = useState([]);
    const url = `http://localhost:8080/api/poll/allPoll`;

    const FetchPoll = () => {
        return axios.get(url, { withCredentials: true })
            .then((response) => {
                setListPoll(response.data)
            }).catch((e) => {
                // navigate('/Signin')
            })

    }
    useEffect(() => {
        FetchPoll();
    }, [])

    console.log("Props : ", props);

    const filteredPoll = listPoll.filter((item) => {
        return (
            (props.keyword === '' || item.title.toLowerCase().includes(props.keyword.toLowerCase()))
        );
    });

    let pollCounter = 0;
    return (
        <>
            <div className="w-full text-center">
                {filteredPoll.length <= 1 ?
                    filteredPoll.length + " Result"
                    :
                    filteredPoll.length + " Results"
                }

            </div>
            {filteredPoll.length != 0 ?
                filteredPoll.map((ObjPoll, index) => {
                    return (
                        <div key={index}>
                            <PollChat key={index} id={ObjPoll.id} title={ObjPoll.title} username={ObjPoll.user.username} datetime={ObjPoll.dateTimeCreated} />
                        </div>
                    )
                }) :
                <div className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>No poll available now, Please come back later.</span>
                </div>
            }

        </>
    )
}

export default FetchPoll;