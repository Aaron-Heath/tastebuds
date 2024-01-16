const form = document.querySelector('.form');
const ingredientContainer = document.getElementById("ingredients-container");
// const ingredientRow = ingredientContainer.children[0];
const directionContainer = document.getElementById("directions-container");

// Retrieves id from username element to be used in creating new recipe
// const usernameEl = document.querySelector('.username');
// const creator_id = parseInt(usernameEl.dataset.userId)
// console.log(creator_id)

// editing form
function addRemoveIngredient(event) {
    if(!event.target.matches("img")) {
        return;
    }

    const buttonClass = event.target.className;

    
    if(buttonClass === "plus-img") {

        // Create and append new div
        const inputRow = document.createElement('div');
        inputRow.className='row mb-3';

        const textDiv = document.createElement("div");
        textDiv.className = "col-10";

        const textInput = document.createElement('input');
        textInput.className="form-control ingredients";
        textInput.type = "text";
        textInput.id='ingredients'
        textInput.name = "ingredients"
        textInput.placeholder = "e.g. 1/2 Tbs Flour"
        textInput.required = true;

        textDiv.appendChild(textInput);

        inputRow.appendChild(textDiv);

        // Create and append new images
        const imgDiv = document.createElement("div");
        imgDiv.className="col-2 d-flex align-items-center justify-content-center";
        imgDiv.innerHTML=(`
        <img class="plus-img"  width="30" height="30" src="https://img.icons8.com/color/48/plus--v1.png" alt="plus--v1"/>
        <img class="minus-img"  width="30" height="30" src="https://img.icons8.com/color/48/minus.png" alt="minus"/>
        `);

        inputRow.appendChild(imgDiv);

        ingredientContainer.appendChild(inputRow);



    } else if (buttonClass === "minus-img") {
        // delete parent element from dom
        event.target.parentElement.parentElement.remove();
    }
}

function addRemoveDirection(event) {
    if(!event.target.matches("img")) {
        return;
    }

    const buttonClass = event.target.className;

    
    if(buttonClass === "plus-img") {

        // Create and append new div
        const inputRow = document.createElement('div');
        inputRow.className='row mb-3';

        const textDiv = document.createElement("div");
        textDiv.className = "col-10";

        const textInput = document.createElement('input');
        textInput.className="form-control directions";
        textInput.type = "text";
        textInput.id='directions'
        textInput.name = "ingredients"
        textInput.placeholder = "Let simmer for 5 minutes."
        textInput.required = true;

        textDiv.appendChild(textInput);

        inputRow.appendChild(textDiv);

        // Create and append new images
        const imgDiv = document.createElement("div");
        imgDiv.className="col-2 d-flex align-items-center justify-content-center";
        imgDiv.innerHTML=(`
        <img class="plus-img"  width="30" height="30" src="https://img.icons8.com/color/48/plus--v1.png" alt="plus--v1"/>
        <img class="minus-img"  width="30" height="30" src="https://img.icons8.com/color/48/minus.png" alt="minus"/>
        `);

        inputRow.appendChild(imgDiv);

        directionContainer.appendChild(inputRow);



    } else if (buttonClass === "minus-img") {
        // delete parent element from dom
        event.target.parentElement.parentElement.remove();
    }
}


// For creating new recipes
async function createRecipe(event) {

//     // Prevents default form submission
    event.preventDefault();

    // Get needed data
    const fetchBody = getData();

//     // Post method for creating new recipes
    try {
        // Collects body data
        response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody),
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href= '/app/recipe/' + data.id; 
        }

    } catch (err) {
        console.error(err)
    };
};


// For collecting body data for POST requests
const getData = () => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');

        // const ingredients = formData.get('ingredients');
        const ingredientsElements = document.querySelectorAll("#ingredients");
        const ingredients = Array.from(ingredientsElements).map(element => element.value);

        // const directions = formData.get('directions');
        const directionsElements = document.querySelectorAll('#directions');
        const directions = Array.from(directionsElements).map((element, index) => {
        
            const direction = {
                step: index + 1,
                direction: element.value
            }
            return direction;
            
        });

        const cookbook_id = parseInt(document.querySelector("#cookbook-id").value)
        console.log(cookbook_id)

        console.log(title)
        const fetchBody = {
            title: title,
            ingredients: ingredients,
            directions: directions,
            cookbook_id: cookbook_id,
        };

        console.log(fetchBody)
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission:', err);
    };
};

form.addEventListener('submit', createRecipe)
ingredientContainer.addEventListener('click', addRemoveIngredient);
directionContainer.addEventListener('click', addRemoveDirection);