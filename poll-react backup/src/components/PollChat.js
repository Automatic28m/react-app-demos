import { Link } from 'react-router-dom'
import ConvertDateTime from '../function/ConvertDateTime';
function PollChat({ id, title, username, datetime }) {
    return (
        <>
            <div className='flex justify-between items-center hover:bg-slate-100 py-3 px-3 rounded-xl'>
                <div className='w-full'>
                    <div className="chat chat-start w-full flex flex-row gap-5 items-end">
                        <div className='flex flex-row gap-2 items-end'>
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                    <span>{username.substring(0, 2)}</span>
                                </div>
                            </div>
                            <div className="h-full flex flex-col justify-end">
                                <div><b className="text-accent">{username}</b></div>
                            </div>
                        </div>
                        <Link to={`/AnswerPoll/${id}`} className="chat-bubble text-xl transition ease-in hover:scale-105">{title}</Link>
                    </div>
                    <div><h className="text-xs">{ConvertDateTime(datetime)}</h></div>
                </div>
                <div className='w-fit flex gap-3 items-center'>
                    {/* <div className='text-end'>
                        <div><b>31</b></div>
                        <div className='text-xs'>People answered</div>
                    </div> */}
                    <div>
                        {/* <Link to={`/PollSummary/${id}`} className='btn rounded-full btn-outline btn-primary'>View your poll</Link> */}
                        <Link to={`/AnswerPoll/${id}`} className='btn rounded-full btn-outline btn-accent transition ease-in hover:scale-110'>Vote</Link>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </>
    );
}

export default PollChat;