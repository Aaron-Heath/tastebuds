const form = document.querySelector('.form');
const formContainer = document.querySelector('.form-container');

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

        if (response.status !== 200 || !response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Something went wrong, please try again!");
        return;
    }
        console.log("Request complete");

        formContainer.innerHTML = "";

        // create new html elements telling user to check their email and activate their account
        const activationPrompt = document.createElement('div');
        activationPrompt.id = "activation-prompt";

        // Create add content
        const activationHeader = document.createElement('h2');
        activationHeader.textContent = "Thank you for signing up!";

        activationPrompt.appendChild(activationHeader);

        const activationText = document.createElement('p');

        activationText.className="form-subtitle";
        activationText.innerHTML =  'To activate your account, please check your inbox and spam folder for an activation link from <a href="mailto:noreply.tastebuds@gmail.com">noreply.tastebuds@gmail.com</a>.';

        activationPrompt.appendChild(activationText);

        // Render to screen
        formContainer.appendChild(activationPrompt);
       
        // set interval to redirect to login page after 15 seconds if user doesnt click button to redirect
        setTimeout(redirect, 15000);


     
        // create button to redirect to login page
        const loginButton = document.createElement('button');
        loginButton.className = "btn btn-primary";
        loginButton.textContent = "Login";
        loginButton.addEventListener('click', () => {
            window.location.href = '/login'; 
        });
        formContainer.appendChild(loginButton);     

}

function redirect() {
    window.location.href = '/login';
}

form.addEventListener('submit', submitForm);
