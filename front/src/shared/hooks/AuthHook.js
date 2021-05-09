import {useCallback, useReducer} from 'react';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            state['isLoggedIn'] = true;
            state['id'] = action.id;
            state['username'] = action.username;
            state['token'] = action.token;

            if (action.colour) {
                state['colour'] = action.colour
            }

            return state

        case 'LOGOUT':
            return {isLoggedIn: false, id: 0, username: "", token: "", colour: false}

        case 'SET_COLOUR':
            let storedUser = JSON.parse(localStorage.getItem('user') || null);

            if (storedUser && storedUser.token && new Date(storedUser.expires).getTime() > new Date().getTime()) {
                storedUser['colour'] = action.colour;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }

            return {
                ...state,
                colour: action.colour
            }

        default:
            return state;
    }
}

export const useAuth = () => {
    const [loginState,
        dispatch] = useReducer(authReducer, {
        isLoggedIn: false,
        id: 0,
        username: "",
        token: ""
    });

    // useCallback so that a new function object is not creted on rerender.
    const setLoginState = useCallback(({id, username, token, colour}) => {
        dispatch({type: 'LOGIN', id, username, token, colour});

    }, []);

    const setLogoutState = useCallback(() => {
        dispatch({type: 'LOGOUT'})
    }, [])

    const setColour = useCallback((colour) => {
        dispatch({type: 'SET_COLOUR', colour})
    }, [])

    // should probably split these into grouped methods (alert.func , content.func )
    // if there's any more tbh
    return [loginState, setLoginState, setLogoutState, setColour];
};
