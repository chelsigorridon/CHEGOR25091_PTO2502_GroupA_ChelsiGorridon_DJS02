import { podcasts } from "../data";

const cardList = document.getElementById ("podcastGrid")

podcasts.forEach (podcast => {
    const $card = document.createElement ("podcast-card")
    $card.setAttribute ("title", podcast.title);
    $card.setAttribute ("description", podcast.description);
    $card.setAttribute ("seasons", podcast.seasons);
    $card.setAttribute ("image", podcast.image);
    $card.setAttribute ("genres", podcast.genres);
    $card.setAttribute ("updated", podcast.updated);
    cardList.appendChild($card)
});

document.body.addEventListener("card-selected", (event) => {

});