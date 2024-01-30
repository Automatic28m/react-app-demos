import Sidebar from "./component/Sidebar";
import PollCard from "./component/PollCard";
import { Link, resolvePath } from "react-router-dom"
import axios from "axios";
import React, { useState, useEffect } from "react";
import toastr from "toastr";
import SearchBar from "./component/SearchBar";
import FetchCreatedPoll from "./component/FetchCreatedPoll";

function YourPoll() {
    
    const [keyword, setKeyword] = useState("");
    const handleSearch = (e) => {
        setKeyword(e.target.value);
        console.log(e.target.value);
    }

    return (
        <>
            <Sidebar />
            <div className="bg-slate-950 py-10">
                <div className="max-w-screen-lg mx-auto">
                    <div className="mb-5 flex justify-between items-center">
                        <div>
                            <p className="text-accent">Your created poll</p>
                            <b className="text-5xl text-white">What have you ask people</b>
                        </div>
                        <Link className='btn btn-outline btn-primary' to='/CreatePoll'>Create new poll</Link>
                    </div>
                    <div className="">
                        <SearchBar onChange={handleSearch} />
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-10 max-w-screen-lg">
                <div className="flex flex-col gap-3"> 
                    <FetchCreatedPoll keyword={keyword}/>
                </div >
            </div >
        </>
    )
}

export default YourPoll;