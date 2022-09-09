import { renderCharactersList } from "./dom-utils.js";

export const renderCharacters = () => {
    const API_URL_ALL = "https://rickandmortyapi.com/api/character";

    let allCharacters = [];

    const fetchData = (URL) => {
        fetch(URL)
            .then((res) => res.json())
            .then((res) => {
                res.results.forEach((e) => {
                    e = {
                        id: e.id,
                        name: e.name,
                        species: e.species,
                        status: e.status,
                        gender: e.gender,
                        image: e.image,
                    };
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
