import React, { useContext, useEffect, useState } from 'react';
import { createAccountAction } from '../actions/user';
import Context from '../context/Context';
import styles from '../styles/styles';
import Button from './subComponents/Button';
import ButtonGroup from './subComponents/ButtonGroup';

const CreateAccount = () => {

  const {loginDispatch, pageDispatch, appStatusDispatch} = useContext(Context)

  const [name, setName] = useState ('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pword, setPword] = useState('');
  const [pwordError, setPwordError] = useState(false);
  const [confPword, setConfPword] = useState('');
  const [confPwordError, setConfPwordError] = useState(false);
  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    setNameError(!name ? true : false);

    const re = /^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/;
    setEmailError(!re.test(email));

    setPwordError(!pword ? true : false);

    setConfPwordError(pword === confPword ? false : true); 
  }, [name, email, pword, confPword]);

  useEffect(() => {
    if (nameError || emailError || pwordError || confPwordError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [nameError, emailError, pwordError, confPwordError])

  const handleCancel = () => {
    pageDispatch({type: 'CHANGE_PAGE', payload: 'home'});
  };

  const handleSubmit = (e ?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    };
    createAccountAction({email, name, pword})
    .then(() => {
      loginDispatch({type: 'LOGIN', payload: true});
      pageDispatch({type: 'CHANGE_PAGE', payload: 'home'});
    })
    .catch((res : iRes) => {
      loginDispatch({type: 'LOGIN', payload: false});
      appStatusDispatch({type: 'STATUS', payload: res.status});
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          className={`${styles.input} ${nameError && styles.inputError}`}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {nameError && 
          <p className={styles.inputAdvice}>Enter a name</p>
        }
        <label>Email</label>
        <input 
          className={`${styles.input} ${emailError && styles.inputError}`}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailError && 
          <p className={styles.inputAdvice}>Input a valid email</p>
        }
        <label>Password</label>
        <input 
          className={`${styles.input} ${pwordError && styles.inputError}`}
          value={pword}
          onChange={e => setPword(e.target.value)}
        />
        {pwordError && 
          <p className={styles.inputAdvice}>Enter a password</p>
        }
        {!pwordError && 
          <>
            <label>Confirm Password</label>
            <input 
              className={`${styles.input} ${confPwordError && styles.inputError}`}
              value={confPword}
              onChange={e => setConfPword(e.target.value)}
            />
            {confPwordError && 
              <p className={styles.inputAdvice}>Re-enter the password</p>
            }
          </>
        }
        <ButtonGroup>
          {!anyError && 
            <Button styling={`${styles.button} ${styles.success}`} text='Submit' handleClick={handleSubmit} />
          }
          <Button styling={`${styles.button} ${styles.warning}`} text='Cancel' handleClick={handleCancel} />
        </ButtonGroup>
      </form>  
    
    </div>
  )
};

export default CreateAccount;