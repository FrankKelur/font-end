import {connect, Dispatch} from 'react-redux';
import Hello from '../components/hello';
import * as actions from '../redux/actions/index'
import {StoreState} from '../redux/types/index';

export function mapStateToProps({demo: {enthusiasmLevel, languageName}}: StoreState) {
    return {
        enthusiasmLevel,
        name: languageName
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm())
    }
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, stateProps, dispatchProps, ownProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hello);