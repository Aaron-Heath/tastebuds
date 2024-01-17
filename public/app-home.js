
  // Function to handle the edit button click
//   async function handleEditButtonClick() {
//     try {
//         // Fetch data from a specific endpoint
//         const response = await fetch(''); // need path to edit page here 
        
//         // Check if the response is successful
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         // Parse the JSON data from the response
//         const data = await response.json();

//         // Do something with the fetched data
//         console.log('Fetched data:', data);

//         // Add additional logic here based on the fetched data

//         // Toggle the visibility of the dropdown
//         const dropdown = document.querySelector('.dropdown-menu');
//         dropdown.classList.toggle('show');
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }

    // Function for add button click
    function handleAddButtonClick() {
        // this will url for creating cookbook page
        const newPageURL = '/app/cookbook'; // path to create cookbook page here

        // Navigate to the new page
        window.location.href = newPageURL;
    }



// Event listeners
const editButton = document.querySelector('.edit');

// document.querySelector('.edit').addEventListener('click', handleEditButtonClick);
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