import { UPDATE_CURRENT, SET_CURRENT, SET_EXPRESSION, UPDATE_EXPRESSION } from './actions.js';


function set_current(payload) {
    return {
        type: SET_CURRENT,
        value: payload
    }
}

function update_current(payload) {
    return {
        type: UPDATE_CURRENT,
        value: payload
    }
}
function set_expression(payload) {
    return {
        type: SET_EXPRESSION,
        value: payload
    }
}

function update_expression(payload) {
    return {
        type: UPDATE_EXPRESSION,
        value: payload
    }
}

export { set_current, update_current, set_expression, update_expression };