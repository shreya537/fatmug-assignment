import React from 'react';
import './Header.css'
import { useNavigate, Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase"
import { useEffect, useState } from "react";


function Header() {
    const [{ view_item, user }, dispatch] = useStateValue();
    const [logout, setlogout] = useState('');
    const navigate = useNavigate();
    const handlewrite = () => {
        dispatch({
            type: "CHANGE_VIEW_ITEM",
            id: null
        });
        console.log("view item nulled")
    }
    const handleauthentication = () => {
        if (user) {
            auth.signOut();
        }
        dispatch({
            type: "SET_USER",
            user: null,
        });
        navigate("/");
    }

    // const logout = () => {
    //     if (user != null) {
    //         return (<li class="nav-item active">
    //             <a class="nav-link btn" onClick={handleauthentication}>My Articles</a>
    //         </li>)
    //     }
    // }
    useEffect(() => {
        // will only run once when the app component loads...
        setlogout(<li class="nav-item active">
            <a class="nav-link btn" onClick={handleauthentication}>Logout</a>
        </li>)
    }, [user]);
    return <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <a class="header_home navbar-brand" href="/">Home</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" onClick={handlewrite} href='/write'>Write Article</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/my">My Articles</a>
                    </li>
                    {logout}
                </ul>
            </div>
        </nav>
    </div>;
}

export default Header;
