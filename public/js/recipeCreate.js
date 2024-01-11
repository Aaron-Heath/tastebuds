const form = document.querySelector('.form');

// Retrieves id from username element to be used in creating new recipe
const usernameEl = document.querySelector('.username');
const creator_id = parseInt(usernameEl.dataset.userId)
console.log(creator_id)


// For creating new recipes
async function createRecipe(event) {

    // Prevents default form submission
    event.preventDefault();

    // Post method for creating new recipes
    try {
        // Collects body data
        const fetchBody = await getData();

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


// For collecting body data for POST requests
const getData = () => {
    try {
        const formData = new FormData(form);
        
        const title = formData.get('title');
        const ingredients = formData.get('ingredients');
        const directions = formData.get('directions');
        const cookbook = formData.get('cookbookId');
        console.log(cookbook)
        const cookbook_id = parseInt(cookbook.dataset.cookbookId)
        console.log(cookbook_id)

        console.log(title)
        const fetchBody = {
            creator_id: creator_id,
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

form.addEventListener('submit', createRecipe);