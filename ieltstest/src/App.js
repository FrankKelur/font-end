import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;


class App extends React.Component {

  callback = (key) => {
    console.log(key);
  }

  renderForm () {
    
  }

  render () {
    const enData = [];
    const cnData = [];
    const voiceData = [];
    return <div className="App">
    <Tabs defaultActiveKey="1" onChange={this.callback}>
      <TabPane tab="英译汉" key="en">
        {this.renderForm(enData)}
      </TabPane>
      <TabPane tab="汉译英" key="cn">
        {this.renderForm(cnData)}
      </TabPane>
      <TabPane tab="听写" key="voice">
        {this.renderForm(voiceData)}
      </TabPane>
    </Tabs>
  </div>
  }
}

export default App;
