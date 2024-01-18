const $settingsButton = document.getElementById("settings-btn");
const $settingsUpdate = document.getElementById("settings-update");
const $editButton = document.getElementById("edit");

const hideClass = ' visible-false'

/**
 * Changes visibility of settings card based on click event on the settings button.
 *   
 */
function handleSettings(event) {
    const $settingsCard = document.getElementById("settings-card");
    // console.log(event.target);
    // make visible
    const isVisible = $settingsCard.dataset.visible === 'true';

    if(isVisible) {
        console.log('making invisible')
        // change class and dataset
        $settingsCard.className += hideClass;
        $settingsCard.dataset.visible = 'false';
    } else {
        console.log('making visible')
        $settingsCard.className = $settingsCard.className.replace(hideClass,"")
        $settingsCard.dataset.visible = true;
    }
    


}


/**
 * Sends a PUT request to the server to add editors or viewers to a cookbook.
 *  
 */
async function handleShare(event) {
    if(!event.target.matches('button')) {
        return;
    }

    const $settingsCard = document.getElementById("settings-card");

    // Lock inputs during update
    const $inputs = document.querySelectorAll('input');
    for (let $input of $inputs) {
        $input.disabled = true;
    }

    if(event.target.matches('#delete-cookbook')) {
        // TODO: Delete cookbook
    } else {
        // Share
        let PERMISSIONS;
        if(event.target.matches('#add-editor')) {
            PERMISSIONS = 'editor';
        } else if (event.target.matches('#add-viewer')) {
            PERMISSIONS = 'viewer';
        } else {
            throw Error('Invalid permission recieved');
        }

        // Get username
        const username = document.getElementById(PERMISSIONS).value;

        response = await fetch('/api/share/', {
            method:'PUT',
            body: JSON.stringify({
                username:username,
                cookbook_id: $settingsCard.dataset.id,
                permissions: PERMISSIONS
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            alert('Successfully shared!');
        } else {
            alert('Something went wrong. Please try again later.');
        }


    }

    // Unlock inputs
    for (let $input of $inputs) {
        $input.disabled = false;
    }

    console.log(event.target);
}

async function handleEditClick(event) {
    console.log(event.target);
    // Return if wrong element is clicked
    if(!event.target.matches('#edit')) return;

    const $currentButton = event.target;
    const editing = $currentButton.dataset.edit;

    if(editing === 'true') {
        const newTitle = document.getElementById("title").textContent;
        const description = document.getElementById("description").textContent;
        const cookbook_id = document.getElementById("settings-card").dataset.id;

        const fetchBody = {
            title: newTitle,
            description: description,
        }
        const requestPath = `/api/cookbook/${cookbook_id}`

        const response = await fetch(requestPath, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody),
        });

        if(response.ok) {
            alert('Update successful!');
        }
    } else {
        editChange('unlock');
    }


    
}

function editChange(lockUnlock) {
    const options = ['lock', 'unlock'];

    if(!options.includes(lockUnlock)) throw new Error('Must use lock or unlock');
    
    const $editableElements = document.querySelectorAll(".editable");

    for(let $element of $editableElements) {
        if(lockUnlock === 'lock') {
            $element.setAttribute('contenteditable', false);
        } else {
            $element.setAttribute('contenteditable',true);
        }
        
    };

    // Change edit back to normal
    if($editButton.dataset.edit === 'true') {
        $editButton.dataset.edit = 'false'
    } else {
        $editButton.dataset.edit = 'true'
    } 

    return;

}

    

$editButton.addEventListener('click', handleEditClick);
$settingsUpdate.addEventListener('click', handleShare);
$settingsButton.addEventListener('click',handleSettings);