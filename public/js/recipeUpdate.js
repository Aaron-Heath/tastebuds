
const form = document.querySelector('.form');

// Retrieves id from username element to be used in url
const recipeId = parseInt(usernameEl.dataset.recipeId)
console.log(recipeId)

// For updating recipes
async function updateRecipe(event) {

    // Prevents default form submission
    event.preventDefault();

    // Finds recipeId for fetch url by selecting the dataset stored with the recipe title

    try {
        //Collects body data
        const fetchBody = await getData(form);

        const response = await fetch(`/api/recipe/${recipeId}`, {
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
const getData = () => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');
        const ingredients = formData.get('ingredients');
        const directions = formData.get('directions');

        console.log(title)
        const fetchBody = {
            title: title,
            ingredients: ingredients,
            directions: directions,
        };

        console.log(fetchBody)
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission:', err);
    };
};

form.addEventListener('submit', updateRecipe);