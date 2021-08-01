import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Registration />
        <Route path="/login" exact component={() => <Login />}/>
        {/* <Registration /> */}
      </Router>
    </div>
  );
}

export default App;
