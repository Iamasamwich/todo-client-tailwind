import React, { useReducer } from 'react';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import showTodosReducer from './showTodosReducer';
import statusReducer from './statusReducer';
import todoReducer from './todoReducer';
import todosFetchedReducer from './todosFetchedReducer';
import todoToUpdateReducer from './todoToUpdateReducer';

const Context = React.createContext({} as iContext);

export default Context;

export const Store = ({children} : {children: React.ReactNode}) => {
  const [login, loginDispatch] = useReducer(loginReducer, false);
  const [page, pageDispatch] = useReducer(pageReducer, 'home');
  const [appStatus, appStatusDispatch] = useReducer(statusReducer, null);
  const [todosFetched, todosFetchedDispatch] = useReducer(todosFetchedReducer, false);
  const [todos, todosDispatch] = useReducer(todoReducer, [] as iTodoWithSteps[]);
  const [todoToUpdate, todoToUpdateDispatch] = useReducer(todoToUpdateReducer, null);
  const [showTodos, showTodosDispatch] = useReducer(showTodosReducer, 'active');

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