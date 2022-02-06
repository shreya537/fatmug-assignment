import React, { useState } from 'react'
import { register } from './auth'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from "./StateProvider";


const Register = () => {
    // const [dispatch] = useStateValue();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(form);
        navigate("/")
    }
    const InputFields = {
        padding: '0.5rem',
        margin: '0.8rem',
        borderRadius: '4px'
    }
    const ButtonStyle = {
        borderRadius: '4px',
        padding: '0.7rem',
        margin: '0.5rem'
    }
    const handlelogin = () => {
        navigate("/");
    }
    console.log("register called")
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <label for="email">Email</label>
                <input type="text" style={InputFields}
                    placeholder="email" id="mail"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })} />
                <br />
                <label for="password">Password</label>
                <input type="password" placeholder="Password"
                    style={InputFields}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })} />
                <br />
                <button type="submit" style={ButtonStyle}>
                    Submit
                </button>
            </form>
            {/* <p>hello register jjjjjjjjjjjjjjjjjjjjjjjjjj</p> */}
            <button className='btn btn-info' onClick={handlelogin}>Already a member? Login</button>
        </div>

    )
}

export default Register