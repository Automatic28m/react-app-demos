import PollChoice from "./components/PollChoice";
import Sidebar from "./components/Sidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ConvertDateTime from "./function/ConvertDateTime";
import Footer from "./components/Footer";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

function AnswerPoll() {
    const { poll_id } = useParams();
    const [pollData, setPollData] = useState([]);
    const [selectedChoice, setSelectedChoice] = useState("");
    const [userData, setUserData] = useState([]);
    const [pollVoted, setPollVoted] = useState(true);

    const navigate = useNavigate();

    const fetchUserData = async () => {
        await axios.get(`http://localhost:8080/api/auth/getUserData`, { withCredentials: true })
            .then((response) => {
                // console.log("res data : " + response)
                setUserData(response.data);
                checkUserRight();
            }).catch((e) => {
                toastr.error("Userdata : " + e);
            });
    }

    const checkUserRight = () => {
        axios.get(`http://localhost:8080/api/poll/checkPollCreator/${poll_id}`, { withCredentials: true })
            .then((response) => {
                if (response.data.status == 200) {
                    checkAlreadyVoted();
                    // toastr.success(response.data.message);
                } else if (response.data.status == 401) {
                    toastr.warning(response.data.message);
                    navigate(`/PollSummary/${poll_id}`);
                }
            }).catch((e) => {
                console.log(e);
            })
    }

    const checkAlreadyVoted = () => {
        axios.get(`http://localhost:8080/api/poll/checkVotedPoll/${poll_id}`, { withCredentials: true })
            .then((response) => {
                if (response.data.status == 200) {
                    FetchPoll();
                    // toastr.success(response.data.message);
                } else if (response.data.status == 403) {
                    //Voted
                    setPollVoted(false);
                    FetchPoll();
                    setSelectedChoice(response.data.data.id);
                    // toastr.error(response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            })
    }

    const handleConfirmVote = () => {
        if (!userData) {
            toastr.error("User data not available yet.");
            return;
        } else {
            console.log("Poll id : ", poll_id);
            console.log("Choice : ", selectedChoice);
            console.log("User : ", userData.id);
            axios.post('http://localhost:8080/api/poll/votePoll', {
                choice_id: selectedChoice, // Assuming you want to send selectedChoice as choice_id
                poll_id: poll_id, // Assuming you have poll_id available
                user_id: userData.id // Assuming you have userData.id available
            }, { withCredentials: true })
                .then((response) => {
                    setPollVoted(true);
                    navigate("/");
                    toastr.success(response.data.message);
                })
                .catch((e) => {
                    toastr.error("An error occurs : " + e);
                });

        }
    }

    const url = `http://localhost:8080/api/poll/pollById/${poll_id}`;

    const FetchPoll = async () => {
        await axios.get(url, { withCredentials: true })
            .then((response) => {
                // console.log(response.data)
                setPollData(response.data)
            });
    }

    useEffect(() => {
        fetchUserData()
    }, [selectedChoice, pollVoted]);

    return (
        <>
            <Sidebar />
            <div className="container mx-auto my-10 max-w-screen-lg">
                <div className="">
                    <div className="">
                        <div className="mb-3">
                            <b className="text-5xl text-accent">{pollData.title}</b>
                        </div>
                        <div className="mb-5">
                            <div>
                                <b>Created by </b>
                                {pollData.user && pollData.user.username}
                            </div>
                            <div>
                                <b>Created on </b>
                                {ConvertDateTime(pollData.dateTimeCreated)}
                            </div>
                        </div>
                        <div>
                            <div className="divider"></div>
                            <div className="mb-3">
                                <b>Select your choice</b>
                            </div>
                            {pollData.choices && pollData.choices.map((choice, index) => {
                                return (
                                    <div key={index} className="form-control hover:bg-base-100 px-3 rounded-lg w-fit">
                                        <label className="label cursor-pointer gap-3">
                                            <input
                                                type="radio"
                                                name="radio-10"
                                                className={`radio ${pollVoted ? '' : 'disabled'}`}
                                                value={choice.id}
                                                onChange={(e) => pollVoted && setSelectedChoice(e.target.value)}
                                                checked={choice.id == selectedChoice}
                                                style={!pollVoted ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
                                            />
                                            <span className="label-text">{choice.title}</span>
                                        </label>
                                    </div>
                                );
                            })}


                            <div className="divider"></div>
                            <div>
                                <button
                                    className={!pollVoted ? "hidden" : "btn btn-outline btn-accent"}
                                    onClick={handleConfirmVote}
                                >
                                    Confirm vote
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default AnswerPoll;