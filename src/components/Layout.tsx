import React from 'react';
import Navbar from './Navbar';
import icon from '../assets/icon.png';

const Layout = ({children} : {children: React.ReactNode}) => {

  return (
    <div className='container'>
      <Navbar />
      <div className='container flex flex-col items-center mt-12'>
        <img className='mx-auto h-32 pt-4' src={icon} alt='Logo' />
        <h1 className='text-5xl pb-3'>Things To Do</h1>
        <hr className='w-4/5' />
      </div>
      {children}
    </div>
  )

};

export default Layout;