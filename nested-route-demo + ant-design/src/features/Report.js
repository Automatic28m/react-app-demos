import ReportForm from "../components/ReportForm";
import Card from '../components/universal/Card';
// import { Card } from 'antd';



function Report() {
    return (
        <>
            {/* <h1>Report</h1> */}
            {/* <Card title="Operation report"><ReportForm /></Card> */}
            <Card title="Operation Report" extra="extra space">
                <ReportForm />
            </Card>
        </>
    )
}

export default Report;