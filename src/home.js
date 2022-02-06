import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { useState } from 'react';
import "./home.css";

function Home() {
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();
    const [articles, setarticles] = useState([]);

    useEffect(() => {
        // will only run once when the app component loads...
        if (user != null) {
            let temparray = []
            db.collection("articles")
                .onSnapshot(snapshot => (
                    setarticles(snapshot.docs.map(doc => ({
                        id: doc.id,
                        topic: doc.data().topic
                    })))
                ))
        } else {
            // the user is logged out
            dispatch({
                type: "SET_USER",
                user: null,
            });
        }
    }, [user]);
    const gotoarticle = (e) => {
        dispatch({
            type: "CHANGE_VIEW_ITEM",
            id: e
        });
        navigate("/view");
    }
    return <div>
        <h2>welcome {!user ? 'Guest' : user.email}</h2>
        <br></br>
        <br></br>
        <br></br>
        <p>All articles</p>
        <div className='container align-items-center btn smallwidth' data-toggle="tooltip" >
            {articles?.map(item => (
                <div class="card text-center container" onClick={() => gotoarticle(item.id)} style={{ width: "18rem" }}>
                    <div class="card-body">
                        <h5 class="card-title">{item.topic}</h5>
                    </div>
                </div>
            ))}
        </div>
    </div >;
}

export default Home;
