

class MyCard extends HTMLElement {
    constructor () {
        super ();
    this.attachShadow ({ mode:"open"  });
    }
    

    static get observedAttributes(){
    return ["title", "description", "seasons", "image", "genres", "updated"]; 
    }

    attributesChangedCallback (title, oldValue, newValue) {
        if (oldValue !== newValue ){
            this[title] = newValue;
            this.render()
        }
    }
}

customElements.define("My-Card", MyCard)