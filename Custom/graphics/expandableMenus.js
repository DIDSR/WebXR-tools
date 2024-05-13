// opens/closes the settings tab
function openSettings(){
    if(coreLayout.style.gridTemplateColumns == "100% 0%"){
        coreLayout.style.width = "500px"
        coreLayout.style.gridTemplateColumns = "52% 48%"
        settingsButtonContainer.style.paddingRight = "40px"
        settingsButton.className = "button reset"
        settingsButton.title = "Close settings"
        settingsIcon.className = "fa-solid fa-close"
        settingsButtonContainer.style.position = 'relative'
        settingsButtonContainer.style.float = 'none'
        settingsButtonContainer.style.right = '-50px'
        
    } else {
        coreLayout.style.width = "260px"
        coreLayout.style.gridTemplateColumns = "100% 0%"
        settingsButtonContainer.style.paddingRight = "14px"
        settingsButton.className = "button add"
        settingsButton.title = "Open settings"
        settingsIcon.className = "fa-solid fa-gear"
        settingsButtonContainer.style.float = 'right'
        settingsButtonContainer.style.right = ''
        settingsButtonContainer.style.position = ''
    }
}

// opens/closes the animation list tab
// takes in a parameter that indicates whether we are forcing the closing of this tab due to navigation
function openAnimationList(forceClose){
    if(forceClose){
        coreLayout.style.width = "260px"
        coreLayout.style.gridTemplateColumns = "100% 0%"
        settingsButtonContainer.style.paddingRight = "14px"
        animationListButton.className = "button add"
        animationListButton.title = "Open animation list"
        animationListIcon.className = "fa-solid fa-wand-sparkles"
        animationListButtonContainer.style.float = 'right'
        animationListButtonContainer.style.right = ''
        animationListButtonContainer.style.position = ''
        settingsLayout.style.gridTemplateRows = '30% 70% 100%'
        settingsLayout.style.overflowY = 'hidden'
        return
    }
    if(coreLayout.style.gridTemplateColumns == "100% 0%"){
        coreLayout.style.width = "500px"
        coreLayout.style.gridTemplateColumns = "55% 45%"
        settingsButtonContainer.style.paddingRight = "40px"
        animationListButton.className = "button reset"
        animationListButton.title = "Close animation list"
        animationListIcon.className = "fa-solid fa-close"
        animationListButtonContainer.style.position = 'relative'
        animationListButtonContainer.style.float = 'none'
        animationListButtonContainer.style.right = '-40px'
        settingsLayout.style.gridTemplateRows = '0% 0% 100%'
    } else {
        coreLayout.style.width = "260px"
        coreLayout.style.gridTemplateColumns = "100% 0%"
        settingsButtonContainer.style.paddingRight = "14px"
        animationListButton.className = "button add"
        animationListButton.title = "Open animation list"
        animationListIcon.className = "fa-solid fa-wand-sparkles"
        animationListButtonContainer.style.float = 'right'
        animationListButtonContainer.style.right = ''
        animationListButtonContainer.style.position = ''
    }
}

// collapses the ui
function collapseTab(){
    if(coreLayout.style.gridTemplateRows == "7% 7% 86%"){
        coreLayout.style.gridTemplateRows = "100% 0% 0%"
        coreLayout.style.height = "59.02"
        coreLayout.style.overflowY = "hidden"
    } else {
        coreLayout.style.gridTemplateRows = "7% 7% 86%"
        coreLayout.style.height = ""
        coreLayout.style.overflowY = "auto"
    }
}

// collapses universal settings section
function hideUniversal(){

    if(uni.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%"){
        // hide
        posIn.style.display = "none"
        xIn.style.display = "none"
        yIn.style.display = "none"
        zIn.style.display = "none"
        rotIn.style.display = "none"
        pitch.style.display = "none"
        roll.style.display = "none"
        yaw.style.display = "none"
        entColor.style.display = "none"
        advanced.style.display = "none"
        uni.style.gridTemplateRows = "100% 0% 0% 0% 0% 0%"
        if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
            editContent.style.gridTemplateRows = "8% 8% 8% 8%"
        } else if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "8% 8% 50% 8%"
        } else if(specificSettings.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "8% 50% 8% 8%"
        } else {
            editContent.style.gridTemplateRows = "8% 50% 50% 8%"
        }
        
    } else {
        // show
        posIn.style.display = "block"
        xIn.style.display = "block"
        yIn.style.display = "block"
        zIn.style.display = "block"
        rotIn.style.display = "block"
        pitch.style.display = "block"
        roll.style.display = "block"
        yaw.style.display = "block"
        entColor.style.display = "block"
        advanced.style.display = "block"
        uni.style.gridTemplateRows = "17% 17% 16% 17% 16% 17%"
        if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
            editContent.style.gridTemplateRows = "50% 8% 8% 8%"
        } else if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "50% 8% 50% 8%"
        } else if(specificSettings.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "50% 50% 8% 8%"
        } else {
            editContent.style.gridTemplateRows = "50% 50% 50% 8%"
        }
    }
}

// collapses specific section
var oldSize = null;
function hideSpecific(){
    if(specificSettings.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%"){
        // hide
        oldSize = specificSettings.style.gridTemplateRows
        area1.style.display = "none"
        area2.style.display = "none"
        area3.style.display = "none"
        area4.style.display = "none"
        area5.style.display = "none"
        specificSettings.style.gridTemplateRows = "100% 0% 0% 0% 0% 0%"
        if(uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
            editContent.style.gridTemplateRows = "8% 8% 8% 8%"
        } else if(uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "8% 8% 50% 8%"
        } else if(uni.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "50% 8% 8% 8%"
        } else {
            editContent.style.gridTemplateRows = "50% 8% 50% 8%"
        }
        
    } else {
        // show
        toggleAddEdit(null);
        specificSettings.style.gridTemplateRows = oldSize
        if(uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
            editContent.style.gridTemplateRows = "8% 50% 8% 8%"
        } else if(uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "8% 50% 50% 8%"
        } else if(uni.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%" && movement.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "50% 50% 8% 8%"
        } else {
            editContent.style.gridTemplateRows = "50% 50% 50% 8%"
        }
    }
}

// collapses movement section
function hideMovement(){

    if(movement.style.gridTemplateRows != "100% 0% 0% 0% 0% 0% 0% 0%"){
        // hide
        movementType.style.display = "none"
        startHeader.style.display = "none"
        startX.style.display = "none"
        startY.style.display = "none"
        startZ.style.display = "none"
        endHeader.style.display = "none"
        endX.style.display = "none"
        endY.style.display = "none"
        endZ.style.display = "none"
        speedHeader.style.display = "none"
        accelerationHeader.style.display = "none"
        keyHeader.style.display = "none"
        speed.style.display = "none"
        acceleration.style.display = "none"
        movementButtonContainer.style.display = "none"
        movement.style.gridTemplateRows = "100% 0% 0% 0% 0% 0% 0% 0%"
        if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
            editContent.style.gridTemplateRows = "8% 8% 8% 8%"
        } else if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && uni.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "50% 8% 8% 8%"
        } else if(specificSettings.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%" && uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "8% 50% 8% 8%"
        } else {
            editContent.style.gridTemplateRows = "50% 50% 8% 8%"
        }
        
    } else {
        // show
        movementType.style.display = "block"
        startHeader.style.display = "block"
        startX.style.display = "block"
        startY.style.display = "block"
        startZ.style.display = "block"
        endHeader.style.display = "block"
        endX.style.display = "block"
        endY.style.display = "block"
        endZ.style.display = "block"
        speedHeader.style.display = "block"
        accelerationHeader.style.display = "block"
        speed.style.display = "block"
        acceleration.style.display = "block"
        movementButtonContainer.style.display = "inline"
        movement.style.gridTemplateRows = "11% 13% 11% 13% 11% 13% 12% 12%"
        if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
            editContent.style.gridTemplateRows = "8% 8% 50% 8%"
        } else if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%" && uni.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "50% 8% 50% 8%"
        } else if(specificSettings.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%" && uni.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%") {
            editContent.style.gridTemplateRows = "8% 50% 50% 8%"
        } else {
            editContent.style.gridTemplateRows = "50% 50% 50% 8%"
        }
    }
}