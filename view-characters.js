import { renderCharactersList } from "./dom-utils.js";

export const renderCharacters = () => {
    const API_URL_ALL = "https://rickandmortyapi.com/api/character";

    let allCharacters = [];

    const fetchData = (URL) => {
        fetch(URL)
            .then((res) => res.json())
            .then((res) => {
                res.results.forEach((e) => {
                    allCharacters.push(e);
                });
                if (res.info && res.info.next) {
                    fetchData(res.info.next);
                } else {
                    renderCharactersList(allCharacters);
                }
            });
    };

    fetchData(API_URL_ALL);
};
