// Post method for creating new recipes
// TODO: Create query selector for element to pull input from
const newRecipe = async () => {
    try {
        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },   
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