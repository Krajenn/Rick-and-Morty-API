const API_URL_ALL = "https://rickandmortyapi.com/api/character";

let characterPages = 0;
let allCharactes = [];

fetch(API_URL_ALL)
    .then((res) => res.json())
    .then((res) => {
        characterPages = res.info.pages;
        for (let i = 1; i <= characterPages; i++) {
            fetch(`${API_URL_ALL}?page=${i}`)
                .then((res) => res.json())
                .then((characters) => {
                    characters.results.forEach((e) => allCharactes.push(e));
                });
        }
    });
