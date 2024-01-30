import axios from "axios";
import { useEffect, useState } from "react"
import toastr from "toastr";
import ConvertDateTime from "../../function/ConvertDateTime";
import { Link } from 'react-router-dom'

function AllPollDataTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("title");
    const [sort, setSort] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");


    const fetchData = async () => {
        const blank = "null";
        let url = `http://localhost:8080/api/poll/pagingAndSortingPoll/${currentPage}/${pageSize}/${sortBy}/${sort}/${searchTerm}`;

        if (searchTerm == "") {
            url = `http://localhost:8080/api/poll/pagingAndSortingPoll/${currentPage}/${pageSize}/${sortBy}/${sort}/${blank}`
        };

        await axios.get(`${url}`, { withCredentials: true })
            .then((res) => {
                setData(res.data.content);
                console.log(res.data.content);
                setTotalPages(res.data.totalPages);
            }).catch((e) => {
                console.log("Error fetching data: ", e);
            })
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, sortBy, sort, searchTerm, pageSize]);

    const handleNextPage = () => {
        console.log("Next");
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        console.log("Previous");
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSortBy = (e) => {
        console.log(e);
        setSortBy(e);
        setSort(sortBy == e && sort == "asc" ? "desc" : "asc");
        console.log(sort);
    }

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <button className={i - 1 === currentPage ? 'join-item btn btn-accent' : 'join-item btn'} key={i - 1} onClick={() => setCurrentPage(i - 1)}>
                {i}
            </button>
        );
    };

    const handlePollDelete = (poll_id) => {
        axios.delete(`http://localhost:8080/api/poll/deletePoll/${poll_id}`, { withCredentials: true })
            .then((res) => {
                toastr.success("Delete poll successfully");
                setData((prevPolls) => prevPolls.filter((poll) => poll.id !== poll_id));
            }).catch((e) => {
                toastr.error("An error occurs : ", e);
            })
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-3">
                <div className="form-control w-full max-w-xs mb-3">
                    <label className="label">
                        <span className="label-text">Filter rows</span>
                    </label>
                    <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs" value={searchTerm} onChange={(e) => (setSearchTerm(e.target.value))} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Number of rows</span>
                    </label>
                    <select className="select select-bordered" value={pageSize} onChange={(e) => {
                        setPageSize(e.target.value);
                        setCurrentPage(0);
                    }}>
                        <option disabled selected>Select...</option>
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className="border border-slate-300">
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th onClick={() => handleSortBy("title")}
                            className="border border-slate-300 hover:bg-slate-100 hover:cursor-pointer">
                            <span className="flex justify-between">
                                <button>Title</button>
                                <span>{sortBy == "title" ? sort : ""}</span>
                            </span>
                        </th>
                        <th onClick={() => handleSortBy("dateTimeCreated")}
                            className="border border-slate-300 hover:bg-slate-100 hover:cursor-pointer">
                            <span className="flex justify-between">
                                <button>Created on</button>
                                <span>{sortBy == "dateTimeCreated" ? sort : ""}</span>
                            </span>
                        </th>
                        <th onClick={() => handleSortBy("user_id")}
                            className="border border-slate-300 hover:bg-slate-100 hover:cursor-pointer">
                            <span className="flex justify-between">
                                <button>Creator</button>
                                <span>{sortBy == "user_id" ? sort : ""}</span>
                            </span>
                        </th>
                        <th className="border border-slate-300">
                            <span className="flex justify-between">
                                Choice
                            </span>
                        </th>
                        <th className="border border-slate-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((poll, index) => (
                        <tr className="border border-slate-300" key={index}>
                            <td className="border border-slate-300">
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td className="border border-slate-300 text-accent">{poll.title}</td>
                            <td className="border border-slate-300">{ConvertDateTime(poll.dateTimeCreated)}</td>
                            <td className="border border-slate-300">{poll.user.username}</td>
                            <td className="border border-slate-300">
                                <ul className="list-disc">
                                    {poll.choices.map((choice, choiceIndex) => (
                                        <li key={choiceIndex}>{choice.title}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="border border-slate-300">
                                <div className="flex gap-3">
                                    {/* View */}
                                    {/* <Link className="text-slate-400" to={``}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </Link> */}
                                    {/* <Link className="text-slate-400" to={``}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </Link> */}
                                    {/* Delete */}
                                    <a className="text-slate-400" onClick={() => document.getElementById(`my_modal_${poll.id}`).showModal()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </a>

                                    <dialog id={`my_modal_${poll.id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Deleteing poll</h3>
                                            <p className="py-4">Are you sure to delete this?</p>
                                            <div className="flex gap-1">
                                                <b>Poll title : </b><p className="text-accent">{poll.title}</p>
                                            </div>
                                            <div className="modal-action">
                                                <form className="flex gap-2" method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-accent" onClick={(e) => handlePollDelete(poll.id)}>Delete</button>
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th className="border border-slate-300"></th>
                        <th className="border border-slate-300">Title</th>
                        <th className="border border-slate-300">Created on</th>
                        <th className="border border-slate-300">Creator</th>
                        <th className="border border-slate-300">Choices</th>
                        <th className="border border-slate-300">Action</th>
                    </tr>
                </tfoot>
            </table>
            <div>
                <div className="join w-full justify-center my-3">
                    <button className="join-item btn" disabled={currentPage === 0} onClick={handlePrevPage}>«</button>
                    {pageButtons}
                    <button className="join-item btn" disabled={currentPage + 1 === totalPages} onClick={handleNextPage}>»</button>
                </div>
                <div>
                    Total Page: <span className="text-accent">{totalPages}</span>
                </div>
                <div>
                    Current Index Page: <span className="text-accent">{currentPage}</span>
                </div>
                <div>
                    Sorting Field : <span className="text-accent">{sortBy}</span>
                </div>
                <div>
                    Sort Direction : <span className="text-accent">{sort}</span>
                </div>
            </div>
        </div>
    )
}
export default AllPollDataTable