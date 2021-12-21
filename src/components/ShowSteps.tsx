import React, { useContext, useState } from 'react';
import { addStepAction, deleteStepAction, updateStepAction } from '../actions/todos';
import Context from '../context/Context';
import styles from '../styles/styles';
import CheckIcon from '@heroicons/react/solid/CheckIcon';
import TrashIcon from '@heroicons/react/solid/TrashIcon';
import RefreshIcon from '@heroicons/react/solid/RefreshIcon';

const ShowSteps = ({steps, todoId} : {steps: iStep[], todoId: number}) => {

  const {appStatusDispatch, todosDispatch} = useContext(Context);
  const [step, setStep] = useState('');

  const handleAddStep = (e : React.FormEvent) => {
    e.preventDefault();
    if (!step) return;
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    addStepAction({step, todoId})
    .then(res => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'ADD_STEP', payload: res.step})
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    })
    setStep('');
  };

  const handleDeleteStep = (stepId : number, todoId : number) => {
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    deleteStepAction(stepId, todoId)
    .then(() => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'REMOVE_STEP', payload: {todoId, stepId}});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });
  };

  const handleUpdateStep = (step: iStep) => {
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    updateStepAction(step)
    .then(res => {
      appStatusDispatch({type: 'STATUS', payload: null});
      todosDispatch({type: 'UPDATE_STEP', payload: res});
    })
    .catch(err => {
      appStatusDispatch({type: 'STATUS', payload: err.status});
    });
  };

  return (
    <div className='w-60 flex flex-col'>
      {steps.map(step => {
        return (
          <div className='flex flex-row' key={step.id}>
            <div className='w-1/12 flex items-center justify-center'>
              {!step.done ? 
                <CheckIcon 
                  className='text-green-500 h-6 w-6' 
                  onClick={() => handleUpdateStep({...step, done: true})}
                />
                :
                <RefreshIcon
                  className='h-6 w-6'
                  onClick={() => handleUpdateStep({...step, done: false})}
                />
              }
            </div>
            <div 
              className='w-10/12 overflow-hidden  '>
              {step.step}
            </div>
            <div className='w-1/12 bg-blue-100 flex items-center justify-center'>
              <TrashIcon 
                className='text-red-500 h-6 w-6' 
                onClick={() => handleDeleteStep(step.id , todoId)}
              />
            </div>            
          </div>
        )
      })}
      <form onSubmit={handleAddStep}>
        <input 
          className='w-4/6 pl-1'
          placeholder='Enter Step'
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