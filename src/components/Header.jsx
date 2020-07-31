import React from 'react';
import { Link } from "react-router-dom";
import "../styles/header.css"

export default function Header() {
    return (
        <div className="header">
            <h1 className="title">Awesome</h1>
            <Link to="/chat" className="chat-link"><i className="fas fa-paper-plane"></i></Link>
        </div>
    )
}
