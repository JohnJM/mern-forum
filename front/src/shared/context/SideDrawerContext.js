import { createContext } from 'react';

export const SideDrawerContext = createContext({
    open: false,
    alertMsg: {},
    setContent: () => {},
    displayAlertMsg: () => {}
});

