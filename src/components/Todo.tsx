import React, { useContext, useState } from 'react';
import styles from '../styles/styles';
import CheckIcon from '@heroicons/react/solid/CheckIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import PencilIcon from '@heroicons/react/solid/PencilIcon';
import RefreshIcon from '@heroicons/react/solid/RefreshIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';
import { deleteTodoAction, resetTodoAction, updateTodoAction } from '../actions/todos';
import Context from '../context/Context';
import ShowSteps from './ShowSteps';

const Todo = ({todo} : {todo: iTodoWithSteps}) => {
  const {appStatusDispatch, todosDispatch, todoToUpdateDispatch, pageDispatch} = useContext(Context);
  const [showSteps, setShowSteps] = useState(false);

  const showCompleted = () => {
    if (todo.steps.length === 0) {
      return "No steps"
    } else {
      let total = 0;
      let done = 0;
      todo.steps.forEach(step => {
        total ++;
        if (step.done) {
          done ++;
        };
      });
      return `${done}/${total} steps completed`;
    };
  };

  const showDueDate = () => {
    const d = new Date();
    const todaysDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const now = Math.floor(new Date(`${todaysDate} 00:00`).getTime() / (1000 * 3600 * 24));
    const due = Math.floor(new Date(`${todo.dueDate} 00:00`).getTime() / (1000 * 3600 * 24));
    const daysTilDue = due - now;

    let text : string;
    if (daysTilDue < 0) {
      text = `${Math.abs(daysTilDue)} days overdue!`
    } else if (daysTilDue === 0) {
      text = 'Due today!';
    } else {
      text = `${daysTilDue} days until due.`
    };
    return text;
  };

  const handleUpdateTodo = (todo : iTodoWithSteps) => {
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    updateTodoAction(todo)
    .then((res : iResWithTodo) => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'UPDATE_TODO', payload: res.todo});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });
  };

  const handleDelete = async (todo : iTodoWithSteps) => {
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    await deleteTodoAction(todo.id)
    .then(res => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'REMOVE_TODO', payload: todo.id});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: 'err.status'});
    });
  };

  const handleReset = (todo : iTodoWithSteps) => {
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    resetTodoAction(todo.id)
    .then((res : iResWithTodo) => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'UPDATE_TODO', payload: res.todo})
      return;
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });
  };

  const handleEditTodo = (todo : iTodoWithSteps) => {
    todoToUpdateDispatch({type: 'TODO_TO_UPDATE', payload: todo});
    pageDispatch({type: 'CHANGE_PAGE', payload: 'editTodo'});
  };

  return (
    <div className='container none flex flex-row mb-3 bg-slate-100'>
      <div className='basis-1/6 flex flex-col items-center'>
        {!todo.done ? 
          <CheckIcon 
            className={`${styles.todoIcon} text-green-500`} 
            onClick={() => handleUpdateTodo({...todo, done: true})}
          />
          :
          <RefreshIcon 
            className={styles.todoIcon}
            onClick={() => handleUpdateTodo({...todo, done: false})}
          />
        }
        <MenuIcon 
          className={styles.todoIcon} 
          onClick={() => setShowSteps(!showSteps)}
        />
      </div>
      <div className='w-full flex flex-row flex-wrap'>
        <div className='w-full flex items-center justify-start pl-3'>
          <p className='text-lg font-bold'>{todo.todo}</p>
        </div>
        <div className='w-1/2 flex items-center justify-start text-left pl-1'>
          <p>{showDueDate()}</p>
        </div>
        <div className='w-1/2 flex items-center justify-end pr-1 text-right'>
          <p>{showCompleted()}</p>
        </div>
        {showSteps && <ShowSteps todoId={todo.id} steps={todo.steps} />}
      </div>
      <div className='basis-1/6 flex flex-col items-center'>
        <PencilIcon 
          className={styles.todoIcon} 
          onClick={() => handleEditTodo(todo)}
        />
        <RefreshIcon 
          className={styles.todoIcon} 
          onClick={() => handleReset(todo)}
        />
        <TrashIcon 
          className={`${styles.todoIcon} text-red-500`} 
          onClick={() => handleDelete(todo)}
        />
      </div>
    </div>
  );
};

export default Todo;