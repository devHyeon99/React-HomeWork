import React from 'react';
import './Button.css';

type ButtonProps = {
  layout?: 'stroke' | 'fill';
  type: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({
  layout = 'stroke',
  type,
  size = 'large',
  text,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button ${layout} ${size}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
