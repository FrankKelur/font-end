import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import React from 'react'
// import ReactDOM from 'react-dom'

// const App = React.createClass({
//   getInitialState() {
//     return { x: 0, y: 0 }
//   },

//   handleMouseMove(event) {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY
//     })
//   },

//   render() {
//     const { x, y } = this.state

//     return (
//       <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
//         <h1>The mouse position is ({x}, {y})</h1>
//       </div>
//     )
//   }
// })

// ReactDOM.render(<App/>, document.getElementById('app'));