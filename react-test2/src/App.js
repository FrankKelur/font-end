import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {name: 'zhai'}
    }

    changeName() {
        this.setState({name: 'frank'});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <MyComponent name={this.state.name}></MyComponent>
                <button onClick={this.changeName.bind(this)}>click to change</button>
            </div>
        );
    }
}

export default App;
