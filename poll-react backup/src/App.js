import Sidebar from "./component/Sidebar";
import PollCard from "./component/PollCard";
import Hero from "./component/Hero";
import PollChat from "./component/PollChat";
import Footer from "./component/Footer";
import { useState } from "react";
import FetchPoll from "./component/FetchPoll";
import SearchBar from "./component/SearchBar";

function App() {

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <Sidebar />
      <Hero />
      <div className="bg-slate-950 py-10">
        <div className="max-w-screen-lg mx-auto my-5">
          <div className="mb-3">
            <p className="text-accent">Public poll</p>
            <b className="text-5xl text-white">What people asking now...</b>
          </div>
          <div className="">
            <SearchBar onChange={handleSearch}/>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 max-w-screen-lg">
        <div className="flex flex-col">
          <FetchPoll keyword={keyword}/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
