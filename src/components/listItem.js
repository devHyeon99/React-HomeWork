class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: block;
          outline: none;
          border: 0.125rem solid #141415;
          cursor: move;
        }
        :host(:focus-visible) {
          border: 0.125rem dashed #fff;
        }
        :host(.dragging){
          opacity: 0.5;
          border: 0.125rem dashed #fff;
        }
        .list-item {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 1.25rem;
          min-width: 13.75rem;
          max-width: 40rem;
          padding: 0.75rem;
          background-color: #141415;
        }
        .list-item__img {
          width: 4rem;
          height: 4rem;
          border-radius: 0.375rem;
          border: 3px solid #F0F0F0;
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
        }
        .list-item__text {
          flex: 1 0 0;
          color: #fff;
          font-size: 1.25rem;
          line-height: 120%;
        }
      </style>
      <li class="list-item">
        <img class="list-item__img" src="" alt="" />
        <p class="list-item__text"></p>
      </li>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.img = this.shadowRoot.querySelector(".list-item__img");
    this.text = this.shadowRoot.querySelector(".list-item__text");
    this.item = this.shadowRoot.querySelector(".list-item");
    this.setupListeners();
  }

  static get observedAttributes() {
    return ["src", "alt", "text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.img.src = newValue;
        break;
      case "alt":
        this.img.alt = newValue;
        break;
      case "text":
        this.text.textContent = newValue;
        break;
    }
  }

  setupListeners() {
    this.addEventListener("dragstart", this.handleDragStart.bind(this));
    this.addEventListener("dragover", this.handleDragOver.bind(this));
    this.addEventListener("dragend", this.handleDragEnd.bind(this));
    this.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

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
      console.log(next);
      this.parentNode.insertBefore(
        draggingElement,
        next ? this.nextSibling : this
      );
    }
  }

  handleDragEnd(e) {
    this.classList.remove("dragging");
  }

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
}

customElements.define("list-item", ListItem);
