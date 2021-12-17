import React from 'react';

const ButtonGroup = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='container flex flex-col pt-3 pb-2'>
      {children}
    </div>
  );
};

export default ButtonGroup;