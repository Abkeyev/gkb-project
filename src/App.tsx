import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';
import Manager from './components/Manager';
import Request from './components/Request';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="app-root">
      <Router>
        <Sidebar />
        <Manager />
        {/* <Request /> */}
        {/* <Route path="/login" exact component={() => <Login />}/> */}
        {/* <Registration /> */}
      </Router>
    </div>
  );
}

export default App;
