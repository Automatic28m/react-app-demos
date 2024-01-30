import ConvertDateTime from '../function/ConvertDateTime.js';
function PollCardHistory(ObjPoll) {
    console.log("ObjPoll in card : ", ObjPoll);
    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                {/* <figure className="w-1/6-"><img className="h-full" src="./img/ken-cheung-KonWFWUaAuk-unsplash.jpg" /></figure> */}
                <div className="card-body">
                    <div>
                        <h2 className="card-title text-primary">{ObjPoll.pollDTO.title}</h2>
                    </div>
                    <div>
                        <b>You voted </b><h className='text-accent'> {ObjPoll.choiceDTO.title}</h>
                    </div>
                    <div>
                        <b>Created at </b>{ConvertDateTime(ObjPoll.pollDTO.dateTimeCreated)}
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
                            {/* <Link to={`/PollSummary/${ObjPoll.id}`} className="btn btn-primary align-middle">View Summary</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PollCardHistory;