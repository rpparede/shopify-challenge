import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/Navbar'
import Home from './Components/Home'
import NewPost from './Components/NewPost'
function App() {
  const [state, setState] = useState([])
  useEffect(() => {
    console.log("fetching")
    /*fetch("http://localhost:3080/")
      .then(res => res.json())
      .then(val => setState(val.test1))*/
    axios.get(`http://localhost:3080/`)
      .then(res => {
        setState([JSON.stringify(res.data)]);
      })
  }, [])
  const handleClick = () => {
    const obj = {
      name: "testing post"
    };
    axios.post(`http://localhost:3080/posts/store`, { obj })
      .then(res => {
        setState([JSON.stringify(res.data)]);
      })
  };
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/newPost">New Post</Link>
          </li>
          <li>
            <Link to="/myPosts">My Posts</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/newPost">
            <NewPost />
          </Route>
          <Route path="/myPosts">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
export default App;
