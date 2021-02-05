import { useCallback, useReducer } from 'react';


const formReducer = (state, action) => {
    switch(action.type) {
      case 'input_change':
        let formIsValid = true;
  
        for (const inputid in state.inputs) {
          if (inputid === action.inputid) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputid].isValid;
          }
        }
  
        //console.log(state.inputs); //returns previous state which is spread and then updated
  
        return {
          ...state,//spread to copy existing state obj
          inputs: {
            ...state.inputs, //spread to copy existing inner inputs object
            [action.inputid]: {value: action.value, isValid: action.isValid} //this overrides any which were changed, 
                                                                             //but we keep old values too because we spread the object
          },
          isValid: formIsValid
        };


      case 'SET_DATA':
        return {
          inputs: action.inputs,
          isValid: action.formIsValid
        };

      default: 
       return state;
  
    }
  }


export const useForm = (initInputs, initValidity) => {
    const [formState, dispatch] = useReducer(formReducer,
        {
          inputs: initInputs,
          isValid: initValidity
        });
        
    //useCallback so that a new function object is not creted on rerender. (input -> useEffect will rerender the input)
      const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
          type: 'input_change',
          value: value, 
          isValid: isValid, 
          inputid: id
       });    
       //console.log(formState.inputs); //this one never changes - will always return default state
     }, []);

     const setFormData = useCallback((inputdata, formValidity) => {
       dispatch({
         type: 'SET_DATA',
         inputs: inputdata,
         formIsValid: formValidity
       })
     })

     return [formState, inputHandler, setFormData] ;

};    
