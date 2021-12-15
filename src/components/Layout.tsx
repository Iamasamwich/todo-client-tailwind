import React, { useContext } from 'react';
import Context from '../context/Context';

const Layout = ({children} : {children: React.ReactNode}) => {

  const {state, dispatch } = useContext(Context);
  const {login, page} = state;
  // const {logout, changePage} = dispatch;

  return <div className='container mx-auto' style={{backgroundColor : 'grey'}}>Layout</div>

};

export default Layout;