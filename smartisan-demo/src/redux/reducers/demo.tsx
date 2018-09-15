import initState from "../store/initState";
import {demo} from '../types/index'
import {INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM} from '../../utils/constants'
import {EnthusiasmAction} from '../actions/index'

export function enthusiasm(state: demo = initState.demo, action: EnthusiasmAction): demo {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return {...state, enthusiasmLevel: state.enthusiasmLevel + 1};
        case DECREMENT_ENTHUSIASM:
            return {...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)};
    }
    return state;
}