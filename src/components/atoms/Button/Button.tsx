import React from 'react';
import './Button.css';

type ButtonProps = {
  layout?: 'stroke' | 'fill';
  size?: 'small' | 'medium' | 'large';
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({
  layout = 'stroke',
  size = 'large',
  text,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button ${layout} ${size}`}
      type='button'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
