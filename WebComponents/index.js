  import "../WebComponents/components/card-component.js";
  import "../WebComponents/components/modal-component.js";
  import { podcasts } from "./data.js";

 /**
 * Dynamically generates and appends podcast cards to the DOM.
 * Each card is a <card-component> with attributes populated from the `podcasts` array.
 *
 * Attributes set on each card:
 *  - title: Podcast title
 *  - image: URL to the podcast image
 *  - genres: JSON stringified array of genre IDs
 *  - seasons: Number of seasons
 *  - updated: Last updated timestamp
 *
 * Dispatches a 'card-selected' event when a card is clicked (handled inside card-component).
 */

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


