import * as constants from '../../utils/constants'

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}

export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    }
}