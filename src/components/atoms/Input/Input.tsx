import React from 'react';
import './Input.css';

type InputProps = {
  id: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  showLabel?: boolean;
};

const Input = ({
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  label,
  showLabel = true,
}: InputProps) => {
  return (
    <div className='input-container'>
      {label && (
        <label htmlFor={id} className={showLabel ? 'input-label' : 'sr-only'}>
          {label}
        </label>
      )}
      <input
        id={id}
        className='input'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
