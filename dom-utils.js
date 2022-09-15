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

    infoContainerElement.appendChild(
        createInfoElement("Name: ", character.name)
    );
    infoContainerElement.appendChild(
        createInfoElement("Species: ", character.species)
    );
    infoContainerElement.appendChild(
        createInfoElement("Status: ", character.status)
    );
    infoContainerElement.appendChild(
        createInfoElement("Gender: ", character.gender)
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

// MOBILE MENU
export const mobileMenuHandler = () => {
    const filtersDivjHeigth =
        (document.querySelector(".filters").offsetHeight / 4) * 3;
    const mainElement = document.querySelector("main");

    if (window.innerWidth <= 576) {
        mainElement.style.transform = `translateY(calc(-${filtersDivjHeigth}px - 2rem))`;
    } else {
        mainElement.style.transform = `translateY(0)`;
    }
};
// END OF MOBILE MENU

export const renderCharactersList = (allCharacters) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createListElement(allCharacters));

    mobileMenuHandler();

    document.querySelector(".loader-wrapper").style.display = "none";
};

// ************* DETAIL *****************

const createDetailElement = (character) => {
    const characterWrapper = document.createElement("div");
    characterWrapper.classList.add("detail-container");

    characterWrapper.appendChild(createImageElement(character));

    const nameWrapper = document.createElement("div");
    const nameElement = document.createElement("strong");
    nameElement.classList.add("character-name");
    nameElement.innerText = character.name;

    nameWrapper.appendChild(nameElement);
    characterWrapper.appendChild(nameWrapper);

    return characterWrapper;
};

export const renderCharacterDetail = (character) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createDetailElement(character));

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
