

export const template = document.createElement('template')

template.innerHTML = `
<style>

*{
box-sizing: border-box;
}

.wrapper {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 1rem;
}


.check {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.check:hover {
  transform: scale(1.02);
}

img {
  width: 100%;
  border-radius: 6px;
}



  </style>

   <div class="wrapper">
    <div class="check">
    <img class="images" />
    <h2></h2>
    <div class="genres"></div>
    <div class="seasons"></div>
    <div class="updated"></div>
  </div> 
  </div>
  
  
  `;

  class cardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "description", "image", "genres", "seasons", "updated"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.querySelector("h2").textContent =
      this.getAttribute("title") || "";
    this.shadowRoot.querySelector("img").src =
      this.getAttribute("image") || "";
    this.shadowRoot.querySelector(".genres").textContent =
      "Genres: " + (this.getAttribute("genres") || "");
    this.shadowRoot.querySelector(".seasons").textContent =
      "Seasons: " + (this.getAttribute("seasons") || "");
    this.shadowRoot.querySelector(".updated").textContent =
      "Updated: " + (this.getAttribute("updated") || "");
  }
     

    }
    customElements.define("card-component", cardComponent )