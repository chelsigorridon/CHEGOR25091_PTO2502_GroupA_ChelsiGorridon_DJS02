

const template = document.createElement('template')

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


  </style>

  <div class="wrapper">
    <div class="check"> </div>
  </div>
  
  
  `;

  class cardComponent extends HTMLElement {
    inner=this.attachShadow({mode: "open"});

    constructor() {
    super();
    const {content} = template; 
    this.inner.appendChild(content.cloneNode(true))
   
    }

    static get observedAttributes(){
      return ["title", "image", "genres", "seasons", "updated" ]

    }

    attributeChangedCallback (name, oldValue, newValue) {
      if (oldValue !== newValue){
        this[name] = newValue;
        this.render();
      }
    }

  }

  customElements.define("card-component", cardComponent )