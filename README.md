## 아토믹 컴포넌트 구현

##### Figma 컴포넌트 → React 컴포넌트 구현과제

- 바닐라 프로젝트 결과물에서 구현할 컴포넌트를 1개 선정 및 Figma를 사용해 선정한 컴포넌트 정의 및 변형을 설계합니다.
- 디자인된 컴포넌트를 React 컴포넌트로 구현합니다.

##### Figma를 사용하여 선정한 컴포넌트

![alt text](/public/image.png)

- Button 및 Input 컴포넌트 설계를 하였습니다.

![alt text](/public/image-1.png)

- Button에 대한 프로퍼티 정의 Layout(Fill, Stroke), size(large, small)

![alt text](/public/image-2.png)

- Input에 대한 프로퍼티 정의 Type(Default, Focus), PlaceHolder

##### 프로젝트 폴더 구성

![alt text](/public/image-3.png)

- vite 도구를 활용하여 리액트 CRA 및 TypeScript 사용
- 아토믹 디자인을 기반으로한 컴포넌트 안 atmos, molecules 폴더 분리
- atmos(가장 작은 단위) - Button, Input
- molecules(Atoms의 조합) - LoginForm

##### 버튼 컴포넌트

![alt text](/public/image-4.png)

- line 3 ~ 8: 버튼 Props에 대한 타입 정의
- line 10 ~ 25: 함수형 컴포넌트 Button 생성 layout, size는 Default 값으로 'stroke', 'large'를 할당시킴. onClick은 null일 수도 있다는 타입 정의. text는 필수 값으로 타입 정의하여 버튼 컴포넌트의 재사용성을 높임

##### 인풋 컴포넌트

![alt text](/public/image-5.png)

- line 3 ~ 8: 인풋 Props에 대한 타입 정의
- line 10 ~ 25: type, placeholder null일 수 있고, 기본값들 정의. value, onChange는 필수 값으로 정의 하여 인풋 컴포넌트의 재사용성을 높임.

##### 로그인폼 컴포넌트

![alt text](/public/image-6.png)

- line 6 ~ 7: 인풋 상태관리를 위한 useState 훅을 사용
- line 10 ~ 27: 이벤트 호출에 대한 핸들러 정의
- line 29 ~ 52: Button, Input 컴포넌트를 불러와 사용 및 설계된 디자인에 맞게 Props를 전달

##### 결과

![alt text](/public/image-7.png)

- 각 컴포넌트들을 조합하여 App.tsx에 렌더링한 결과입니다.

##### 느낀점

- 컴포넌트 분리를 함으로서 코드 가독성 및 유지 보수가 쉬워짐을 느꼈고 재사용성도 높아져 불필요한 코드 반복이 이루어지지 않는다는 것이 좋다는 것을 느꼈습니다.
- 또한, 추후 각 컴포넌트에 대한 내부 로직들도 길어진다면 분리를 해야 한다는것을 알게 되었습니다. 관심사 분리가 중요.
