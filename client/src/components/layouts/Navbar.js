import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="container">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Upload Repayment</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/repayment">Repayment Records</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/customer">Customer</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link disabled" to="/pay">Make Payment</Link>
            </li>
            </ul>
        </div>
    )
}

export default Navbar;
