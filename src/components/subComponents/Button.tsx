import React from 'react';

interface Props {
  handleClick: () => void;
  text: string;
  styling: string
}

const Button = ({handleClick, text, styling} : Props) => (
  <button
    className={styling}
    onClick={handleClick}
  >
    {text}
  </button>
);

export default Button;