import { renderCharactersList } from "./dom-utils.js";
import { renderFilterOptions } from "./dom-utils.js";

export const renderCharacters = () => {
    const API_URL_ALL = "https://rickandmortyapi.com/api/character";

    let allCharacters = [];
    let query = "";
    let species = "";
    let status = "";
    let gender = "";

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
                    renderFilterOptions(
                        groupBy("species", allCharacters),
                        "#species"
                    );
                    renderFilterOptions(
                        groupBy("status", allCharacters),
                        "#status"
                    );
                    renderFilterOptions(
                        groupBy("gender", allCharacters),
                        "#gender"
                    );
                }
            });
    };

    const groupBy = (key, arr) =>
        arr.reduce((cache, character) => {
            const property = character[key];
            if (property in cache) {
                return {
                    ...cache,
                    [property]: cache[property].concat(character),
                };
            }
            return { ...cache, [property]: [character] };
        }, {});

    const filterDataAndRenderCharactersList = () => {
        const filteredCharacters = allCharacters.filter((character) => {
            return (
                character.name.toLowerCase().includes(query) &&
                (!species || character.species === species) &&
                (!status || character.status === status) &&
                (!gender || character.gender === gender)
            );
        });

        renderCharactersList(filteredCharacters);
    };

    document.querySelector("#query").addEventListener("input", (e) => {
        query = e.target.value.toLowerCase().trim();
        filterDataAndRenderCharactersList(query);
    });

    document.querySelector("#species").addEventListener("change", (e) => {
        species = e.target.value;
        filterDataAndRenderCharactersList(species);
    });
    document.querySelector("#status").addEventListener("change", (e) => {
        status = e.target.value;
        filterDataAndRenderCharactersList(status);
    });
    document.querySelector("#gender").addEventListener("change", (e) => {
        gender = e.target.value;
        filterDataAndRenderCharactersList(gender);
    });

    fetchData(API_URL_ALL);
};
