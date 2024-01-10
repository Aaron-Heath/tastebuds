const form = document.querySelector('.form');

async function submitForm(event) {

    // Prevents default form submission
    event.preventDefault();

    // Collects form data
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

    // Post method for creating new recipes
    try {
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



// Put method for updating recipes
// TODO: Figure out recipe_id variable
// TODO: Create query selector for element to pull input from
const updateRecipe = async () => {
    try {
        const response = await fetch(`/api/recipe/${recipe}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Successful PUT requrest!');
            return data;
        }


    } catch (err) {
        console.error(err);
    };
};