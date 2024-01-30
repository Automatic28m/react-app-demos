import AllPollDataTable from "./AllPollDataTable"
import AppStat from "./AppStats"

function Dashboard() {
    return (
        <div className="">
            <div className="mb-5">
                <b className="text-xl">Dashboard</b>
            </div>
            <div className="mb-5">
                <AppStat />
            </div>
            <div>
                <AllPollDataTable />
            </div>
        </div>
    )
}

export default Dashboard