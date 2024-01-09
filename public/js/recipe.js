// Post method for creating new recipes
// TODO: Create query selector for element to pull input from
const newRecipe = async () => {
    try {
        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(),   
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