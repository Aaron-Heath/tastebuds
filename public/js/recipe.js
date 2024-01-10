const form = document.querySelector('.form');

// For creating new recipes
async function createRecipe(event) {

    // Prevents default form submission
    event.preventDefault();

    // Post method for creating new recipes
    try {
        // Collects body data
        await getData();

        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody),
        });

        if (response.ok) {
            const data = await response.json();
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
        await getData();


        const response = await fetch(`/api/recipe/${recipeElId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(),
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
        const cookbook_id = formData.get('cookbookId');

        const fetchBody = {
            title: title,
            ingredients: ingredients,
            directions: directions,
            cookbook_id: cookbook_id,
        };

        return fetchBody;
    } catch (err) {
        console.error('Invalid form submission:', err);
    };
}