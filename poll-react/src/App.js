import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useState } from "react";
import FetchPoll from "./components/FetchPoll";
import SearchBar from "./components/SearchBar";
import Client from "./components/Client";

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
      {/* <Stat1/> */}
      <div className="bg-slate-950 py-10">
        <div className="max-w-screen-lg mx-auto my-5">
          <div className="mb-3">
            <p className="text-accent">Public poll</p>
            <b className="text-5xl text-white">What people asking now...</b>
          </div>
          <div className="">
            <SearchBar onChange={handleSearch} />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 max-w-screen-lg">
        <div className="flex flex-col">
          <FetchPoll keyword={keyword} />
        </div>
      </div>
      <Client />
      <Footer />
    </>
  );
}

export default App;
