import {useCallback, useReducer} from 'react';

const sideDrawerReducer = (state, action) => {
    switch (action.type) {
        case 'DISPLAY_CONTENT':
            return {
                ...state,    
                isOpen: true, content: action.content
            }

        case 'SET_CONTENT':
            return {
                ...state,
                content: action.content
            }

        case 'TOGGLE_IS_OPEN':
            return {
                ...state,
                isOpen: !state.isOpen
            }

        case 'DISPLAY_ALERT_MSG':
            return {
                ...state,
                alertMsg: action.alertMsg,
            }

        default:
            return state;
    }
}

export const useSideDrawer = () => {
    const [sideDrawerState,
        dispatch] = useReducer(sideDrawerReducer, {isOpen: false});

    // useCallback so that a new function object is not creted on rerender. (input ->
    // useEffect will rerender the input)bv
    const displayContent = useCallback((content) => {
        dispatch({type: 'DISPLAY_CONTENT', content: content});
        // console.log(formState.inputs); //this one never changes - will always return
        // default state
    }, []);

    const toggleIsOpen = useCallback((isOpen) => {
        dispatch({type: 'TOGGLE_IS_OPEN', isOpen: isOpen})
    }, [])

    const setContent = useCallback((content) => {
        dispatch({type: 'SET_CONTENT', content: content})
    }, [])

    const displayAlertMsg = useCallback((msg, btnColour) => {
        dispatch({type: 'DISPLAY_ALERT_MSG', alertMsg: {msg: msg, colour: btnColour}})
    }, [])


    //should probably split these into grouped methods (alert.func , content.func ) if there's any more tbh
    return [sideDrawerState, toggleIsOpen, displayContent, setContent, displayAlertMsg];

};
