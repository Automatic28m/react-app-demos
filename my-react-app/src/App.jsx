import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Corousel from './components/Carousel';
import UserTable from './components/UserTable';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ShowUserData from './components/ShowUserData';
import DeptTable from './components/DeptTable';

function App() {
    var counter = 0;
    const buttonClick = () => {
        counter++
        alert('You clicked the button ' + counter);
    }
    const colorBtnClick = (color) => { alert('You clicked ' + color + ' button'); }

    const borderStyle = {
        border: '1px solid black'
    }
    return (
        <div className="App">
            <Navbar />
            <h1 className="text-center">Home page</h1>
            <div class="container mt-5">
                <UserTable />
            </div>
            <div className="container my-5 p-2" style={borderStyle}>
                <h2 className="text-center">ReactJS Event</h2>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={buttonClick}>Event Button</button>
                </div>
                <h2 className="text-center">ReactJS Event(Passing Arguments)</h2>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-danger" onClick={() => colorBtnClick("Red")}>Red button</button>
                    <button className="btn btn-success" onClick={() => colorBtnClick("green")}>Red button</button>
                    <button className="btn btn-warning" onClick={() => colorBtnClick("yellow")}>Red button</button>
                </div>
            </div>
            {/* <Footer/> */}
        </div >
    );
}

export default App;
