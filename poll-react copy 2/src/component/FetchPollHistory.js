import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import PollCardHistory from '../component/PollCardHistory';
import { useNavigate } from "react-router-dom";

function FetchPollHistory(props) {
    const navigate = useNavigate();
    const [listPoll, setListPoll] = useState([]);
    const url = `http://localhost:8080/api/poll/pollHistory`;

    const FetchPoll = () => {
        return axios.get(url, { withCredentials: true })
            .then((response) => {
                setListPoll(response.data)
                console.log(response.data)
            }).catch((e) => {
                navigate('/Signin')
            })

    }
    useEffect(() => {
        FetchPoll();
    }, [])

    console.log("Passed props : ",props);

    const filteredPoll = listPoll.filter((item) => {
        return (
            (props.keyword === '' || item.pollDTO.title.toLowerCase().includes(props.keyword.toLowerCase()))
        );
    });


    return (
        <>
            <div>
                {filteredPoll.length <= 1 ?
                    filteredPoll.length + " result"
                    :
                    filteredPoll.length + " results"
                }
            </div>
            {filteredPoll.length != 0 ?
                filteredPoll.map((ObjPoll, index) => {
                    console.log(ObjPoll);
                    return (
                        <div key={index}>
                            <PollCardHistory {...ObjPoll} />
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

export default FetchPollHistory;