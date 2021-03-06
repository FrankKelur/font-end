import React from 'react';
// import logo from './logo.svg';
import _ from 'lodash';
import './App.scss';
import { Badge, Tabs, Input, Button, Row, Col, Pagination, Icon, Modal, Checkbox, Slider, Rate, Select } from 'antd';
import service from './service';
const { Option } = Select;
const tagList = ['', 'w', '*', 'phrase', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

const TabPane = Tabs.TabPane;

const wait = (t) => {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000, true);
  });
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currTab: 'voice',
      hoverKey: '',
      focusKey: '',
      activeWord: '',
      modalVisible: false,
      // showAnswer: false,
      span: 2.5,
      speed: 1,
      showEN: false,
      message: [],
      en: {
        tag: '',
        data: {},
        pageNum: 1,
        pageSize: 30,
        totol: 0,
        errorOnly: true,
        errorTime: 1,
      },
      cn: {
        tag: 'w',
        data: {},
        originData: {},
        pageNum: 1,
        pageSize: 30,
        totol: 0,
        errorOnly: true,
        errorTime: 1,
      },
      pronounce: {
        tag: '',
        data: {},
        pageNum: 1,
        pageSize: 30,
        totol: 0,
        errorOnly: true,
        errorTime: 1,
      },
      voice: {
        tag: '*',
        data: {},
        pageNum: 1,
        totol: 0,
        pageSize: 30,
        errorOnly: true,
        errorTime: 1,
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  tabChange = async (currTab) => {
    await this.getData(currTab);
    this.setState({ currTab });
  }

  enChange(currTab, key, value) {
    let { data, ...props } = this.state[currTab];
    data[key] = value;
    this.setState({ [currTab]: { ...props, data } });
  }

  dataChange(currTab, key, value) {
    let { data, ...props } = this.state[currTab];
    data[key] = value;
    // console.log('currTab, { ...props, data }', currTab, { ...props, data });
    this.setState({ [currTab]: { ...props, data } });
  }

  async getData(type = this.state.currTab) {
    let { pageNum, errorOnly, errorTime, pageSize, tag } = this.state[type];
    let { data, total } = await service.getData(pageNum, type, errorOnly, errorTime, pageSize, tag);
    data = this.getRandomList(data);
    let originData = _.cloneDeep(data);
    console.log('originData', originData);
    if (type == 'cn') {
      Object.keys(data).forEach((key) => {
        data[key] = '';
      });
    }
    // data
    let state = {
      [type]: {
        ...this.state[type],
        originData,
        data,
        total
      }
    }
    this.setState(state);
  }

  pageChange = (pageNum) => {
    let { currTab: type } = this.state;
    this.setState({ [type]: { ...this.state[type], pageNum } }, () => {
      this.getData();
    });
  }

  errorTimeChange = (errorTime) => {
    let { currTab: type } = this.state;
    this.setState({ [type]: { ...this.state[type], errorTime } }, () => {
      this.getData();
    });
  }

  speedChange = (span) => {
    this.setState({ span });
  }

  errorOnlyChange = (errorOnly) => {
    let { currTab: type } = this.state;
    this.setState({ [type]: { ...this.state[type], errorOnly } }, () => {
      this.getData();
    });
  }

  async submit(type) {
    let { data, pageNum, errorOnly, errorTime, pageSize, tag } = this.state[type];
    let { message } = await service.submit(type, data, pageNum, errorOnly, errorTime, pageSize, tag);
    this.setState({ modalVisible: true, message });
  }

  async pronounce(targetKey) {
    await wait(1);
    let { currTab } = this.state;
    let { data } = this.state[currTab]
    let speed = 1;
    if (targetKey) {
      this.setState({ activeWord: targetKey });
      await service.sayWord(targetKey, speed);
    } else {
      for (let activeWord of Object.keys(data)) {
        this.setState({ activeWord });
        await service.sayWord(activeWord, speed);
        let { span } = this.state;
        await wait(span);
      }
    }
    this.setState({ activeWord: '' });
  }

  async deleteWord(type, key, tag) {
    await service.deleteWord(type, key, tag);
    this.getData();
  }

  onShowSizeChange = (current, pageSize) => {
    let { currTab: type } = this.state;
    this.setState({ [type]: { ...this.state[type], pageSize } }, () => {
      this.getData();
    });
  }

  // toggleShowAnswer = ({ target: { checked } }) => {
  //   this.setState({ showAnswer: checked });
  // }

  onMouseEnter = (hoverKey) => {
    this.setState({ hoverKey });
  }

  focusKey = (focusKey) => {
    this.setState({ focusKey });
  }

  tagChange = (tag) => {
    let { currTab: type } = this.state;
    this.setState({ [type]: { ...this.state[type], tag } }, () => {
      this.getData();
    });
  }

  onMouseLeave = () => {
    this.setState({ hoverKey: '' });
  }

  renderFormItem(key, data, idx, originData) {
    let { currTab, activeWord, showEN } = this.state;
    let active = activeWord === key;
    if (currTab === 'voice') {
      return <Input tabIndex={idx + 1} value={data[key]} className={(active && 'active-input') || ''}
        onPressEnter={() => this.pronounce(key)}
        suffix={<Icon type="sound" className={(active && 'active-sound') || ''} onClick={() => this.pronounce(key)} />}
        onChange={(e) => this.dataChange(currTab, key, e.target.value)} />
    } else if (currTab === 'pronounce' || currTab === 'en') {
      let checked = !!data[key];
      return <Input tabIndex={idx + 1} value={key} className={(active && 'active-input') || ''}
        onMouseEnter={() => this.onMouseEnter(key)}
        onMouseLeave={this.onMouseLeave}
        onFocus={() => this.focusKey(key)}
        suffix={<Icon type="sound" className={(active && 'active-sound') || ''} onClick={() => this.pronounce(key)} />}
        addonAfter={<Checkbox checked={checked} onChange={(e) => this.enChange(currTab, key, e.target.checked)} />}
        onPressEnter={() => this.pronounce(key)} />
    } else if (currTab === 'cn') {
      return <Input tabIndex={idx + 1} value={showEN ? originData[key] : data[key]} className={(active && 'active-input') || ''}
        addonBefore={<span>{key}</span>}
        onPressEnter={() => this.pronounce(originData[key])}
        onChange={(e) => this.dataChange(currTab, key, e.target.value)} />
    }
  }

  getRandomList(data) {
    return Object.keys(data).sort(() => 0.5 - Math.random()).reduce((res, key) => ({
      ...res,
      [key]: data[key]
    }), {});
  }

  changeSpeed = () => {
    let list = [1, 1.2, 1.5];
    let { speed } = this.state;
    let index = list.findIndex((item) => speed == item);
    if (++index >= 3) {
      index = 0;
    }
    this.setState({ speed: list[index] });
  }

  toggleshowEN = () => {
    let { showEN } = this.state;
    this.setState({ showEN: !showEN });
  }

  renderForm(type) {
    let { currTab, span, speed, hoverKey, activeWord, showEN } = this.state;
    let { pageNum, total, data, errorTime, errorOnly, pageSize, tag, originData } = this.state[currTab]
    return <div className='container'>
      <div className='header'>
        <Select onChange={this.tagChange} style={{ width: '80px' }}>
          {tagList.map((key) => <Option key={key} value={key}>{key || '--'}</Option>)}
        </Select>
        <Checkbox checked={errorOnly || false} onChange={({ target: { checked } }) => this.errorOnlyChange(checked)} >隐藏正确的</Checkbox>
        {/* {currTab ==== 'voice' && <Checkbox checked={showAnswer} onChange={this.toggleShowAnswer} >显示答案</Checkbox>} */}
        <Rate count={5} value={errorTime} onChange={this.errorTimeChange} character={<Icon type="frown" />} />
        {currTab == 'cn' ? <Checkbox value={showEN} onChange={this.toggleshowEN}></Checkbox> : <Icon type="sound" className={activeWord && 'acitve-sound'} onClick={() => this.pronounce()} />}
        <Pagination className='pagination' current={pageNum}
          pageSizeOptions={['10', '30', '50', '100', '200', '400', '1000']}
          defaultPageSize={pageSize}
          onShowSizeChange={this.onShowSizeChange}
          showSizeChanger={true}
          total={total} onChange={this.pageChange} />
        <Button onClick={() => this.submit(type)} type='primary'>提交</Button>
        <Slider min={0.5} max={3} value={span} step={0.5} onChange={this.speedChange} tipFormatter={(val) => `间隔${val}s`} />
        <Badge count={speed + 'x'} onClick={this.changeSpeed}>
        </Badge>
        {currTab === 'en' && <div className='correct hover'>{data[activeWord || hoverKey]}</div>}
        {currTab === 'voice' && <div className='correct'>{activeWord}</div>}
      </div>
      <Row type="flex">
        {
          Object.keys(data).map((key, idx) => <Col span={8} key={key} className='col'>
            <div className='middle'>
              {this.renderFormItem(key, data, idx, originData)}
            </div>
            <div className='right'>
              <Icon type="delete" onClick={() => this.deleteWord(currTab, key, tag)} />
            </div>
          </Col>)
        }
      </Row>
    </div>
  }
  handleModalCancel = () => {
    this.setState({ modalVisible: false });
    this.getData();
  }

  render() {
    let { currTab, modalVisible, message } = this.state;
    return <div className="App">
      <Modal
        title="Error List"
        visible={modalVisible}
        onCancel={this.handleModalCancel}
        footer={null}
      >
        {
          message.map(({ key, val, answer }) => {
            return <p className='error-row' key={key}>
              <span>{key}</span>
              <span>{val}</span>
              <span>{answer}</span>
              <Icon type="sound" onClick={() => this.pronounce(key)} />
            </p>
          })
        }
      </Modal>
      <Tabs activeKey={currTab} onChange={this.tabChange}>
        <TabPane tab="听写" key="voice">
          {this.renderForm('voice')}
        </TabPane>
        <TabPane tab="英译汉" key="en">
          {this.renderForm('en')}
        </TabPane>
        <TabPane tab="汉译英" key="cn">
          {this.renderForm('cn')}
        </TabPane>
        {/* <TabPane tab="跟读" key="pronounce">
          {this.renderForm('pronounce')}
        </TabPane> */}
      </Tabs>
    </div>
  }
}

export default App;
