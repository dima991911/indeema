const querySelector = selector => {
    return document.querySelector(selector);
}

const createElement = (element, classes = '', text = null) => {
    const createdElement = document.createElement(element);
    createdElement.className = classes;
    if (text) createdElement.innerText = text;

    return createdElement;
}
