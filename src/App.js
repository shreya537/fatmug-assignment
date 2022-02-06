import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Fragment } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './home';
import My from './My';
import Write from './Write';
import View from './View';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth, db } from "./firebase";

function App() {
  console.log("app called")
  const [{ user }, dispatch] = useStateValue();
  const [articles, setarticles] = useState([]);

  useEffect(() => {
    // will only run once when the app component loads...

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);
  return (
    <Router>
      <div className="App">
        {!user ? (
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<div><Register /></div>} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<div><Header /><Home /></div>} />
            <Route path='/write' element={<div><Header /><Write /></div>} />
            <Route path='/my' element={<div><Header /><My /></div>} />
            <Route path='/view' element={<div><Header /><View /></div>} />
          </Routes>
        )}

      </div>
    </Router>

  );
}

export default App;
