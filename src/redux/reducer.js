import { UPDATE_CURRENT, SET_CURRENT, UPDATE_EXPRESSION, SET_EXPRESSION } from './actions.js';

//initial state
const initialState = { 
    expression: "",
    current: ""
 };


// reducer
export default function reducer(state = initialState, { type, value }) {
    switch (type) {
        case UPDATE_EXPRESSION:
            return { ...state, expression: state.expression + value };
        case SET_EXPRESSION:
            return { ...state, expression: value };
        case UPDATE_CURRENT:
            return { ...state, current: state.current + value};
        case SET_CURRENT:
            return { ...state, current: value };
        default:
            return state;
    }
}