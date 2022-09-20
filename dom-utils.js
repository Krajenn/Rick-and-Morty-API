import { renderOrigin } from "./buttons-detail.js";

const createInfoElement = (labelName, value) => {
    const infoElement = document.createElement("div");

    const labelElement = document.createElement("strong");
    labelElement.innerText = `${labelName}: `;

    const valueElement = document.createElement("span");
    valueElement.innerText = value;

    infoElement.appendChild(labelElement);
    infoElement.appendChild(valueElement);

    return infoElement;
};

const createImageElement = (character) => {
    const imgContainerElement = document.createElement("div");
    imgContainerElement.classList.add("img-container");
    const imgElement = document.createElement("img");

    imgElement.src = character.image;
    imgElement.alt = `${character.name} image`;
    imgElement.loading = "lazy";

    imgContainerElement.appendChild(imgElement);

    return imgContainerElement;
};

const createCharacterElement = (character) => {
    const characterElement = document.createElement("li");

    const anchorElement = document.createElement("a");
    anchorElement.href = `?id=${character.id}`;

    anchorElement.appendChild(createImageElement(character));

    const infoContainerElement = document.createElement("div");
    infoContainerElement.classList.add("info-container");

    const nameElement = document.createElement("strong");
    nameElement.classList.add("character-name");
    nameElement.innerText = character.name;

    infoContainerElement.appendChild(nameElement);
    anchorElement.appendChild(infoContainerElement);

    infoContainerElement.appendChild(createInfoElement("Name", character.name));
    infoContainerElement.appendChild(
        createInfoElement("Species", character.species)
    );
    infoContainerElement.appendChild(
        createInfoElement("Status", character.status)
    );
    infoContainerElement.appendChild(
        createInfoElement("Gender", character.gender)
    );

    characterElement.appendChild(anchorElement);
    return characterElement;
};

const createListElement = (allCharacters) => {
    const listElement = document.createElement("ul");

    allCharacters.forEach((character) => {
        listElement.appendChild(createCharacterElement(character));
    });

    return listElement;
};

export const renderCharactersList = (allCharacters) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createListElement(allCharacters));

    document.querySelector(".loader-wrapper").style.display = "none";
};

// ************* DETAIL *****************

const createDetailElement = (character) => {
    const characterWrapper = document.createElement("div");
    characterWrapper.classList.add("detail-container");

    characterWrapper.appendChild(createImageElement(character));

    const nameWrapper = document.createElement("div");
    nameWrapper.classList.add("basic-info-container");
    const nameElement = document.createElement("strong");
    nameElement.classList.add("character-name");
    nameElement.innerText = character.name;

    nameWrapper.appendChild(nameElement);

    nameWrapper.appendChild(createInfoElement("Name", character.name));
    nameWrapper.appendChild(createInfoElement("Species", character.species));
    nameWrapper.appendChild(createInfoElement("Status", character.status));
    nameWrapper.appendChild(createInfoElement("Gender", character.gender));

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const originDiv = document.createElement("div");
    originDiv.id = "originDiv";
    originDiv.innerText = "Origin";
    const locationDiv = document.createElement("div");
    locationDiv.id = "locationDiv";
    locationDiv.innerText = "Location";
    const chaptersDiv = document.createElement("div");
    chaptersDiv.id = "chaptersDiv";
    chaptersDiv.innerText = "Chapters";

    buttonsContainer.appendChild(originDiv);
    originDiv.addEventListener("click", () => {
        console.log(character);
        renderOrigin(character.origin);
    });

    buttonsContainer.appendChild(locationDiv);

    
    buttonsContainer.appendChild(chaptersDiv);

    characterWrapper.appendChild(nameWrapper);
    characterWrapper.appendChild(buttonsContainer);

    const buttonContentContainer = document.createElement("div");
    buttonContentContainer.classList.add("button-content-container");

    characterWrapper.appendChild(buttonContentContainer);

    return characterWrapper;
};

export const renderCharacterDetail = (character) => {
    console.log(character);
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createDetailElement(character));

    document.querySelector(".filters").style.display = "none";

    document.querySelector(".loader-wrapper").style.display = "none";
};

// ************ CREATE FILTER OPTIONS **********

const createOptionElement = (option) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", option);
    optionElement.innerHTML = option;

    return optionElement;
};

export const renderFilterOptions = (optionsRaw, selectId) => {
    const options = [];
    for (const key in optionsRaw) {
        options.push(key);
    }
    options.sort();

    const selectDom = document.querySelector(selectId);
    options.forEach((option) => {
        selectDom.appendChild(createOptionElement(option));
    });
};
