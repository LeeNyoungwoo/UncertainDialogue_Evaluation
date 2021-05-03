/*
KEAI Chatting App UI
Desription: UI for chatting app in KEAI Lab
Contributers: NW Lee
*/

import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router } from "react-router-dom";

import ChatRoom from './screens/ChatRoom';

function App() {
  return (
    <Router>
      <main>
        <Route exact path="/" component={ChatRoom} />
      </main>
    </Router>
  );
}

export default App;