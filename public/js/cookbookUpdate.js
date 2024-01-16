const form = document.querySelector('.form');

// Retrieves id from username element to be used in url
const usernameEl = document.querySelector('.username');
const cookbookId = parseInt(usernameEl.dataset.cookbookId);
console.log(cookbookId);

const viewersEl = document.querySelector('.viewers-div');
const editorsEl = document.querySelector('.editors-div');

// For updating cookbooks
const updateCookbook = async (event) => {

    // Prevents default form submission
    event.preventDefault();

    try {
        // Collects body data
        const fetchBody = await getData(form);

        const response = await fetch(`/api/cookbook/${cookbookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Successful PUT request!');
            return data;
        }

    } catch (err) {
        console.error(err);
    };
};

// For collecting body data for PUT requests
const getData = async () => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description');
        const viewers = formData.getAll('viewers');
        const editors = formData.getAll('editors');

        // Checks for checkbox status
        const checkbox = document.querySelector('#isPublic');
        let isPublic = false;
        if (checkbox.checked) {
            isPublic = true;
        }

        // Gets viewers and editors from form and creates an array of data
        const userCookbookData = [];
        for (each of viewers) {
            userCookbookData.push({ 'viewer': each });
        }
        for (each of editors) {
            userCookbookData.push({ 'editor': each });
        }

        const fetchBody = {
            title: title,
            isPublic: isPublic,
            description: description,
            userCookbookData: userCookbookData
        };

        console.log(fetchBody)
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission', err);
    };
};

const addRemoveViewers = async (event) => {
    if (!event.target.matches("img")) {
        return;
    }

    const buttonClass = event.target.className;


    if (buttonClass === "plus-img") {

        // Create and append new div
        const inputRow = document.createElement('div');
        inputRow.className = 'row mb-3';

        const textDiv = document.createElement("div");
        textDiv.className = "col-10";

        const textInput = document.createElement('input');
        textInput.className = "form-control viewers";
        textInput.type = "text";
        textInput.id = 'viewers'
        textInput.name = "viewers"
        textInput.placeholder = "New Viewer"
        textInput.required = true;

        textDiv.appendChild(textInput);

        inputRow.appendChild(textDiv);

        // Create and append new images
        const imgDiv = document.createElement("div");
        imgDiv.className = "col-2 d-flex align-items-center justify-content-center";
        imgDiv.innerHTML = (`
        <img class="plus-img"  width="30" height="30" src="https://img.icons8.com/color/48/plus--v1.png" alt="plus--v1"/>
        <img class="minus-img"  width="30" height="30" src="https://img.icons8.com/color/48/minus.png" alt="minus"/>
        `);

        inputRow.appendChild(imgDiv);

        viewerEl.appendChild(inputRow);



    } else if (buttonClass === "minus-img") {
        // Delete parent element from dom
        event.target.parentElement.parentElement.remove();
    }
}

// For adding/removing editors
const addRemoveEditors = async (event) => {
    if (!event.target.matches("img")) {
        return;
    }

    const buttonClass = event.target.className;


    if (buttonClass === "plus-img") {

        // Create and append new div
        const inputRow = document.createElement('div');
        inputRow.className = 'row mb-3';

        const textDiv = document.createElement("div");
        textDiv.className = "col-10";

        const textInput = document.createElement('input');
        textInput.className = "form-control editors";
        textInput.type = "text";
        textInput.id = 'editors'
        textInput.name = "editors"
        textInput.placeholder = "New Editor"
        textInput.required = true;

        textDiv.appendChild(textInput);

        inputRow.appendChild(textDiv);

        // Create and append new images
        const imgDiv = document.createElement("div");
        imgDiv.className = "col-2 d-flex align-items-center justify-content-center";
        imgDiv.innerHTML = (`
        <img class="plus-img"  width="30" height="30" src="https://img.icons8.com/color/48/plus--v1.png" alt="plus--v1"/>
        <img class="minus-img"  width="30" height="30" src="https://img.icons8.com/color/48/minus.png" alt="minus"/>
        `);

        inputRow.appendChild(imgDiv);

        editorEl.appendChild(inputRow);



    } else if (buttonClass === "minus-img") {
        // Delete parent element from dom
        event.target.parentElement.parentElement.remove();
    }
}

form.addEventListener('submit', createCookbook);
editorEl.addEventListener('click', addRemoveEditors);
viewerEl.addEventListener('click', addRemoveViewers);
