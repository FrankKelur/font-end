import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {enthusiasm} from './demo'

export default combineReducers({
    routing: routerReducer,
    demo: enthusiasm
})