const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(username);
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        // Formatted request body into object - AH 1/10/2024
        body: JSON.stringify({
          username: username,
          password: password }
          ),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the app page
        document.location.replace('/app');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);