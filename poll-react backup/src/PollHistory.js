import FetchPollHistory from "./component/FetchPollHistory";
import SearchBar from "./component/SearchBar";
import Sidebar from "./component/Sidebar";
import { useState } from "react";

function PollHistory() {

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
                    <div className="mb-5">
                        <p className="text-accent">Your vote history</p>
                        <b className="text-5xl text-white">What have you voted</b>
                    </div>
                    <div className="">
                        <SearchBar onChange={handleSearch}/>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-10 max-w-screen-lg">
                <div className="flex flex-col gap-3">
                    <FetchPollHistory keyword={keyword}/>
                </div>
            </div>
        </>
    )
}

export default PollHistory;