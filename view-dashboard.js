import { renderCharactersList } from "./dom-utils.js";

export const renderCharacters = () => {
    const API_URL_ALL = "https://rickandmortyapi.com/api/character";

    let allCharacters = [];
    let query = "";

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

    const filterDataAndRenderCharactersList = () => {
        const filteredCharacters = allCharacters.filter((character) => {
            return character.name.toLowerCase().includes(query);
        });

        renderCharactersList(filteredCharacters);
    };

    document.querySelector("#query").addEventListener("input", (e) => {
        query = e.target.value.toLowerCase().trim();
        filterDataAndRenderCharactersList(query);
    });

    fetchData(API_URL_ALL);
};
