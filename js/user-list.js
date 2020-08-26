(function () {
    const init = () => {
        setupListeners();
    }


    const setupListeners = () => {
        querySelector('.add-user-info-btn').addEventListener('click', addUserBtnClickHandler);
        querySelector('.remove-all-checked-btn').addEventListener('click', removeAllCheckedHandler);
    };

    const addUserBtnClickHandler = () => {
        const name = querySelector('#add-user-name').value;
        const surname = querySelector('#add-user-surname').value;
        const email = querySelector('#add-user-email').value;

        const isValidUserData = validateUserData({ name, surname, email });

        if (isValidUserData) {
            const newUserData = { name, surname, email, date: new Date() };
            generateNewUserDataDiv(newUserData);
            resetForm();
        }
    };

    function generateNewUserDataDiv(userData) {
        const tableContainer = querySelector('.table-body');
        const containerDiv = createElement('div', 'table-body-user-item');

        const checkbox = createElement('input', 'table-body-item-checkbox');
        checkbox.type = 'checkbox';
        const nameDiv = generateEditableDiv(createElement('div', 'table-body-item input-filed'), userData.name);
        const surnameDiv = generateEditableDiv(createElement('div', 'table-body-item input-filed'), userData.surname);
        const emailDiv = generateEditableDiv(createElement('div', 'table-body-item input-filed'), userData.email);
        const dateDiv = createElement('div', 'table-body-item', generateDate(userData.date));
        const actionDiv = createElement('div', 'table-body-item-actions');
        generateActionsDiv(actionDiv);

        containerDiv.append(checkbox, nameDiv, surnameDiv, emailDiv, dateDiv, actionDiv);
        tableContainer.append(containerDiv);
    }

    function generateActionsDiv(div) {
        div.classList.add('action-div');
        const editBtn = createElement('button', 'edit-btn action-btn', 'Edit');
        editBtn.addEventListener('click', handlerEditItem);

        const removeBtn = createElement('button', 'remove-btn action-btn', 'Remove');
        removeBtn.addEventListener('click', handlerRemoveItem);

        div.append(editBtn, removeBtn);
    }

    const handlerRemoveItem = (e) => {
        e.target.parentNode.parentNode.remove();
    };

    const handlerEditItem = (e) => {
        const isEditMode = e.target.parentNode.parentNode.classList.contains('edit-mode');

        if (isEditMode) {
            const name = e.target.parentNode.parentNode.children[1].children[1].value
            const surname = e.target.parentNode.parentNode.children[2].children[1].value
            const email = e.target.parentNode.parentNode.children[3].children[1].value
            const isValidData = validateUserData({ name, surname, email });

            if (isValidData) {
                saveNewData(e);
                e.target.parentNode.parentNode.classList.toggle('edit-mode');
                e.target.innerText = isEditMode ? 'Edit' : 'Save';
            }
        } else {
            e.target.parentNode.parentNode.classList.toggle('edit-mode');
            e.target.innerText = isEditMode ? 'Edit' : 'Save';
        }
    }

    function removeAllCheckedHandler() {
        const allItems = document.querySelectorAll('.table-body-user-item')
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].children[0].checked) allItems[i].remove();
        }
    }

    function saveNewData(e) {
        for (let i = 1; i < 4; i++) {
            e.target.parentNode.parentNode.children[i].children[0].innerText = e.target.parentNode.parentNode.children[i].children[1].value;
        }
    }

    function generateDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    function generateEditableDiv(div, value) {
        const pElement = createElement('p', '', value);
        const inputElement = createElement('input');
        inputElement.value = value;
        div.append(pElement, inputElement);
        return div;
    }

    function resetForm() {
        querySelector('#add-user-name').value = '';
        querySelector('#add-user-surname').value = '';
        querySelector('#add-user-email').value = '';
    }

    const validateUserData = ({ name, surname, email }) => {
        if (!name) {
            Alert("Name can't be empty");
            return false;
        }
        if (!surname) {
            Alert("Surname can't be empty");
            return false;
        }
        if (!email) {
            Alert("Email can't be empty");
            return false;
        }

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            Alert("Incorrect email");
            return false;
        }

        return true;
    };

    init();
})();