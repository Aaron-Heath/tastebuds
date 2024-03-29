const form = document.querySelector('.form');

// Retrieves id from username element to be used in creating new recipe
const usernameEl = document.querySelector('.username');
console.log(usernameEl)
const creator_id = parseInt(usernameEl.dataset.userId)
console.log(creator_id)

const editorEl = document.querySelector('.editors-div');
const viewerEl = document.querySelector('.viewers-div');

// For creating new cookbooks
const createCookbook = async (event) => {

    // Prevents default form submission
    event.preventDefault();

    // Post method for creating new cookbooks
    try {
        // Collects body data
        const fetchBody = await getData();
        console.log(fetchBody)

        const response = await fetch('/api/cookbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            console.log('Successful POST request!');

            window.location.href = 'cookbook/:cookbook_id';
            return data;
        }

    } catch (err) {
        console.error(err)
    };
};


// For collecting body data for POST requests
const getData = async (event) => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description');
        const viewers = formData.getAll('viewers');
        const editors = formData.getAll('editors');

        // Gets checkbox status for isPublic
        const checkbox = document.querySelector('#defaultCheck1');
        let isPublic = false;
        if (checkbox.checked) {
            isPublic = true;
        }

        // Gets viewers and editors from form and creates an array of data
        const userCookbookData = [];
        for (each of viewers) {
            userCookbookData.push({'viewer': each});
        }
        for (each of editors) {
            userCookbookData.push({'editor': each});
        }

        console.log(userCookbookData)
        // Sets data to be sent back to server for POST request
        const fetchBody = {
            creator_id: creator_id,
            title: title,
            isPublic: isPublic,
            description: description,
            userCookbookData: userCookbookData
            
        };

        console.log(fetchBody)
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission:', err);
    };
};

// For adding/removing viewers
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