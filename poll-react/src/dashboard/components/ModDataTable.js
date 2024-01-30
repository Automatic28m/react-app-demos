import axios from "axios";
import { useEffect, useState } from "react"
import toastr from "toastr";
import { Link } from 'react-router-dom'


function ModDataTable() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("username");
    const [sort, setSort] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");


    const fetchData = async () => {
        const blank = "null";
        let url = `http://localhost:8080/api/user/pagingAndSortingMod/${currentPage}/${pageSize}/${sortBy}/${sort}/${searchTerm}`;

        if (searchTerm == "") {
            url = `http://localhost:8080/api/user/pagingAndSortingMod/${currentPage}/${pageSize}/${sortBy}/${sort}/${blank}`
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

    const handleDeleteUser = (user_id) => {
        axios.delete(`http://localhost:8080/api/admin/deleteUserById/${user_id}`, { withCredentials: true })
            .then((res) => {
                toastr.success(`Delete User (User ID : ${user_id}) successfully`);
                setData((prevUsers) => prevUsers.filter((user) => user.id !== user_id));
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
                    <select className="select select-bordered" value={pageSize}
                        onChange={(e) => {
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

            <table className="table table-auto border border-slate-300">
                {/* head */}
                <thead>
                    <tr>
                        <th className="border border-slate-300 hover:bg-slate-100">
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th onClick={() => handleSortBy("username")}
                            className="border border-slate-300 hover:bg-slate-100 hover:cursor-pointer">
                            <span className="flex justify-between">
                                <button>Username</button>
                                <span>{sortBy == "username" ? sort : ""}</span>
                            </span>
                        </th>
                        <th onClick={() => handleSortBy("email")}
                            className="border border-slate-300 hover:bg-slate-100 hover:cursor-pointer">
                            <span className="flex justify-between">
                                <button>Email</button>
                                <span>{sortBy == "email" ? sort : ""}</span>
                            </span>
                        </th>
                        {/* <th>Roles</th> */}
                        <th className="border border-slate-300 hover:bg-slate-100">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {

                            // const hasModeratorOrAdminRole = item.roles.some(role => role.name === "ROLE_MODERATOR" || role.name === "ROLE_ADMIN");


                            // // If any choice has "ROLE_USER", skip rendering this row
                            // if (hasModeratorOrAdminRole) {
                            //     return null;
                            // }

                            return (
                                <tr key={item.id} className="hover:bg-slate-100">
                                    <td className="border border-slate-300">
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </td>
                                    <td className="border border-slate-300">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                    <span>{item.username.substring(0, 2)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-accent">{item.username}</div>
                                                <div className="text-sm opacity-50">{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-slate-300">
                                        {item.email}
                                    </td>
                                    {/* item Roles */}
                                    {/* <td>
                                        <ul className="list-disc">
                                            {item.roles.map((role, index) => {
                                                let roleName = role;
                                                if (typeof role === 'object' && role.name) {
                                                    roleName = role.name;
                                                }

                                                switch (roleName) {
                                                    case 'ROLE_USER':
                                                        return <li key={index}>item</li>;
                                                    case 'ROLE_ADMIN':
                                                        return <li key={index}>Admin</li>;
                                                    case 'ROLE_MODERATOR':
                                                        return <li key={index}>Moderator</li>;
                                                    default:
                                                        return <li key={index}>{roleName}</li>;
                                                }
                                            })}
                                        </ul>
                                    </td> */}
                                    <td className="border border-slate-300">
                                        <div className="flex flex-row gap-2">
                                            <Link className="text-slate-400" to={`/admin/userInsight/${item.id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </Link>
                                            <Link className="text-slate-400" to={`/admin/updatePermission/${item.id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </Link>
                                            <button className="text-slate-400" onClick={() => document.getElementById(`my_modal_${item.id}`).showModal()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                    <dialog id={`my_modal_${item.id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Deleteing user?</h3>
                                            <p className="py-4">Are you sure to delete this user?<br /> All poll of this user will be deleted either.</p>
                                            <div className="flex gap-1">
                                                <b>Username : </b><p className="text-accent">{item.username}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <b>User ID : </b><p className="text-accent">{item.id}</p>
                                            </div>
                                            <div className="modal-action">
                                                <form className="flex gap-2" method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-accent" onClick={(e) => handleDeleteUser(item.id)}>Delete</button>
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>

                                </tr>
                            )
                        })
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th className="border border-slate-300">
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th className="border border-slate-300">Username</th>
                        <th className="border border-slate-300">Email</th>
                        {/* <th>Roles</th> */}
                        <th className="border border-slate-300">
                            Manage
                        </th>
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
export default ModDataTable