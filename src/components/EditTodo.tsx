import React, { useContext, useEffect, useState } from 'react';
import { updateTodoAction } from '../actions/todos';
import Context from '../context/Context';
import styles from '../styles/styles';
import Button from './subComponents/Button';
import ButtonGroup from './subComponents/ButtonGroup';

const EditTodo = () => {
  const {todoToUpdate, todoToUpdateDispatch, pageDispatch, appStatusDispatch, todosDispatch} = useContext(Context);

  const [todo, setTodo] = useState('');
  const [todoError, setTodoError] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [dueDateError, setDueDateError] = useState(false);
  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    if (todoToUpdate) {
      setTodo(todoToUpdate.todo as string);
      setDueDate(todoToUpdate.dueDate as string);
    };
  }, [todoToUpdate]);

  useEffect(() => {
    setTodoError(!todo ? true : false);
  }, [todo])

  useEffect(() => {
    setDueDateError(!dueDate ? true : false);
  }, [dueDate]);

  useEffect(() => {
    setAnyError((todoError || dueDateError) ? true : false);
  }, [todoError, dueDateError]);

  const handleCancel = () => {
    todoToUpdateDispatch({type: 'TODO_TO_UPDATE', payload: null});
    pageDispatch({type: 'CHANGE_PAGE', payload: 'home'});
  };

  const handleUpdateTodo = (e ?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    };
    if (todoToUpdate && todo === todoToUpdate.todo && dueDate === todoToUpdate.dueDate) return;
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    updateTodoAction({...todoToUpdate as iTodoWithSteps, todo: todo, dueDate, done: false})
    .then(res => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'UPDATE_TODO', payload: res.todo});
      pageDispatch({type: 'CHANGE_PAGE', payload: 'home'});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleUpdateTodo}>
        <label>Todo</label>
        <input
          className={`${styles.input} ${todoError && styles.inputError}`}
          value={todo ? todo : ''}
          onChange={e => setTodo(e.target.value)}
        />
        {todoError && 
        <p className={styles.inputAdvice}>
          Enter a todo
        </p>}
        <label>Due Date</label>
        <input 
          className={`${styles.input} ${dueDateError && styles.inputError}`}
          value={dueDate ? dueDate : ''}
          onChange={e => setDueDate(e.target.value)}
        />  
        {dueDateError && 
        <p className={styles.inputAdvice}>
          Enter a due date
        </p>}
        <ButtonGroup>
          {!anyError && 
            <Button
              text='Update Todo'
              styling={`${styles.button} ${styles.success}`}
              handleClick={handleUpdateTodo}
            />
          }
          <Button
            text='Cancel'
            styling={`${styles.button} ${styles.warning}`}
            handleClick={handleCancel}
          />
        </ButtonGroup>
      </form>
    </div>
  );
};

export default EditTodo;