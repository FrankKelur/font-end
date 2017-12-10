const React = require('react');
const ReactDOM = require('react-dom');

var MyTable = React.createClass({
  getInitialState () {
    return {
      list: [
        {
          name: 'Zhai Pengchao',
          first: 'Zhai',
          last: 'Pengchao',
          sex: 'm',
          age: '27'
        },
        {
          name: 'Wang Juan',
          first: 'Wang',
          last: 'Juan',
          sex: 'f',
          age: '25'
        },
        {
          name: 'Wang Renwei',
          first: 'Wang',
          last: 'Renwei',
          sex: 'm',
          age: '28'
        }
      ],
      header: ['name', 'first', 'last', 'sex', 'age']
    }
  },
  render () {
    return <table>
      <thead>
        <tr>
          {this.state.header.map(item => <th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {this.state.list.map(row=> {
          return <tr key={row.name}>
            {this.state.header.map(col => <td key={row[col]}>{row[col]}</td>)}
          </tr>
        })}
      </tbody>
    </table>
  }
})

var dom = <MyTable/>
ReactDOM.render(
  dom,
  document.querySelector('#wrapper')
);
