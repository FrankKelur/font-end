var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h2 className={style.h1}>style.h1</h2>
    <h2 className='h2'>h2</h2>
    <h2 className='h1'>h1</h2>
  </div>,
  document.getElementById('example')
);
