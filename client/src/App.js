import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
  return (
    <div className="App">
      {<p>{state}</p>}
    </div>
  );
}

export default App;
