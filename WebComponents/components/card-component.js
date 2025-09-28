
 import { genres } from "../data.js"
 

export const template = document.createElement('template')

template.innerHTML = `
<style>

*{
box-sizing: border-box;
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

.images {
  width: 100%;
  border-radius: 6px;
}

 h2{
  margin: 0.5rem 0;
}

.card p {
  margin: 0px;
  font-size: 0.8rem;
  color: var(--grey-text);
}

.seasons {
  margin: 0.5rem 0;
}

.genres {
  margin: 0.5rem 0;
}

.seasons {
  background: #eee;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.8rem;
}


 .genres {
  background: #eee;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.8rem;
}


.updated {
  font-size: 0.8rem;
  color: var(--grey-text);
}



  </style>

   <div class="check">
  <img class="images" />
  <h2></h2>
  <div class="genres"></div>
  <div class="seasons"></div>
  <div class="updated"></div>
  </div>

  
  `;

 

  class cardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "image", "genres", "seasons", "updated"];
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
  this.shadowRoot.querySelector(".seasons").textContent =
    "Seasons: " + (this.getAttribute("seasons") || "");

   const updatedAttr = this.getAttribute("updated");

if (updatedAttr) {
  const date = new Date(updatedAttr);

  const formatted = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  this.shadowRoot.querySelector(".updated").textContent = "Updated: " + formatted;
} else {
  this.shadowRoot.querySelector(".updated").textContent = "Updated: N/A";
}


  const genresDiv = this.shadowRoot.querySelector(".genres");
  genresDiv.innerHTML = "";
  const genresAttr = this.getAttribute("genres");
  if (genresAttr) {
    let ids;
    try {
      ids = JSON.parse(genresAttr);
    } catch {
      ids = genresAttr.split(",");
    }

  ids.forEach(id => {
  const span = document.createElement("span");

  const genreObj = genres.find(g => g.id === Number(id));

  if (genreObj) {
    span.textContent = genreObj.title;  // <-- use title here
  } else {
    span.textContent = id; 
  }
  genresDiv.appendChild(span);
});


  const check = this.shadowRoot.querySelector(".check");
  if (check && !check.dataset.listenerAdded) {
    check.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("card-selected", {
          detail: {
            title: this.getAttribute("title"),
            image: this.getAttribute("image"),
            genres: this.getAttribute("genres"),
            seasons: this.getAttribute("seasons"),
            updated: this.getAttribute("updated"),
          },
          bubbles: true,
          composed: true,
        })
      );
    });
    check.dataset.listenerAdded = "true";
  }
}
   
  }
}
   customElements.define("card-component", cardComponent )