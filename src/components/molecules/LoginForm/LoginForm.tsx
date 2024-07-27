import React from 'react';
import './LoginForm.css';
import { useState } from 'react';
import { Button, Input } from '../../index.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Change 이벤트가 호출이되어 아래 함수가 실행 될때마다 useState 훅을 사용한 상태관리에서 set() 메서드를 이용해 현재 Input 상태를 업데이트 한다.
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (email.trim() === '' || password.trim() === '') {
      alert('이메일 혹은 비밀번호를 입력해주세요');
      return;
    }
    console.log(event.target);
    alert(`이메일: ${email} 비밀번호: ${password}`);
  };

  return (
    <form className='login-form' action='/'>
      <h2>로그인</h2>
      <div className='login-input-group'>
        <Input
          type='email'
          placeholder='이메일을 입력해주세요'
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className='login-button-group'>
        <Button layout='fill' text='로그인' onClick={handleSubmit} />
        <Button text='회원가입' />
      </div>
    </form>
  );
};

export default LoginForm;
