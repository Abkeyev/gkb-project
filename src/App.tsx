import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import Modal from './components/Modal';
import Login from './components/Login';
import Registration from './components/Registration';
import Manager from './components/Manager';
import Request from './components/Request';
import RequestInner from './components/RequestInner';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [logged, setLogged] = React.useState(true)
  return (
    <div className="app-root modal-open">  {/* При открытии модалки добавляется класс modal-open */}
      <Router>
        {
          logged ?
            (<>
              <Sidebar />
              <Switch>
                
                <Route path="/" component={() => <Manager />} exact/>
                <Route path="/orders" component={() => <Request />} exact/>
                <Route path="/orders/title" component={() => <RequestInner />} exact/>
                
              </Switch>
            </>)
            :
            (<Switch>
              {/* <Modal/> */}
              <Route path="/" component={() => <Login />} exact/>
              <Route path="/registration" component={() => <Registration />} exact/>
            </Switch>)
        }
      </Router>
    </div>
  );
}

export default App;
