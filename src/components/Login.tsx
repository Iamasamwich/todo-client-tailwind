import React, { useContext, useEffect, useState } from 'react';
import { loginAction } from '../actions/login';
import Context from '../context/Context';
import styles from '../styles/styles';
import Button from './subComponents/Button';
import ButtonGroup from './subComponents/ButtonGroup';

const Login = () => {
  const {loginDispatch, appStatusDispatch, pageDispatch} = useContext(Context);

  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pwordError, setPwordError] = useState(false);
  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const re = /^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/;
    setEmailError(!re.test(email));
    setPwordError(pword ? false : true);
  }, [email, pword]);

  useEffect(() => {
    setAnyError(emailError || pwordError ? true : false);
  }, [emailError, pwordError]);

  const handleSubmit = (e ?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    };

    if (anyError) return;
    appStatusDispatch({type: 'STATUS', payload: 'loading'});
    loginAction({email, pword})
    .then(() => {
      appStatusDispatch({type: 'STATUS', payload: null});
      loginDispatch({type: 'LOGIN', payload: true})
    })
    .catch((res : iRes) => {
      loginDispatch({type: 'LOGIN', payload: false});
      appStatusDispatch({type: 'STATUS', payload: res.status})
      return;
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className={`${styles.input} ${emailError && styles.inputError}`}
        />
        {emailError && 
          <p
            className={styles.inputAdvice}
          >
            Input a valid email address
          </p>
        }
        <label>Password</label>
        <input 
          type='password' 
          value={pword} 
          onChange={e => setPword(e.target.value)} 
          className={`${styles.input} ${pwordError && styles.inputError}`}  
        />
        {pwordError && 
          <p
            className={styles.inputAdvice}
          >
            Enter your password
          </p>
        }
        <ButtonGroup>
          {!anyError && 
            <Button 
              text='LOG IN'
              styling={`${styles.button} ${styles.success}`}
              handleClick={handleSubmit}
            />
          }
        </ButtonGroup>
      </form>
      <div className='container flex flex-row justify-center'>
        <p 
          className={styles.fakeLink}
          onClick={() => pageDispatch({type: 'CHANGE_PAGE', payload: 'createAccount'})}
        >Create Account</p>
      </div>
    </div>
  )
};

export default Login;