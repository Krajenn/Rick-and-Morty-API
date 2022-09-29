import {
    renderOrigin,
    renderLocation,
    renderChapters,
} from "./buttons-detail.js";

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
    listElement.classList.add("ulDashboard");

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
        const buttonContentWrapper = document.querySelector(
            ".button-content-wrapper"
        );

        originDiv.classList.toggle("active");
        locationDiv.classList.remove("active");
        chaptersDiv.classList.remove("active");

        buttonContentWrapper.classList.add("active");

        const detailContainer = document.querySelector(".detail-container");

        if (originDiv.classList.contains("active")) {
            detailContainer.style.borderRadius = "1rem 1rem 0 0";
            renderOrigin(character.origin);
        } else {
            buttonContentWrapper.classList.remove("active");
            detailContainer.style.borderRadius = "1rem";
        }
    });

    buttonsContainer.appendChild(locationDiv);
    locationDiv.addEventListener("click", () => {
        const buttonContentWrapper = document.querySelector(
            ".button-content-wrapper"
        );

        originDiv.classList.remove("active");
        locationDiv.classList.toggle("active");
        chaptersDiv.classList.remove("active");

        buttonContentWrapper.classList.add("active");

        const detailContainer = document.querySelector(".detail-container");

        if (locationDiv.classList.contains("active")) {
            detailContainer.style.borderRadius = "1rem 1rem 0 0";
            renderLocation(character.location);
        } else {
            buttonContentWrapper.classList.remove("active");
            detailContainer.style.borderRadius = "1rem";
        }
    });

    buttonsContainer.appendChild(chaptersDiv);
    chaptersDiv.addEventListener("click", () => {
        const buttonContentWrapper = document.querySelector(
            ".button-content-wrapper"
        );

        originDiv.classList.remove("active");
        locationDiv.classList.remove("active");
        chaptersDiv.classList.toggle("active");

        buttonContentWrapper.classList.add("active");

        const detailContainer = document.querySelector(".detail-container");

        if (chaptersDiv.classList.contains("active")) {
            detailContainer.style.borderRadius = "1rem 1rem 0 0";
            renderChapters(character.episode);
        } else {
            buttonContentWrapper.classList.remove("active");
            detailContainer.style.borderRadius = "1rem";
        }
    });

    characterWrapper.appendChild(nameWrapper);
    characterWrapper.appendChild(buttonsContainer);

    return characterWrapper;
};

export const renderCharacterDetail = (character, all) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";

    // PREV NEXT
    const prevNextContainer = document.createElement("div");
    prevNextContainer.classList.add("prev-next-container");

    const prev = document.createElement("a");
    prev.classList.add("prev");
    prev.innerText = "prev";
    prev.href = `?id=${character.id - 1 ? character.id - 1 : character.id}`;

    const next = document.createElement("a");
    next.classList.add("next");
    next.innerText = "next";
    next.href = `?id=${
        character.id + 1 <= all ? character.id + 1 : character.id
    }`;

    prevNextContainer.appendChild(prev);
    prevNextContainer.appendChild(next);
    rootElement.appendChild(prevNextContainer);
    // END OF PREV NEXT

    rootElement.appendChild(createDetailElement(character));

    const buttonContentWrapper = document.createElement("div");
    buttonContentWrapper.classList.add("button-content-wrapper");
    const buttonContentContainer = document.createElement("ul");
    buttonContentContainer.classList.add("button-content-container");

    buttonContentWrapper.appendChild(buttonContentContainer);
    rootElement.appendChild(buttonContentWrapper);

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
