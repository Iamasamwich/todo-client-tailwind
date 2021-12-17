import React from 'react';
import styles from '../styles/styles';
import CheckIcon from '@heroicons/react/solid/CheckIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import PencilIcon from '@heroicons/react/solid/PencilIcon';
import RefreshIcon from '@heroicons/react/solid/RefreshIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';

const Todo = ({todo} : {todo: iTodoWithSteps}) => {
  console.log(todo);
  return (
    <div className='container none flex flex-row'>
      <div className='basis-1/6 bg-orange-200 flex flex-col items-center'>
        <CheckIcon className={`${styles.todoIcon} text-green-500`} />
        <MenuIcon className={styles.todoIcon} />
      </div>
      <div className='flex-grow bg-blue-200'>
        {todo.todo}
      </div>
      <div className='basis-1/6 bg-green-300 flex flex-col items-center'>
        <PencilIcon className={styles.todoIcon} />
        <RefreshIcon className={styles.todoIcon} />
        <TrashIcon className={`${styles.todoIcon} text-red-500`} />
      </div>
    </div>
  );
};

export default Todo;