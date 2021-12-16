import React, { useContext, useEffect } from 'react';
import { getTodosAction } from '../actions/todos';
import Context from '../context/Context';

const ShowTodos = () => {

  const {todos, todosFetched, todosDispatch, todosFetchedDispatch, appStatusDispatch} = useContext(Context);

  useEffect(() => {
    const getTodos = () => {
      appStatusDispatch({type: 'STATUS', payload: 'loading'});
      todosFetchedDispatch({type: 'TODOS_FETCHED', payload: true});
      getTodosAction()
      .then(res => {
        appStatusDispatch({type: 'STATUS', payload: null});
        todosDispatch({type: 'SET_TODOS', payload: res.todos});
      })
      .catch(err => {
        appStatusDispatch({type: 'STATUS', payload: err.status});
      });
    };

    if (!todosFetched) {
      getTodos();
    };
  }, [todosFetched, appStatusDispatch, todosDispatch, todosFetchedDispatch]);


    console.log('fetched?', todosFetched);
    
  return (
    <>
    </>
  );
};

export default ShowTodos;