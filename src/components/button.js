import { useDispatch, useSelector } from 'react-redux';
import { ID, NUMBERS, OPERATORS, NUMBERS_ID, OPERATORS_ID, ADDITIVE, MULTIPLICATIVE, BUTTONTYPES } from './ids.js';
import { set_current, update_current, set_expression, update_expression } from '../redux/actionCreators';
import { evaluate } from 'mathjs';
import React from 'react';

function Button({ id, buttonType }) {
    let className = "none";
    const dispatch = useDispatch();
    if (OPERATORS_ID.includes(id)) {
        className = "operator";
    }
    else if (NUMBERS_ID.includes(id)) {
        className = "number";
    }
    if (id === "display") {
        const expression = useSelector(state => state.expression);
        const current = useSelector(state => state.current);
        return (
            <div id={id}>
                <div className={floater}>{expression + current}</div>
                <div className={floater}>{current ? current : "0"}</div>
            </div>
        )
    }
    else {
        const expression = useSelector(state => state.expression);
        const current = useSelector(state => state.current);
        const update = () => {
            // number is pressed
            if (NUMBERS_ID.includes(id)) {
                //if the current is  empty
                if (current === "") {
                    //set current to that number
                    dispatch(set_current(buttonType));
                } 
                else if (current === "0" && id !== "zero") {
                    dispatch(set_current(buttonType));
                }
                // if current is some other number
                else if (NUMBERS.includes(current[0])) {
                    // it is possible that the current number was the result of the previous equation
                    if (expression[expression.length - 1] === "=") {
                        dispatch(set_current(buttonType));
                        dispatch(set_expression(""));
                    }
                    // otherwise, it is a normal number, so we are supposed to add the clicked number to current
                    else if (current.length < 15) {
                        dispatch(update_current(buttonType));
                    }
                }
                // if current is an operator
                else if (OPERATORS.includes(current)) {
                    //send that operator to expression and set the current to the number clicked
                    dispatch(update_expression(current));
                    dispatch(set_current(buttonType));
                }
            }
            // operator is pressed
            else if (OPERATORS_ID.includes(id)) {
                // in case the current is empty and minus or plus is clicked
                if (current === "" && ADDITIVE.includes(buttonType)) {
                    dispatch(set_current(buttonType));
                }
                // in other cases
                else {
                // if the last item in the expression is not an operator
                    if (expression && !OPERATORS.includes(expression[expression.length - 1])) {
                        // if the current is / or X and the clicked operator is + or -, we store. Also, when the numbers are opposite additives, we also store them 
                        if (MULTIPLICATIVE.includes(current) && ADDITIVE.includes(buttonType) || (current === "+" && buttonType === "-") || (current === "-" && buttonType === "+")) {
                            dispatch(update_expression(current));
                            dispatch(set_current(buttonType));
                        }
                        // if the current holds numbers, it is enough to check the first char because if it is a number, 100% the rest is also a number, also current is not empty here
                        else if (NUMBERS.includes(current[0])) {
                            // send the number to the expression and store the current operator in the current
                            dispatch(update_expression(current));
                            dispatch(set_current(buttonType));
                        }
                        // in other cases, just set the current to that operator
                        else {
                            dispatch(set_current(buttonType));
                        }
                    }

                    // if there is already an operator at the end of the expression and current is also operator and again an operator is clicked
                    else {
                        // if the clicked button is not the same as the current button because if it is, we just do nothing
                        if (buttonType !== current) {
                            // we get rid of that operator in the expression and set the current to the clicked operator
                            dispatch(set_expression(expression.slice(0, -1)));
                            dispatch(set_current(buttonType));
                        } 
                    }
                }
            }
            else if (buttonType === ".") {

                // in the initial condition
                if (current === "") {
                    dispatch(set_current("0."));
                }
                // when current is operator
                else if (OPERATORS.includes(current)) {
                    dispatch(update_expression(current));
                    dispatch(set_current("0."));
                }
                // if the current is some number and  it does not have a comma
                else if (!current.includes(".")) {
                    dispatch(update_current("."));
                }
            }
            // equal sign is clicked
            else if (buttonType === "=") {
                //if current is an operator
                if (OPERATORS.includes(current)) {
                    // in case the last item in the expression contains an operator
                    if (OPERATORS.includes(expression[expression.length - 1])) {
                        dispatch(set_expression(expression.slice(0, -1)));
                    }
                    // do the calculation
                    let trueExpression = expression;
                    trueExpression = trueExpression.replace("X", "*");
                    const result = round(evaluate(trueExpression), 4);
                    dispatch(update_expression("="));
                    dispatch(set_current(result));
                }
                else {
                    // do the calculation
                    let trueExpression = expression + current;
                    trueExpression = trueExpression.replace("X", "*");
                    const result = round(evaluate(trueExpression), 4);
                    dispatch(update_expression("="));
                    dispatch(set_current(result));
                }
            }
            else if (id === "clear") {
                dispatch(set_expression(""));
                dispatch(set_current(""));
            }
        }
        return (
            <button onClick={update} className={className== "none" ? "" : className} id={id}>{buttonType}</button>
        )

    }
}

export default function Calculator() {
    return (
        <>
            {ID.map((id, index) => {
                <Button key={id} id={id} buttonType={BUTTONTYPES[index]} />
            })}
        </>
    );
};