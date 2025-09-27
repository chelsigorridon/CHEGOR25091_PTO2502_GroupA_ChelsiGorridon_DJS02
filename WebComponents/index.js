  import "../WebComponents/components/card-component.js";
  import "../WebComponents/components/modal-component.js";
  import { podcasts } from "./data.js";

 
 const podcastList = document.getElementById('podcast-list');
 
 podcasts.forEach(podcastinfo => {
     const card = document.createElement('card-component')
     card.setAttribute("title", podcastinfo.title);
     card.setAttribute("image", podcastinfo.image);
     card.setAttribute("genres", JSON.stringify(podcastinfo.genres));
     card.setAttribute("seasons", podcastinfo.seasons);
     card.setAttribute("updated", podcastinfo.updated);
     podcastList.appendChild(card)
 })


