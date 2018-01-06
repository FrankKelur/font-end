import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
  return <button className='square' onClick={props.onClick}>{props.value}</button>
}

class Board extends React.Component {
  render () {
    var rows = [0, 1, 2].map(i => (<div  key={i} className="board-row">
      {[0, 1, 2].map(j => (<Square  key={i+''+j+'s'} value={this.props.squares[3 * i + j]} onClick={() => this.props.onClick(3 * i + j)}/>))}
    </div>))

    return <div>
      {rows}
    </div>
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [],
      currStep: -1,
      isXNext: true
    }
  }

  clickHandler (i) {
    var pre = this.state.history[this.state.currStep] || {squares: Array(9).fill(null)}
    var squares = pre.squares.slice()
    squares[i] = this.state.isXNext ? 'X' : 'O'
    if (isWinFunc(pre.squares) || pre.squares[i]) {
      return
    }
    this.setState({
      history: this.state.history.concat([{squares}]),
      currStep: this.state.currStep + 1,
      isXNext: !this.state.isXNext
    })
  }

  gotoStep (i) {
    console.log('gotoStep', i)
    this.setState({
      currStep: i,
      isXNext: i % 2 === 0
    })
  }

  render () {
    var current = this.state.history[this.state.currStep] || {squares: Array(9).fill(null)}
    var winner = isWinFunc(current.squares)
    var status = null
    if (winner) {
      status = <div>Winner is: {winner}</div>
    } else {
      status = <div>Next step is: {this.state.isXNext?'X':'O'}</div>
    }
    var stepList = [<div key='-1'><button onClick={()=>this.gotoStep(-1)}>Reset</button></div>].concat(this.state.history.map((history, idx) => <div key={idx}><button onClick={() => this.gotoStep(idx)}>Go to move {idx + 1}</button></div>))

    return <div className='game'>
      <div className="game-board">
        <Board onClick={(i) => this.clickHandler(i)} squares={current.squares}/>
      </div>
      <div className='game-info'>
        {status}
        {stepList}
      </div>
    </div>
  }
}

function isWinFunc (squares) {
  var matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (var i in matrix) {
    var [a, b, c] = matrix[i]
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }
  return false
}

ReactDOM.render(<Game/>, document.getElementById('root'))
