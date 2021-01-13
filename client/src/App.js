import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState("")
  useEffect(() => {
    console.log("fetching")
    fetch("http://localhost:3080/")
      .then(res => res.json())
      .then(val => setState(val.test1))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {<p>{state}</p>}
    </div>
  );
}

export default App;
