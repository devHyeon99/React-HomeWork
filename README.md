## 컴포넌트 속성 검사 및 테스트

### Input 컴포넌트

```jsx
import React from 'react';
import './Input.css';

type InputProps = {
  id: string,
  type?: 'text' | 'email' | 'password',
  placeholder?: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
  showLabel?: boolean,
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
```

- props중 `type` `placeholder` `showLabel` 속성은 옵셔널로 처리하여 기본값을 설정 해두었습니다.
- props중 `id` `value` `onChange` `label` 속성은 필수로 있어야 하는 속성으로 생각하였습니다.
- 기존 `input`요소만 있었던점을 보완하여 `label`요소도 추가 하였고 `showLabel` 속성을 추가하여 디자인 설계에 맞출 수 있도록 하였습니다.

### Button 컴포넌트

```jsx
import React from 'react';
import './Button.css';

type ButtonProps = {
  layout?: 'stroke' | 'fill',
  type: 'button' | 'submit',
  size?: 'small' | 'medium' | 'large',
  text: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
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
```

- props중 `layout` `size` 속성은 옵셔널로 처리하여 기본값을 설정해두도록 하였습니다.
- props중 `type` `text` `onClick` 속성은 필수로 있어야 하는 속성으로 생각하였습니다.

<hr />
❗️ 이미 저번 과제에서 타입스크립트를 활용하여 컴포넌트에 대한 속성 검사는 과제 실습을 하였어서 지난 과제에 대한 피드백에 대한 리팩토링을 진행 하였습니다.

1. 주언어 설정을 한국어로 설정하였습니다.
2. `<noscript>` 요소를 추가하여 최소한의 접근성을 준수하였습니다.
3. 로그인은 버튼 태그로 회원가입은 링크 태그로 적절한 요소 사용을 준수하였습니다.
4. 버튼 컴포넌트 속성에 type을 추가하여 `button` 또는 `submit` 타입을 props로 받도록 하였습니다.
5. 인풋 컴포넌트에 유요한 레이블이 존재하지 않았던점을 보완하였습니다.

### 마무리

- 컴포넌트 테스트는 저번과 같이 Input 테스트만 시행하였습니다. 하지만 아직 테스트의 명확한 기준과 `vitest` 라이브러리 활용을 잘 못하고 있는거 같아 추가적인 공부가 더 필요할거 같습니다. 테스트 코드를 작성하는것은 처음이고 아직 감이 잘 잡히지 않는것 같습니다.
