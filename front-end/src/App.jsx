import { React, useEffect, useState } from 'react'

import './App.css';
import ConfessionList from './components/ConfessionsList';
// import ConfessionListItem from './components/ConfessionsListItem';
import axios from 'axios';



function App() {

  const [confessions, setConfessions] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get("/api/confessions")
    ]).then((res) => {
      console.log(res[0].data)
      setConfessions(res[0].data)
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>Confessions</h1>
      <ConfessionList
        confessionsToParse={confessions}
      />
      </header>
    </div>
  );
}

export default App;
