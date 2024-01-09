const form = document.querySelector('.form');

async function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission

    // Collects form data
    const formData = new FormData(form);

    const firstName = formData.get('fname');
    const lastName = formData.get('lname');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('pwd');

    const fetchBody = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(fetchBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Handles the response data
        console.log(data);

        // TODO: prompt user to check their email

        //clear innerHtml on form-container

        // create new html elements telling user to check their email and activate their account

        
    } catch (error) {
        console.error('Error:', error);
    }
}

form.addEventListener('submit', submitForm);
