import React from 'react';
import './Input.css';

type InputProps = {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      className='input'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default Input;
