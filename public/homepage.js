  // Function to handle the edit button click
  async function handleEditButtonClick() {
    try {
        // Fetch data from a specific endpoint
        const response = await fetch('your_api_endpoint');
        
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


// Function to handle the dropdown item click
function handleDropdownItemClick(item) {
    // Example: Navigate to a page based on the clicked item
    switch (item) {
        case 'Item 1':
            window.location.href = '/path/to/item1-page.html';
            break;
        case 'Item 2':
            window.location.href = '/path/to/item2-page.html';
            break;
        // Add more cases as needed
        default:
            // Handle other cases or perform a default action
            break;
    }
}
    console.log(`Dropdown item clicked: ${item}`);


// Event listeners
document.querySelector('.edit').addEventListener('click', handleEditButtonClick);
document.querySelector('.add-btn').addEventListener('click', handleAddButtonClick);

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => handleDropdownItemClick(item.textContent));
});