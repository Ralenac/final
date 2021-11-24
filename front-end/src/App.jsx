import { React, useEffect, useState, useContext } from 'react';
// import socketClient from "socket.io-client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './components/contexts/UserContext';

import './App.css';
import axios from 'axios';
import ConfessionList from './components/Confession/ConfessionsList';
import Top from './components/navbar/Top';
import LoginForm from './components/navbar/LoginForm';
import RegisterForm from './components/navbar/RegisterForm';
import ConfessionForm from './components/Confession/ConfessionForm';
import Chat from './components/Chat/Chat';

// const io = require("socket.io-client");
const SERVER = "http://localhost:3000";


function App() {

  const [confessions, setConfessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false);
  const [confessionFeed, setConfessionFeed] = useState("recent");
  const { setUser } = useContext(UserContext);


  // const providerValue = useMemo(() => ({user, setUser}), [user, setUser])

  // check if current user is logged in
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      const currentUser = JSON.parse(loggedInUser)
      setUser(currentUser)
    }
  }, [setUser]);

  // load confession feed
  useEffect(() => {
    if (confessionFeed === "recent") {
      Promise.all([
        axios.get("/api/confessions/most_recent")
      ]).then((res) => {
        const mostRecentId = res[0].data;
        return axios.get(`/api/confessions/front_page/${mostRecentId}`);
      }).then((res) => {
        // console.log(res.data);
        setConfessions(res.data);
      }).catch(err => {
        console.log(err.message);
      });
    };

    if (confessionFeed === "popular") {
      Promise.all([
        axios.get("/api/confessions/most_recent/popular")
      ]).then((res) => {
        const idArray = res[0].data;
        // console.log(idArray);
        return axios.get(`/api/confessions/front_page/category_confessions`, { params: { idArray } });
      }).then((res) => {
        // console.log(res.data);
        setConfessions(res.data);
      }).catch(err => {
        console.log(err.message);
      });
    };

    if (typeof confessionFeed === "number") {
      Promise.all([
        axios.get("/api/confessions/most_recent/category", { params: { confessionFeed } })
      ]).then((res) => {
        const idArray = res[0].data;
        // console.log(idArray)
        return axios.get(`/api/confessions/front_page/category_confessions`, { params: { idArray } });
      }).then((res) => {
        // console.log(res.data);
        setConfessions(res.data);
      }).catch(err => {
        console.log(err.message);
      });
    };
  }, [confessionFeed]);


  return (
    <BrowserRouter>
      <div className="App">
        <Top showForm={showForm} setShowForm={setShowForm} setConfessionFeed={setConfessionFeed} setShowLogin={setShowLogin} setShowRegister={setShowRegister}/>
        {showForm && <ConfessionForm confessions={confessions} setConfessions={setConfessions} setShowForm={setShowForm} />}

        <Routes>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/" element={!showLogin && !showRegister && <ConfessionList confessionsToParse={confessions} setConfessions={setConfessions} />} ></Route>
          {/* <Route path="/profile" element={<ConfessionList/>} ></Route> */}
        </Routes>
        <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister}/>
        <RegisterForm showRegister={showRegister} setShowRegister={setShowRegister} showLogin={showLogin} setShowLogin={setShowLogin}/>
      </div>
    </BrowserRouter>

  );
}

export default App;