import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCartItems, selectTotalPrice } from "../selectors/cartSelectors";

export function NewNavbar() {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    return <div className="navbar bg-primary sticky top-0 z-50">
        <div className="flex-1">
            <Link to='/' className="btn btn-ghost normal-case text-xl text-white">React Online Shop</Link>
        </div>
        <div className="flex-none">
            <div>
                <Link to='/' className="btn btn-primary btn-block">Home</Link>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                    </div>
                </label>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                        <span className="font-bold text-lg">{cartItems.length} Items</span>
                        <span className="text-info">Subtotal: ${totalPrice ? totalPrice.toFixed(2) : '0.00'}</span>
                        <div className="card-actions">
                            <Link to='/ShoppingCart' className="btn btn-primary btn-block">View cart</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="logo192.png" alt="logo192"/>
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>;
}
