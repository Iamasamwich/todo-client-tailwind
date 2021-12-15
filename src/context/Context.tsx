import React, { useReducer } from 'react';
import reducer from './reducer';

const Context = React.createContext({} as iContext);

export default Context;

const initialState : iState = {
  page: 'login',
  login: false,
  appStatus: null,
  showTodos: 'active',
  todosFetched: false,
  todos: [],
  todoToUpdate: null
};

export const Store = ({children} : {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  );
};