import React, { useContext } from 'react';
import styles from '../styles/styles';
import CheckIcon from '@heroicons/react/solid/CheckIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import PencilIcon from '@heroicons/react/solid/PencilIcon';
import RefreshIcon from '@heroicons/react/solid/RefreshIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';
import { deleteTodoAction, resetTodoAction, updateTodoAction } from '../actions/todos';
import Context from '../context/Context';

const Todo = ({todo} : {todo: iTodoWithSteps}) => {
  const {appStatusDispatch, todosDispatch} = useContext(Context);

  const handleUpdateTodo = (todo : iTodoWithSteps) => {
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    updateTodoAction(todo)
    .then((res : any) => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'UPDATE_TODO', payload: todo});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });
  };

  const handleDelete = async (todo : iTodoWithSteps) => {
    console.log('deleting todo id ', todo.id);
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
    .then((res : iTodoNewRes) => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'UPDATE_TODO', payload: res.todo})
      console.log(res);
      return;
      
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });

  };


  return (
    <div className='container none flex flex-row'>
      <div className='basis-1/6 bg-orange-200 flex flex-col items-center'>
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
        <MenuIcon className={styles.todoIcon} />
      </div>
      <div className='flex-grow bg-blue-200'>
        {todo.todo}
      </div>
      <div className='basis-1/6 bg-green-300 flex flex-col items-center'>
        <PencilIcon className={styles.todoIcon} />
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