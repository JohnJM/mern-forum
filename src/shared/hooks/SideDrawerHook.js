import { useCallback, useReducer } from 'react';


const sideDrawerReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY_CONTENT':
        return {
            // ...state, not required here - old values don't seem required.
            isOpen: true,
            content: action.content
        } 

        case 'TOGGLE_IS_OPEN': 
        return {
            ...state,
            isOpen: !state.isOpen
        }
        
        //not sure if this will be required.
        case 'APPEND_TO_CURRENT_SIDEBAR': 
        return state

    default:
        return state;
  }
}


export const useSideDrawer = () => {
    const [sideDrawerState, dispatch] = useReducer(sideDrawerReducer,
        {
          isOpen: false
          
        });

        
    //useCallback so that a new function object is not creted on rerender. (input -> useEffect will rerender the input)
      const displayContent = useCallback((content) => {
        dispatch({
          type: 'DISPLAY_CONTENT',
          content: content

       });    
       //console.log(formState.inputs); //this one never changes - will always return default state
     }, []);

     const toggleIsOpen = useCallback((isOpen) => {
       dispatch({
         type: 'TOGGLE_IS_OPEN',
         isOpen: isOpen
       })
     },[])

     return [sideDrawerState, toggleIsOpen, displayContent] ;

};    
