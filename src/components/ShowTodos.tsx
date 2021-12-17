import React, { useContext, useEffect, useState } from 'react';
import { getTodosAction } from '../actions/todos';
import Context from '../context/Context';
import styles from '../styles/styles';
import Button from './subComponents/Button';
import ButtonGroup from './subComponents/ButtonGroup';

const ShowTodos = () => {

  const {
    todos, 
    todosFetched, 
    showTodos, 
    pageDispatch,
    todosDispatch, 
    todosFetchedDispatch, 
    appStatusDispatch, 
    showTodosDispatch
  } = useContext(Context);
  const [selectedTodos, setSelectedTodos] = useState([] as iTodoWithSteps[]);

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

  useEffect(() => {
    setSelectedTodos(todos.filter(todo => {
      if (showTodos === 'all') {
        return todo;
      } else {
        return !todo.done 
      };
    }));
  }, [todos, showTodos])

  return (
    <>
      <ButtonGroup>
        <Button
          styling={`${styles.button} ${styles.success}`} 
          text='Add Todo' 
          handleClick={() => pageDispatch({type: 'CHANGE_PAGE', payload: 'addTodo'})}
        />
        <Button
          styling={`${styles.button} ${styles.normal}`}
          text={`${showTodos === 'all' ? 'Show Active Todos' : 'Show All Todos'}`}
          handleClick={() => showTodosDispatch({type: 'SHOW_TODOS', payload: showTodos === 'all' ? 'active' : 'all'})}
        />
      </ButtonGroup>
      {selectedTodos.length}
    </>
  );
};

export default ShowTodos;