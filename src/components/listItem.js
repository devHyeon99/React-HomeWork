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
}

customElements.define("list-item", ListItem);
