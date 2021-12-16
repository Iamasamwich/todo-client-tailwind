import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import styles from '../styles/styles';

const Status = () => {

  const {appStatus, appStatusDispatch} = useContext(Context)

  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    setStatusOpen(appStatus ? true : false);
  }, [appStatus]);

  const handleClose = () => {
    if (appStatus === 'loading') {
      return;
    } else {
      appStatusDispatch({type: 'STATUS', payload: null})
      setStatusOpen(false);
    };
  };

  const showError = () => {
    switch (appStatus) {
      case 401:
        return "Not Authorised";
      case 406:
        return "Invalid Inputs";
      case 404:
        return "Not Found";
      case 409:
        return "Duplication";
      default:
        return "There was a problem with your request";
    };
  };

  const ShowStatus = () => {
    switch (appStatus) {
      case 'loading':
        return <>
          Loading...
        </>
      default:
        return (
          <div className='flex flex-col bg-white p-3 w-3/5 items-center border-red-500 border rounded-lg'>
            <p className='text-3xl text-red-500 pt-3 pb-3'>Warning!</p>
            <p className='pt-3 pb-3'>{showError()}</p>
            <p className='text-blue-600 pb-3 animate-pulse'>Click to dismiss</p>
          </div>
        );
    };
  };

  return (
    <div>
      {appStatus && statusOpen &&  
        <div 
          className={styles.modal}
          onClick={handleClose}
        >
          <ShowStatus />
        </div>
      }
    </div>
  )


};

export default Status;