import {createStore} from 'redux';
import {StoreState} from '../types/index';
import reducers from '../reducers/index';
import initState from './initState';

export default () => createStore<StoreState>(reducers, initState)