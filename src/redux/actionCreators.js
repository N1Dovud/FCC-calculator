import { UPDATE_CURRENT, SET_CURRENT } from './actions.js';


function set_current(payload ) {
    return {
        action_type: SET_CURRENT,
        value: payload
    }
}

function update_current( payload) {
    return {
        action_type: UPDATE_CURRENT,
        value: payload
    }
}
function set_expression(payload ) {
    return {
        action_type: SET_CURRENT,
        value: payload
    }
}

function update_expression( payload) {
    return {
        action_type: UPDATE_CURRENT,
        value: payload
    }
}

export { set_current, update_current, set_expression, update_expression };