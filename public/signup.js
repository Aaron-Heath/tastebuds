
const form = document.getElementById('signupForm');

async function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission

    // Collects form data
    const formData = new FormData(form);

    try {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Handle the response data
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

form.addEventListener('submit', submitForm);
