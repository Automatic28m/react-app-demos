import { useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ConvertDateTime from './function/ConvertDateTime'
import toastr from "toastr";
import Footer from "./components/Footer";

function PollSummary() {
    const { poll_id } = useParams();
    const [pollData, setPollData] = useState([]);
    const [pollDetail, setPollDetail] = useState([]);
    const [display, setDisplay] = useState();

    const FetchPoll = async () => {
        return await axios.get(`http://localhost:8080/api/poll/pollById/${poll_id}`, { withCredentials: true })
            .then((response) => {
                setPollData(response.data)
                console.log("Poll data : ", response.data)
                FetchPollResult();
            }).catch((e) => {
                console.log(e)
            })
    }

    const FetchPollResult = async () => {
        return await axios.get(`http://localhost:8080/api/poll/GetPollResult/${poll_id}`, { withCredentials: true })
            .then((response) => {
                setPollDetail(response.data)
                console.log("Poll detail : ", response.data)
                response.data.status == 200 ? (
                    // setDisplay(displayData)
                    console.log("200")
                ) : (
                    // setDisplay(displayAlert)
                    console.log("401")
                )
            }).catch((e) => {
                console.log(e)
            })
    }


    const displayData = () => {
        return (
            <>
                {
                    pollDetail.data.choices && pollDetail.data.choices.map((choice, index) => {
                        console.log("Choice:", choice); // Add this line to log each choice
                        return (
                            <div key={index} className="stat flex justify-between hover:bg-base-200">
                                <div className="stat-title text-secondary">{choice.title}</div>
                                <div className="text-end">
                                    <div className="stat-value">{choice.percentage}%</div>
                                    <div className="stat-desc">{choice.amount} Vote</div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    const displayAlert = () => {
        return (
            <div className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>You don't have a poll yet. Ask people something!</span>
            </div>
        )
    }

    useEffect(() => {
        FetchPoll()
    }, [])

    // const dateTimeCreated = ConvertDateTime(pollData.dateTimeCreated)
    // console.log(dateTimeCreated);

    const handleDelete = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:8080/api/poll/deletePoll/${poll_id}`, { withCredentials: true })
            .then((response) => {
                window.location.href = '/YourPoll'
            }).catch((e) => {
                toastr.error("An error occurs : ", e);
            })

    }
    return (
        <>
            <Sidebar />
            <div className="container mx-auto my-10 max-w-screen-lg">
                <div className="mb-5">
                    <b className="text-5xl">Poll summary</b>
                </div>
                <div className="mb-5">
                    <b className="text-4xl text-primary">{pollData.title}</b>
                </div>
                <div className="mb-3">
                    <b>Choice</b>
                </div>
                <div>
                    {pollData.choices && pollData.choices.map((choice, index) => {
                        console.log("Choice:", choice); // Add this line to log each choice
                        return (
                            <ul className="list-disc px-5" key={index}>
                                <li>{choice.title}</li>
                            </ul>
                            // <div key={index} className="stat flex justify-between hover:bg-base-200">
                            //     <div className="stat-title text-secondary">{choice.title}</div>
                            //     <div className="text-end">
                            //         <div className="stat-value">{choice.percentage}%</div>
                            //         <div className="stat-desc">{choice.amount} Vote</div>
                            //     </div>
                            // </div>
                        )
                    })}
                </div>
                <div className="divider"></div>
                <div>
                    <div className="mb-3">
                        <b>Result</b>
                    </div>
                    <div className="stats stats-vertical shadow w-full">
                        {
                            pollDetail.status === '200' ? (
                                pollDetail.data.choices && pollDetail.data.choices.map((choice, index) => {
                                    console.log("Choice:", choice); // Add this line to log each choice
                                    return (
                                        <div key={index} className="stat flex justify-between hover:bg-base-200">
                                            <div className="stat-title text-secondary">{choice.title}</div>
                                            <div className="text-end">
                                                <div className="stat-value">{choice.percentage}%</div>
                                                <div className="stat-desc">{choice.amount} Vote</div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>No one vote you poll yet</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <div className="stats shadow w-full">

                        <div className="stat place-items-center">
                            <div className="stat-title">Vote</div>
                            <div className="stat-value text-secondary">{pollDetail.data?.total}</div>
                            <div className="stat-desc text-secondary">People vote your poll</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Since</div>
                            <div className="stat-value text-sm">{ConvertDateTime(pollData.dateTimeCreated)}</div>
                            <div className="stat-desc">Poll date and time created</div>
                        </div>

                        <button className="stat place-items-center btn btn-warning h-full rounded-none"
                            // onClick={handleDelete}>
                            onClick={() => document.getElementById('my_modal_1').showModal()}>
                            Delete Poll
                        </button>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Warning?</h3>
                                <p className="py-4">Deleting this poll is a permanent action. Do you wish to continue?</p>
                                <div className="modal-action">
                                    <button className="btn btn-warning" onClick={handleDelete}>Confirm</button>
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
                {/* <div>
                    <button type="button" className="btn btn-error">delete poll</button>
                </div> */}
            </div>
            <Footer/>
        </>
    )
}

export default PollSummary;