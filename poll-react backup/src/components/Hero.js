import {Link} from 'react-router-dom'

function Hero() {
    return (
        <>
            <div className="hero h-[50rem]" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)', backgroundAttachment: 'fixed' }}>
            {/* <div className="hero h-[50rem] bg-slate-950"> */}
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-left text-neutral-content">
                    <div className="max-w-screen-md">
                        <h1 className="mb-5 text-6xl font-bold uppercase">Every Vote Takes <br/><h className='text-accent'>The W<box-icon name='world' color='#c149ad' animation='spin' size='45px'></box-icon>rld </h>  One Step Closer to Progress</h1>
                        <p className="mb-5">Let people know your opinions by answering their questions</p>
                        <Link className="transition ease-in btn btn-outline btn-accent hover:scale-110" to="/CreatePoll">Create your own poll</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;