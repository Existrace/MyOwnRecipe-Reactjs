import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Connexion from "./components/Connexion";
import NotFound from "./components/NotFount";


const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Connexion}/>
            <Route exact path='/pseudo/:pseudo' component={App}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
