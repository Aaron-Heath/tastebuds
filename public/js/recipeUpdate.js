// TODO: 
    // -Make sure there is a username class element present in handlebars with the User id in a dataset called 'data-user-id="{{...}}"
    // -Make sure there is a recipe class element present in handlebars with the Recipe id in a dataset called 'data-recipe-id="{{...}}"


    const form = document.querySelector('.form');

    // Retrieves id from username element to be used in recipe routes
    const usernameEl = document.querySelector('.username');
    const creator_id = parseInt(usernameEl.dataset.userId)
    console.log(creator_id)

    // For updating recipes
    async function updateRecipe(event) {
    
        // Prevents default form submission
        event.preventDefault();
    
        // Finds recipeId for fetch url by selecting the dataset stored with the recipe title
        const recipeEl = document.querySelector('#title');
        const recipeElId = parseInt(recipeEl.dataset.recipedId)
    
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