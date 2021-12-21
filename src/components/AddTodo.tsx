import React, { useContext, useEffect, useState } from 'react';
import { addTodoAction } from '../actions/todos';
import Context from '../context/Context';
import styles from '../styles/styles';
import Button from './subComponents/Button';
import ButtonGroup from './subComponents/ButtonGroup';

const AddTodo = () => {

  const {pageDispatch, appStatusDispatch, todosDispatch} = useContext(Context);
  
  const today = () => {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  };

  const [todo, setTodo] = useState('');
  const [todoError, setTodoError] = useState(false);
  const [dueDate, setDueDate] = useState(today());
  const [dueDateError, setDueDateError] = useState(false);
  const [anyError, setAnyError] = useState(false);


  today();

  useEffect(() => {
    setTodoError(!todo ? true : false);
  }, [todo]);

  useEffect(() => {
    setDueDateError(!dueDate ? true : false);
  }, [dueDate]);

  useEffect(() => {
    setAnyError(todoError || dueDateError ? true : false)
  }, [todoError, dueDateError])

  const handleSubmit = (e ?: React.FormEvent) => {
    if (anyError) return;
    if (e) {
      e.preventDefault();
    };
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    addTodoAction({todo, dueDate})
    .then(res => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'ADD_TODO', payload: res.todo});
      pageDispatch({type: 'CHANGE_PAGE', payload: 'home'});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
      console.log(err);
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Todo</label>
        <input 
          className={`${styles.input} ${todoError && styles.inputError}`}
          value={todo}
          onChange={e => setTodo(e.target.value)}
          autoFocus
        />
        {todoError && 
          <p 
            className={styles.inputAdvice}
          >Enter a todo</p>
        }
        <label>Due Date</label>
        <input 
          className={`${styles.input} ${dueDateError && styles.inputError}`}
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        {dueDateError && 
          <p className={styles.inputAdvice}>
            Enter a valid due date 'yyyy-mm-dd' I'll put a calendar in later
          </p>
        }
        <ButtonGroup>
          {!anyError && 
            <Button 
              text='Add Todo'
              styling={`${styles.button} ${styles.success}`}
              handleClick={handleSubmit}
            />
          }
          <Button
            text='Cancel'
            styling={`${styles.button} ${styles.warning}`}
            handleClick={() => pageDispatch({type: 'CHANGE_PAGE', payload: 'home'})}
          />
        </ButtonGroup>
      </form>
    </div>
  )
};

export default AddTodo;
