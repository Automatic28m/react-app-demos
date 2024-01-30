import { Link } from 'react-router-dom';
import ConvertDateTime from '../function/ConvertDateTime.js';

function PollCard(props) {
    console.log("ObjPoll : ",props);
    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                {/* <figure className="w-1/6"><img className="h-full" src="./img/ken-cheung-KonWFWUaAuk-unsplash.jpg" /></figure> */}
                <div className="card-body">
                    <h2 className="card-title">{props.title}</h2>
                    <div>
                        {/* <b>Create by </b>{ObjPoll.user.username} */}
                    </div>
                    <div>
                        <b>Create at </b>{ConvertDateTime(props.dateTimeCreated)}
                    </div>
                    <div className="flex justify-end items-center">
                        {/* <div className="stats"> */}
                            {/* <div className="stat py-0 px-5"> */}
                                {/* <div className="stat-value">{}</div> */}
                                {/* <div className="stat-title">People answered</div> */}
                                {/* <div className="stat-desc">People answered</div> */}
                            {/* </div> */}
                        {/* </div> */}
                        <div>
                            <Link to={`/PollSummary/${props.id}`} className="btn btn-primary align-middle">View Summary</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PollCard;