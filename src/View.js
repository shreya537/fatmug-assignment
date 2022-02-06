import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { useState } from 'react';

function View() {
    const navigate = useNavigate()
    const [{ user, view_item }, dispatch] = useStateValue();
    const [articletopic, setarticletopic] = useState("");
    const [articledesc, setarticledesc] = useState("");
    const [articlewriter, setarticlewriter] = useState("");
    console.log("here is view item ", view_item)
    useEffect(() => {
        // will only run once when the app component loads...
        var docRef = db.collection("articles").doc(view_item);

        docRef.get().then((doc) => {
            if (doc.exists) {
                const userref = doc.data();
                setarticletopic(userref.topic)
                setarticledesc(userref.description)
                setarticlewriter(userref.writer)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, []);
    const deletearticle = (e) => {
        db.collection("articles").doc(e).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        dispatch({
            type: "CHANGE_VIEW_ITEM",
            id: null
        });
        navigate("/my");
    }
    const updatearticle = (e) => {
        navigate("/Write");
    }
    const buttonsforusers = () => {
        console.log(articlewriter, user.email);
        if (articlewriter == user.email) {
            return (<div>
                <button onClick={() => deletearticle(view_item)}>Delete</button>
                <button onClick={() => updatearticle(view_item)}>Update</button>
            </div>)
        }
        else {
            return (<div></div>)
        }
    }
    return <div>
        <h4>{articletopic}</h4>
        <p>by</p>
        <p>{articlewriter}</p>
        {buttonsforusers()}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="card text-center container">
            <div class="card-body">
                <p>{articledesc}</p>
            </div>
        </div>
    </div>;
}

export default View;
