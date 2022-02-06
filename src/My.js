import React from 'react';
import { useStateValue } from "./StateProvider";
import { useState, useEffect } from "react";
import { db } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
function My() {
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();
    const [articles, setarticles] = useState([]);
    // console.log(user.email, " called my");
    useEffect(() => {
        if (user != null) {
            db.collection("articles").where("writer", "==", user.email)
                .onSnapshot(snapshot => (
                    setarticles(snapshot.docs.map(doc => ({
                        id: doc.id,
                        topic: doc.data().topic
                    })))
                ))
        }
    }, [user])
    const gotoarticle = (e) => {
        dispatch({
            type: "CHANGE_VIEW_ITEM",
            id: e
        });
        navigate("/view");
    }
    console.log(articles);
    return <div>
        <div className='container align-items-center btn' data-toggle="tooltip" >
            {articles?.map(item => (
                <div class="card text-center container" onClick={() => gotoarticle(item.id)} style={{ width: "18rem" }}>
                    <div class="card-body">
                        <h5 class="card-title">{item.topic}</h5>
                    </div>
                </div>
            ))}
        </div>
    </div>;
}

export default My;
