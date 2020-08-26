class Modal {
    overlay = null;
    modals = [];
    options = { canCloseOnOverlayClick: true };

    createModal(options = {}) {
        if (!this.overlay) {
            this._drawOverlay();
        }
        this._drawModal(options);
    }

    closeModal = () => {
        this.modals[0].classList.add('modal-window-closed');
        this.modals[0].addEventListener('animationend', () => {
            this.overlay.remove();
            this.overlay = null;
        })

        this.modals = [];
    };

    _drawOverlay() {
        const overlayDiv = this._generateElement('div', 'modal-overlay');
        overlayDiv.addEventListener('click', this._clickOverlayHandler);

        this.overlay = overlayDiv;
        document.body.append(overlayDiv);
    }

    _clickOverlayHandler = () => {
        const { canCloseOnOverlayClick } = this.options;
        if (canCloseOnOverlayClick) this.closeModal();
    }

    _drawModal(options) {
        const { customModalNode } = options;
        if (customModalNode) {
            customModalNode.classList.add('modal-window-opened');
            this.overlay.append(customModalNode);
            this.modals.push(customModalNode);
            return;
        }
        const modalDiv = this._generateElement('div', 'modal-window modal-window-opened');
        modalDiv.addEventListener('click', this._modalClickHandler);

        const modalTopSectionDiv = this._drawModalTopSection();
        const contentDiv = this._drawModalContent(options);

        modalDiv.append(modalTopSectionDiv, contentDiv);
        this.overlay.append(modalDiv);
        this.modals.push(modalDiv);
    }

    _drawModalContent({ title, description }) {
        const modalContentDiv = this._generateElement('div', 'modal-content');

        const titleElement = this._generateElement('h3', 'modal-content-title');
        titleElement.innerText = title;

        const descriptionElement = this._generateElement('p', 'modal-content-description');
        descriptionElement.innerText = description;

        modalContentDiv.append(titleElement, descriptionElement);
        return modalContentDiv;
    }

    _drawModalTopSection() {
        const topSectionDiv = this._generateElement('div', 'modal-top-section');

        const closeIconImg = this._generateElement('img');
        closeIconImg.src = './images/close.svg';
        closeIconImg.addEventListener('click', this.closeModal);

        topSectionDiv.append(closeIconImg);
        return topSectionDiv;
    }

    _modalClickHandler = e => {
        e.stopPropagation();
    }

    _generateElement = (element, classes = '') => {
        const createdElement = document.createElement(element);
        createdElement.className = classes;
        return createdElement;
    }
}

const M = new Modal();
