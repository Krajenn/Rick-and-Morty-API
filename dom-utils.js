const createCharacterElement = (character) => {
    const characterElement = document.createElement("li");
    characterElement.innerText = character.name;

    return characterElement;
};

const createListElement = (allCharacters) => {
    const listElement = document.createElement("ul");

    allCharacters.forEach((character) => {
        console.log(character);
    });

    return listElement;
};

export const renderCharactersList = (allCharacters) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createListElement(allCharacters));
};
