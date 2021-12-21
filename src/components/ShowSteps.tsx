import React, { useContext, useState } from 'react';
import { addStepAction } from '../actions/todos';
import Context from '../context/Context';
import styles from '../styles/styles';
import CheckIcon from '@heroicons/react/solid/CheckIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';


const ShowSteps = ({steps, todoId} : {steps: iStep[], todoId: number}) => {

  const {appStatusDispatch, todosDispatch} = useContext(Context);
  const [step, setStep] = useState('');

  const handleAddStep = (e : any) => {
    e.preventDefault();
    // if (!step) return;
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    addStepAction({step, todoId})
    .then(res => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'ADD_STEP', payload: res.step})
      console.log(res);
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    })
    setStep('');
  };

  return (
    <div className='w-full bg-yellow-200 flex flex-col'>
      {steps.map(step => {
        return (
          <div className='flex flex-row'>
            <div className='w-1/12 bg-orange-200 flex items-center justify-center'>
              <CheckIcon className='text-green-500 h-6 w-6' />
            </div>
            <div 
              className='w-10/12 overflow-hidden  '>
              {step.step}
            </div>
            <div className='w-1/12 bg-blue-100 flex items-center justify-center'>
              <TrashIcon className='text-red-500 h-6 w-6' />
            </div>            
          </div>
        )
      })}
      <form onSubmit={handleAddStep}>
        <input 
          className='w-4/6 pl-1'
          placeholder='Add Step'
          autoFocus
          value={step}
          onChange={e => setStep(e.target.value)}
        />
        <button
          type='submit'
          className={`${styles.success} w-2/6 border-2 border-slate-300 rounded-sm`}
        >Add Step</button>

      </form>

      
    </div>
  )
};

export default ShowSteps;