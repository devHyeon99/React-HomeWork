import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Input } from '../src/components';

test('Input 컴포넌트가 레이블과 입력 요소를 올바르게 렌더링하는지 확인합니다.', () => {
  const onChangeMock = vi.fn();
  render(
    <Input
      id='test-input'
      label='Test Label'
      value=''
      onChange={onChangeMock}
    />
  );

  const labelElement = screen.getByText('Test Label');
  const inputElement = screen.getByRole('textbox');

  expect(labelElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue('');
});

test('onChange 핸들러가 호출되는지, 그리고 입력 요소의 값이 업데이트되는지를 확인합니다.', () => {
  const onChangeMock = vi.fn((event) => {
    inputElement.value = event.target.value; // 값 변경
  });

  const { rerender } = render(
    <Input
      id='test-input'
      label='Test Label'
      value=''
      onChange={onChangeMock}
    />
  );

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: 'new value' } });

  rerender(
    <Input
      id='test-input'
      label='Test Label'
      value='new value' // 변경된 값을 다시 렌더링
      onChange={onChangeMock}
    />
  );

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(inputElement.value).toBe('new value');
});

test('showLabel 속성이 false일 때 레이블이 시각적으로 숨겨지면서도 DOM에는 존재하는지 확인합니다.', () => {
  const onChangeMock = vi.fn();
  render(
    <Input
      id='test-input'
      label='Test Label'
      value=''
      onChange={onChangeMock}
      showLabel={false}
    />
  );

  const labelElement = screen.getByText('Test Label');
  const inputElement = screen.getByRole('textbox');

  expect(labelElement).toBeInTheDocument(); // 레이블이 여전히 DOM에 존재하는지 확인
  expect(labelElement).toHaveClass('sr-only'); // 레이블이 시각적으로 숨겨져 있는지 확인
  expect(inputElement).toBeInTheDocument();
});

test('Input 컴포넌트가 type 속성에 전달된 값이 올바르게 적용되는지를 확인합니다.', () => {
  const onChangeMock = vi.fn();
  render(
    <Input
      id='test-input'
      label='Test Label'
      value=''
      onChange={onChangeMock}
      type='email'
    />
  );

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;
  expect(inputElement.type).toBe('email');
});
