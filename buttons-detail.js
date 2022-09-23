export const clearContent = () => {
    document.querySelector(".button-content-container").innerHTML = "";
};

const renderError = () => {
    const buttonContentContainer = document.querySelector(
        ".button-content-container"
    );
    buttonContentContainer.innerHTML = "";

    const infoElement = document.createElement("li");
    infoElement.innerHTML = "No records found";

    buttonContentContainer.appendChild(infoElement);
};

const renderOriginOrLocation = (valueObject) => {
    const createInfoElement = (labelName, value) => {
        const infoElement = document.createElement("li");

        const labelElement = document.createElement("strong");
        labelElement.innerText = `${labelName}: `;

        const valueElement = document.createElement("span");
        valueElement.innerText = value;

        infoElement.appendChild(labelElement);
        infoElement.appendChild(valueElement);

        return infoElement;
    };

    const buttonContentContainer = document.querySelector(
        ".button-content-container"
    );
    buttonContentContainer.innerHTML = "";

    buttonContentContainer.appendChild(
        createInfoElement("Name:", valueObject.name)
    );
    buttonContentContainer.appendChild(
        createInfoElement("Type:", valueObject.type)
    );
    buttonContentContainer.appendChild(
        createInfoElement("Dimension", valueObject.dimension)
    );
    buttonContentContainer.appendChild(
        createInfoElement("Residents", valueObject.residents)
    );
};

export const renderOrigin = (origin) => {
    fetch(origin.url)
        .then((res) => res.json())
        .then((origin) => {
            origin = {
                name: origin.name,
                type: origin.type,
                dimension: origin.dimension,
                residents: origin.residents ? origin.residents.length : "0",
            };
            renderOriginOrLocation(origin);
        })
        .catch((error) => {
            console.error("Error: ", error);
            renderError();
        });
};

export const renderLocation = (location) => {
    const renderLocation = () => {};

    fetch(location.url)
        .then((res) => res.json())
        .then((location) => {
            location = {
                name: location.name,
                type: location.type,
                dimension: location.dimension,
                residents: location.residents ? location.residents.length : "0",
            };
            renderOriginOrLocation(location);
        })
        .catch((error) => {
            console.error("Error: ", error);
            renderError();
        });
};

export const renderChapters = (chaptersUrls) => {
    const renderChaptersContent = (chapters) => {
        const buttonContentContainer = document.querySelector(
            ".button-content-container"
        );
        buttonContentContainer.innerHTML = "";

        chapters.forEach((chapter) => {
            const infoElement = document.createElement("li");
            infoElement.innerHTML = chapter.name;
            buttonContentContainer.appendChild(infoElement);
        });
    };

    Promise.all(
        chaptersUrls.map((url) => fetch(url).then((res) => res.json()))
    ).then((chapters) => {
        renderChaptersContent(chapters);
    });
};
