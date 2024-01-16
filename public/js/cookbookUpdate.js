const form = document.querySelector('.form');

// Retrieves id from username element to be used in url
const usernameEl = document.querySelector('.username');
const cookbookId = parseInt(usernameEl.dataset.cookbookId);
console.log(cookbookId);

// For updating cookbooks
const updateCookbook = async (event) => {

    // Prevents default form submission
    event.preventDefault();

    try {
        // Collects body data
        const fetchBody = await getData(form);

        const response = await fetch(`/api/cookbook/${cookbookId}`, {
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
const getData = async () => {
    try {
        const formData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description');
        const viewers = formData.getAll('viewers');
        const editors = formData.getAll('editors');

        // Checks for checkbox status
        const checkbox = document.querySelector('#isPublic');
        let isPublic = false;
        if (checkbox.checked) {
            isPublic = true;
        }

        const fetchBody = {
            title: title,
            isPublic: isPublic,
            description: description,
            viewers: viewers,
            editors: editors
        };

        console.log(fetchBody)
        return fetchBody;

    } catch (err) {
        console.error('Invalid form submission', err);
    };
};

form.addEventListener('submit', updateCookbook);

const viewersDiv = document.querySelector('.viewers-div');
const editorsDiv = document.querySelector('.editors-div');
const userCookbook = usernameEl.dataset.userCookbook;
console.log(userCookbook)
