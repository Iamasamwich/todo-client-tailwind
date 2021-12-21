import React, { useContext, useEffect, useRef, useState } from 'react';
import Context from '../context/Context';

import HomeIcon from '@heroicons/react/solid/HomeIcon';
import MenuIcon from '@heroicons/react/solid/MenuIcon';

const Navbar = () => {
  const {login, page, loginDispatch, pageDispatch, todosDispatch, todosFetchedDispatch} = useContext(Context);

  const [showMenu, setShowMenu] = useState (false);;
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleClickOutside = (e : any) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      } else {
        setShowMenu(false);
      };
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
  }, [showMenu]);

  return (
    <div className='container fixed top-0 bg-sky-400 flex flex-row items-center gap-2 pr-2'>
      <p className='font-sans p-4 text-white flex-grow'>
        {login ? 'Welcome back!' : 'Log in or create an account'}
      </p>
      {page !== 'home' && <HomeIcon onClick={() => pageDispatch({type: 'CHANGE_PAGE', payload: 'home'})}className='h-6 w-6 text-white' />}
      {login && 
        <MenuIcon 
          onClick={() => {
            loginDispatch({type: "LOGIN", payload: false});
            todosDispatch({type: 'SET_TODOS', payload: []});
            todosFetchedDispatch({type: 'TODOS_FETCHED', payload: false});
            pageDispatch({type: 'CHANGE_PAGE', payload: 'home'});
          }} 
          className='h-6 w-6 text-white' 
        />}
    </div>
  );
};

export default Navbar;