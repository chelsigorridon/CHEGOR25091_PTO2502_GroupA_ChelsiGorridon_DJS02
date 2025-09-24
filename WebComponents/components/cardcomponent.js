import {podcasts} from "./data.js"; 

class myCard extends HTMLElement {
    constructor () {
        super ();
    this.attachShadow ({ mode:open  })    }
}

connectedCallback () {
    this.render ()

}