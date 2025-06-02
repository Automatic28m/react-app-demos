import logo from './logo.svg';
import './App.css';
import Home from './feature/Home';
import Login from './feature/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoLoginPage from './route/NoLoginPage';
import ProtectedRoute from './route/ProtectedRoute';
import CreatePoll from './feature/CreatePoll';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NoLoginPage />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/createPoll' element={<CreatePoll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
