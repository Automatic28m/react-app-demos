import UserDataTable from "./UserDataTable"

function User() {
    return (
        <div className="">
            <div className="mb-5">
                <b className="text-xl">User Data</b>
            </div>
            <div className="mb-5">
                <UserDataTable/>
            </div>
        </div>
    )
}

export default User