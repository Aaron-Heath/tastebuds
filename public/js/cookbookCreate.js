const form = document.querySelector('.form');

// Retrieves id from username element to be used in creating new recipe
const usernameEl = document.querySelector('.username');
const creator_id = parseInt(usernameEl.dataset.userId)
console.log(creator_id)


// For creating new recipes
const createCookbook = async (event) => {

    // Prevents default form submission
    event.preventDefault();

    // Post method for creating new recipes
    try {
        // Collects body data
        const fetchBody = await getData();

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
            return data;
        }

    } catch (err) {
        console.error(err)
    };
};


// For collecting body data for POST requests
const getData = async () => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description');
        const viewers = formData.getAll('viewers');
        const editors = formData.getAll('editors');

        // Gets checkbox status for isPublic
        const checkbox = document.querySelector('#isPublic');
        let isPublic = false;
        if (checkbox.checked) {
            isPublic = true;
        }

        const fetchBody = {
            creator_id: creator_id,
            title: title,
            isPublic: isPublic,
            description: description,
            viewers: viewers,
            editors: editors
        };

        console.log(fetchBody)
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission:', err);
    };
};

form.addEventListener('submit', createCookbook);