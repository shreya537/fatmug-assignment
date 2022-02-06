import React from 'react';
import "./Write.css"
import { useStateValue } from "./StateProvider";
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { db } from "./firebase";



function Write() {
    const [{ user, view_item }, dispatch] = useStateValue();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        Topic: '',
        Description: ''
    })
    useEffect(() => {
        // will only run once when the app component loads...

        if (view_item != null) {
            var docRef = db.collection("articles").doc(view_item);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    const userref = doc.data();
                    setForm({ ...form, Topic: userref.topic, Description: userref.description });
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, []);
    const handlesubmit = () => {
        if (view_item != null) {
            db.collection("articles").doc(view_item).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
        if (user != null) {
            dispatch({
                type: "SUBMIT",
                writer: user.email,
                topic: form.Topic,
                description: form.Description,
                id: user.email + "*#*#" + form.Topic
            });
        }
        dispatch({
            type: "CHANGE_VIEW_ITEM",
            id: null
        });
        navigate("/my");
    }
    return <div>
        <form>
            <div class="mb-3 container Write_topic">
                <label class="form-label">Your Topic</label>
                <input value={form.Topic} onChange={(e) =>
                    setForm({ ...form, Topic: e.target.value })} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

            </div>
            <div class="mb-3 container n">
                <label class="form-label">Your Artcile</label>
                <textarea name="paragraph_text" cols="50" rows="10" value={form.Description} onChange={(e) =>
                    setForm({ ...form, Description: e.target.value })} class="form-control Write_description" id="exampleInputEmail1" aria-describedby="emailHelp"></textarea>
                {/* <input value={form.Description} onChange={(e) =>
                    setForm({ ...form, Description: e.target.value })} class="form-control Write_description" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}
            </div>
            <button type="submit" onClick={handlesubmit} class="btn btn-primary">Submit</button>
        </form>
        {/* <p>Write something</p> */}
    </div>;
}

export default Write;
