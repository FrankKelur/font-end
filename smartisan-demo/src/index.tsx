import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './redux/store/configureStore';
import routes from './routers';
import './styles.css'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('root') as HTMLElement);

function identity<T>(arg: T): T {
    // type MyStr = typeof arg;
    // var s = MyStr();
    global.console.log('arg: ', arg, s)
    return arg;
}
const res = identity<string>('zhaipengchao')
global.console.log('res: ', res)