import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

const Login = () => {
  const {state, dispatch} = useContext(Context);

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

  const handleSubmit = (e : React.SyntheticEvent) => {
    e.preventDefault();
    console.log({email, pword});
  };

  return (
    <div className='container bg-slate-200'>
      <form className='flex flex-col pr-3 pl-3' onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className={`${emailError && 'bg-red-100 border-red-500'}`}
        />
        <label>Password</label>
        <input type='password' value={pword} onChange={e => setPword(e.target.value)} />
        <button type='submit'>Submit</button>

      </form>

    </div>
  )
};

export default Login;