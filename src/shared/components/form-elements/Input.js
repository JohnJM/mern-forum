import React, {useReducer, useEffect} from 'react';
import {validate} from '../util/Validators';
const Input = props => {
    // i could use useState hook to manage "isvalid" and "enteredValue" as two
    // seperate instances of useState. But Reducer is better here because the logic
    // is `slightly` more complex;
    const inputReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE':
                return {
                    ...state, //we will  still have istouched because of this, we dont need to change it
                    value: action.val,
                    isValid: validate(action.val, action.validators)
                };
            case 'TOUCH':
                return {
                    ...state, //spread prev state so we dont lose the updated value
                    isTouched: true //override isTouched - we keep initial array from spread
                };
            default:
                return state;
        }
    };

    const [inputState,
        dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false
    });

    const {id, onInput} = props;
    const {value, isValid} = inputState;
    //on state/prop change send to higher level prop function in NewPlace.js
    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, onInput, value, isValid]);

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators});
    };

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    const element = props.element === 'input'
        ? (<input className="border-2 border-black-500"
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}/>)
        : (<textarea className="border-2 border-black-500"
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}/>);
    return (
        <div
            className={`form-control flex flex-col mb-3 ${ !inputState.isValid && inputState.isTouched && 'text-red-500'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
};
export default Input;