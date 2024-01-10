// TODO: 
    // -Make sure there is a username class element present in handlebars with the User id in a dataset called 'data-user-id="{{...}}"
    // -Make sure there is a recipe class element present in handlebars with the Recipe id in a dataset called 'data-recipe-id="{{...}}"
    // -Create handlebars page with form
        // -Dropdown menu for selecting cookbook options


const form = document.querySelector('.form');

// Retrieves id from username element to be used in recipe routes
const usernameEl = document.querySelector('.username');
// const creator_id = usernameEl.dataset.userId
const creator_id = 1;

// For creating new recipes
async function createRecipe(event) {

    // Prevents default form submission
    event.preventDefault();

    // Post method for creating new recipes
    try {
        // Collects body data
        await getData(form);

        const response = await fetch('/api/recipe', {
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
            return data;
        }

    } catch (err) {
        console.error(err)
    };
};

// For updating recipes
async function updateRecipe(event) {

    // Prevents default form submission
    event.preventDefault();

    // Finds recipeId for url
    const recipeEl = document.querySelector('.recipe');
    const recipeElId = recipeEl.dataset.recipedId

    try {
        //Collects body data
        await getData(form);

        const response = await fetch(`/api/recipe/${recipeElId}`, {
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

// For collecting body data for POST and PUT requests
const getData = () => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');
        const ingredients = formData.get('ingredients');
        const directions = formData.get('directions');
        const cookbookName = formData.get('cookbookId');
        const cookbook_id = cookbookName.dataset.cookbookId

        const fetchBody = {
            creator_id: creator_id,
            title: title,
            ingredients: ingredients,
            directions: directions,
            cookbook_id: cookbook_id,
        };
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission:', err);
    };
};