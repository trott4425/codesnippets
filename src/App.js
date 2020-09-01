//React 
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";


//Custom components
import ListSnippet from "./components/snippet-list.component";
import CreateSnippet from "./components/create-snippet.component";

//CSS
import "bootstrap/dist/css/bootstrap.min.css";




//images
//import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
          <Link to="/" className="navbar-brand">MERN-Stack Code Snippet</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Snippets</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create New Snippet</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <Route path="/" exact component={ListSnippet} />
        <Route path="/create" component={CreateSnippet} />
      </div>
    </Router>
    );
  }
}

export default App;