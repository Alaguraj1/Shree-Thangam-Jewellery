import { useState } from "react";

export const useSetState = (initialState) => {
    const [state, setState] = useState(initialState);
  
    const newSetState = (newState) => {
      setState((prevState) => ({...prevState, ...newState}));
    };
    return [state, newSetState];
  };

  