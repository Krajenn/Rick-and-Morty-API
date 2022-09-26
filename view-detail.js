import { renderCharacterDetail } from "./dom-utils.js";

export const renderDetail = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const characterId = searchParams.get("id");

    const API_URL_CHARACTER = `https://rickandmortyapi.com/api/character/${characterId}`;

    fetch(API_URL_CHARACTER)
        .then((res) => res.json())
        .then((characterRaw) => {
            renderCharacterDetail(characterRaw);
            console.log(characterRaw);
        });
};
