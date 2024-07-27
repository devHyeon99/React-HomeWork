import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Input } from '../src/components';

describe('Input Component', () => {
  test('renders with default props', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Input value='' onChange={handleChange} />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe('text');
    expect(inputElement.placeholder).toBe('');
  });

  test('renders with given type and placeholder', () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <Input
        type='email'
        placeholder='Enter email'
        value=''
        onChange={handleChange}
      />
    );
    const inputElement = getByPlaceholderText(
      'Enter email'
    ) as HTMLInputElement;

    expect(inputElement.type).toBe('email');
    expect(inputElement.placeholder).toBe('Enter email');
  });

  test('handles value changes', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Input value='' onChange={handleChange} />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('new value');
  });
});
