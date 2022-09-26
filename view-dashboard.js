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
                (character.name.toLowerCase().includes(query) ||
                    character.name
                        .toLowerCase()
                        .includes(query.split(" ").reverse().join(" ")) ||
                    character.name
                        .replace(/\s/g, "")
                        .toLowerCase()
                        .includes(query)) &&
                (!species || character.species === species) &&
                (!status || character.status === status) &&
                (!gender || character.gender === gender)
            );
        });
        renderCharactersList(filteredCharacters);
    };

    document.querySelector("#query").addEventListener("input", (e) => {
        query = e.target.value.toLowerCase().trim();
        filterDataAndRenderCharactersList();
    });

    document.querySelector("#species").addEventListener("change", (e) => {
        species = e.target.value;
        filterDataAndRenderCharactersList();
    });
    document.querySelector("#status").addEventListener("change", (e) => {
        status = e.target.value;
        filterDataAndRenderCharactersList();
    });
    document.querySelector("#gender").addEventListener("change", (e) => {
        gender = e.target.value;
        filterDataAndRenderCharactersList();
    });

    const mobileMenuHandler = () => {
        const filtersDivjHeigth =
            (document.querySelector(".filters").offsetHeight / 4) * 3;
        const mainElement = document.querySelector("main");

        if (window.innerWidth <= 576) {
            mainElement.style.transform = `translateY(calc(-${filtersDivjHeigth}px - 2rem))`;
        } else {
            mainElement.style.transform = `translateY(0)`;
        }
    };

    document.querySelector(".filter-icon").addEventListener("click", () => {
        const filtersMobile = document.querySelectorAll(".filter-mobile");
        const filtersDivjHeigth =
            (document.querySelector(".filters").offsetHeight / 4) * 3;
        const mainContent = document.querySelector("main");
        mainContent.style.transition = ".3s ease-in-out";

        filtersMobile.forEach((filter) => {
            filter.classList.toggle("active");
            if (filter.classList.contains("active")) {
                mainContent.style.transform = `translateY(0)`;
            } else {
                mainContent.style.transform = `translateY(calc(-${filtersDivjHeigth}px - 2rem))`;
            }
        });
    });

    window.addEventListener("resize", () => {
        mobileMenuHandler();
    });

    mobileMenuHandler();

    fetchData(API_URL_ALL);
};
