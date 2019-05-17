import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import { mixin } from 'core-decorators';
import { SingerMixin } from './mixin'
import { Example } from './hookComponent.jsx';
class App extends Component {

  componentWillMount() {
    console.log('componentWillMounted');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span
            className="App-link" onClick={this.sing}
          >
            Learn React
          </span>
        </header>
        <Example />
      </div>
    );
  }
}

export default App;
