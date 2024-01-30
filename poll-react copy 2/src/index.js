import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import Signin from './Signin';
import AnswerPoll from './AnswerPoll';
import 'boxicons'
import CreatePoll from './CreatePoll';
import UserProfile from './UserProfile';
import YourPoll from './YourPoll';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import SignOut from './component/Signout';
import PollSummary from './PollSummary';
import SigninReducer from './SigninSlice';
import UserDataReducer from './UserDataSlice';
import PollHistory from './PollHistory';

const store = configureStore({
    reducer: {
        SigninSignup: SigninReducer,
        UserData: UserDataReducer
    },
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/Signin",
        element: <Signin />
    },
    {
        path: "/Signout",
        element: <SignOut />
    },
    {
        path: "/AnswerPoll/:poll_id",
        element: <AnswerPoll />
    },
    {
        path: "/CreatePoll",
        element: <CreatePoll />
    },
    {
        path: "/UserProfile",
        element: <UserProfile />
    },
    {
        path: "/YourPoll",
        element: <YourPoll />
    },
    {
        path: "/PollSummary/:poll_id",
        element: <PollSummary />
    },
    {
        path: "/PollHistory",
        element: <PollHistory />
    },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
