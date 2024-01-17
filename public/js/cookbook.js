const $settingsButton = document.getElementById("settings-btn");
const hideClass = ' visible-false'


function handleSettings(event) {
    const $settingsCard = document.getElementById("settings-card");
    // console.log(event.target);
    // make visible
    const isVisible = $settingsCard.dataset.visible === 'true';

    if(isVisible) {
        console.log('making invisible')
        // change class and dataset
        $settingsCard.className += hideClass;
        $settingsCard.dataset.visible = 'false'
    } else {
        console.log('making visible')
        $settingsCard.className = $settingsCard.className.replace(hideClass,"")
        $settingsCard.dataset.visible = true;
    }
    


}

$settingsButton.addEventListener('click',handleSettings);