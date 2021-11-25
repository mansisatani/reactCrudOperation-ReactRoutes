import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CrudForm from './crudFrom';
import FormList from './component/FormList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CrudForm}/>
          <Route path="/login" component={FormList} />
            <Route path="/:id" component={CrudForm}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
