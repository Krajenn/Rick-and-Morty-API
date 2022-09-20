export const renderOrigin = (origin) => {
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

    const renderContainer = (origin) => {
        const buttonContentContainer = document.querySelector(
            ".button-content-container"
        );
        buttonContentContainer.innerHTML = "";

        buttonContentContainer.appendChild(
            createInfoElement("Name:", origin.name)
        );
        buttonContentContainer.appendChild(
            createInfoElement("Type:", origin.type)
        );
        buttonContentContainer.appendChild(
            createInfoElement("Dimension", origin.dimension)
        );
        buttonContentContainer.appendChild(
            createInfoElement("Residents", origin.residents)
        );
    };

    fetch(origin.url)
        .then((res) => res.json())
        .then((origin) => {
            origin = {
                name: origin.name,
                type: origin.type,
                dimension: origin.dimension,
                residents: origin.residents ? origin.residents.length : "0",
            };
            renderContainer(origin);
        })
        .catch((e) => {
            console.error("No records found: ", e);
        });
};

export const renderLocation = () => {
    
}