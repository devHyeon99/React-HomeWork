## Design-to-develop_handoff

### html 구조

```jsx
<ul class="list">
  <list-item
    src="/public/architectures/architecture-1.jpg"
    alt="History of Architecture"
    text="History of Architecture"
    tabindex="0"
    draggable="true"
    aria-label="아이템을 위 아래 방향키로 이동 시킬 수 있습니다."
  ></list-item>
  <list-item
    src="/public/architectures/architecture-2.jpg"
    alt="Building design"
    text="Building design"
    tabindex="0"
    draggable="true"
    aria-label="아이템을 위 아래 방향키로 이동 시킬 수 있습니다."
  ></list-item>
  <list-item
    src="/public/architectures/architecture-3.jpg"
    alt="Graphics"
    text="Graphics"
    tabindex="0"
    draggable="true"
    aria-label="아이템을 위 아래 방향키로 이동 시킬 수 있습니다."
  ></list-item>
  <list-item
    src="/public/architectures/architecture-4.jpg"
    alt="Climatology"
    text="Climatology"
    tabindex="0"
    draggable="true"
    aria-label="아이템을 위 아래 방향키로 이동 시킬 수 있습니다."
  ></list-item>
</ul>

// list-item 템플릿
<li class="list-item">
  <img class="list-item__img" src="" alt="" />
  <p class="list-item__text"></p>
</li>
```

- 리스트와 리스트 아이템을 ul, li 태그를 사용하여 구조를 설계 하였습니다.
- 커스텀 엘리먼트에 tabindex 속성을 주어 탭으로 포커스가 되도록 하였습니다.
- 커스텀 엘리먼트에 draggable 속성을 주어 드래그가 가능하게 하였습니다.
- 커스텀 엘리먼트에 aria-label 속성을 통해 아이템을 위 아래 방향키로 이동 시킬 수 있다는 것을 알 수 있도록 하였습니다.

### index.js

```js
import "/src/components/listItem.js";

> listItem 컴포넌트 모듈을 불러옵니다.
```

### listItem.js

```jsx
render() {
  // 템플릿 생략
  this.shadowRoot.appendChild(template.content.cloneNode(true));
  this.img = this.shadowRoot.querySelector(".list-item__img");
  this.text = this.shadowRoot.querySelector(".list-item__text");
  this.item = this.shadowRoot.querySelector(".list-item");
  this.setupListeners();
}
```

- 템플릿 렌더링 및 선택자를 선언하고 이벤트 설정 함수 호출

```jsx
setupListeners() {
  this.addEventListener("dragstart", this.handleDragStart.bind(this));
  this.addEventListener("dragover", this.handleDragOver.bind(this));
  this.addEventListener("dragend", this.handleDragEnd.bind(this));
  this.addEventListener("keydown", this.handleKeyDown.bind(this));
}
```

- 이벤트 리스너 지정 및 핸들러 연결
- 드래그 정렬을 위해 dragstart, dragover, dragend 이벤트 사용
- 키보드로 위치 이동을 위해 keydown 이벤트 사용

```jsx
handleDragStart(e) {
    this.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  }

handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  const draggingElement = this.parentNode.querySelector(".dragging");
  if (draggingElement !== this) {
    const rect = this.getBoundingClientRect();
    const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
    this.parentNode.insertBefore(
      draggingElement,
      next ? this.nextSibling : this
    );
  }
}

handleDragEnd(e) {
  this.classList.remove("dragging");
}
```

- handleDragStart 리스트 아이템을 드래그 시작할때 이벤트발생시 호출되는 함수 dragging 클래스를 추가하여 드래그를 한 아이템에 outline을 스타일링
- handleDragOver 리스트 아이템을 드래그 하면서 마우스가 대상 객체 위에 자리 잡고있을때 호출되는 함수 부모 노드에서 현재 드래그중인 요소를 찾고 드래그 중인 요소와 현재 요소가 다를 경우 현재 요소의 위치에 대한 정보를 가져온 뒤 마우스 위치에 따라 삽입 위치를 할당 해놓고 드래그 중인 요소를 next가 true일시에 이동 시키려는 영역으로 드래그 위치가 들어 왔을시에 위치로 이동 시킵니다.
- handleDragEnd 리스트 아이템을 드래그하고 마우스 버튼을 놓는 순간 호출되는 함수 dragging 클래스를 제거하여 outline 스타일링 제거

```jsx
handleKeyDown(e) {
  const itemArray = Array.from(this.parentNode.children);
  const currentIndex = itemArray.indexOf(this);
  let newIndex;

  if (e.code === "ArrowUp" && currentIndex > 0) {
    newIndex = currentIndex - 1;
  } else if (e.code === "ArrowDown" && currentIndex < itemArray.length - 1) {
    newIndex = currentIndex + 1;
  }

  if (newIndex !== undefined) {
    if (newIndex < currentIndex) {
      this.parentNode.insertBefore(this, itemArray[newIndex]);
    } else {
      this.parentNode.insertBefore(this, itemArray[newIndex].nextSibling);
    }

    this.focus();
  }
}
```

- 키보드로 리스트 아이템을 이동할때 호출되는 함수, 조건문으로 위, 아래 방향키 조건 처리
- 위 방향키를 누른 경우 현재 인덱스가 0보다 클경우 현재 인덱스에서 1을 뺀뒤 인덱스를 저장 해놓고, 현재 인덱스가 새로운 인덱스 보다 클시에 insertBefore메서드를 통해 새로운 인덱스 보다 앞에 노드 삽입.
- 아래 방향키도 비슷한 원리
- insertBefore 메서드는 주어진 노드가 문서에 이미 존재하는 경우, insertBefore()현재 위치에서 새 위치로 이동합니다. (즉, 지정된 새 부모에 추가하기 전에 기존 부모에서 자동으로 제거됩니다.)
