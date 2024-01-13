async function fetchUserData() {
    try {
        const response = await fetch('./appRoutes', {
            method: 'GET',
            headers: { 'content-type': 'application/json'}});
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}

fetchUserData()
    .then(userData => {
        console.log('User Data:', userData);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });

// Function to update the list items based on the selected cookbook
function updateListItems(userData) {
    const usernameItem = document.querySelector('.list-group-item.username');
    const cookbooksCreatedItem = document.querySelector('.list-group-item.cookbooks-created');
    const recipesCreatedItem = document.querySelector('.list-group-item.recipes-created');

    // Update the content based on the selected cookbook and user data
    usernameItem.textContent = `Username: ${userData.username}`;
    cookbooksCreatedItem.textContent = `Cookbooks Created: ${Object.keys(userData.cookbooksCreated).length}`;
    //total number of recipes created accros all cookbooks 
    const totalRecipesCreated = Object.values(userData.cookbooksCreated).reduce((total, cookbook) => total + cookbook.recipesCreated, 0);
    recipesCreatedItem.textContent = `Recipes Created: ${totalRecipesCreated}`;
}
    

// Example: Call the functions when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch user data
    const userData = await fetchUserData();

  
    updateListItems(userData);
});
  
  
  // Function to handle the edit button click
  async function handleEditButtonClick() {
    try {
        // Fetch data from a specific endpoint
        const response = await fetch('/recipeRoutes');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Do something with the fetched data
        console.log('Fetched data:', data);

        // Add additional logic here based on the fetched data

        // Toggle the visibility of the dropdown
        const dropdown = document.querySelector('.dropdown-menu');
        dropdown.classList.toggle('show');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

    // Function for add button click
    function handleAddButtonClick() {
        // this will url for creating cookbook page
        const newPageURL = '/path/to/new/page.html';

        // Navigate to the new page
        window.location.href = newPageURL;
    }


// // Function to handle the dropdown item click
// function handleDropdownItemClick(item) {
//     // Example: Navigate to a page based on the clicked item
//     switch (item) {
//         case 'Item 1':
//             window.location.href = '/path/';
//             break;
//         case 'Item 2':
//             window.location.href = '/path/';
//             break;
//         // Add more cases as needed
//         default:
//             // Handle other cases or perform a default action
//             break;
//     }
// }
//     console.log(`Dropdown item clicked: ${item}`);


// Event listeners
const editButton = document.querySelector('.edit');

document.querySelector('.edit').addEventListener('click', handleEditButtonClick);
// add tool tip to edit button
editButton.title = 'Edit';

const addButton = document.querySelector('.add-btn');

document.querySelector('.add-btn').addEventListener('click', handleAddButtonClick);
// add tool tip to edit button
addButton.title = 'Add';

// const dropdownItems = document.querySelectorAll('.dropdown-item');
// dropdownItems.forEach(item => {
//     item.addEventListener('click', () => handleDropdownItemClick(item.textContent));
// });