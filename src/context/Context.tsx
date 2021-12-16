import React, { useReducer } from 'react';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';

const Context = React.createContext({} as iContext);

export default Context;

const reducer = (state : any, action: iAction) => {
  return state;
};

export const Store = ({children} : {children: React.ReactNode}) => {
  const [login, loginDispatch] = useReducer(loginReducer, false);
  const [page, pageDispatch] = useReducer(pageReducer, 'home');
  const [appStatus, appStatusDispatch] = useReducer(reducer, null);
  const [todosFetched, todosFetchedDispatch] = useReducer(reducer, false);
  const [todos, todosDispatch] = useReducer(reducer, [] as iTodoWithSteps[]);
  const [todoToUpdate, todoToUpdateDispatch] = useReducer(reducer, null);
  const [showTodos, showTodosDispatch] = useReducer(reducer, 'active');

  return (
    <Context.Provider value={{
      login, loginDispatch,
      page, pageDispatch,
      appStatus, appStatusDispatch,
      todos, todosDispatch,
      todosFetched, todosFetchedDispatch,
      showTodos, showTodosDispatch,
      todoToUpdate, todoToUpdateDispatch  
    }}>
      {children}
    </Context.Provider>
  );
};