/* 
    Contains functions that are integral to the functionality of graphical interface.
    These include showing and hiding textboxes, updating currently displayed stats, and changing between modes
*/

/* Initial webpage layout hides all edit related containers */
toggleDisplayEdit(null);
toggleAddEdit(null);

/* hides edit section */
function hideEditStats(){
    area1.style.display = "none";
    area1.style.display = "none";
    area3.style.display = "none";
    area4.style.display = "none";
    area5.style.display = "none";
    specificSettings.style.gridTemplateRows = "13% 17% 16% 17% 16% 17%";

    removeButton.style.display = "none";
    duplicateButton.display = "none";
    background.style.display = "none";
    vertices.style.display = "none";
    //entitySelectorText.style.display = "none";
    //ent.style.display = "none";
    //nonUni.style.display = "none";
    //entitySelectorText.style.display = "none";
    //posIn.style.display = "none";
    //colIn.style.display = "none";
    colIn2.style.display = "none";
    heightIn.style.display = "none";
    widthIn.style.display = "none";
    radiusIn.style.display = "none";
    //rotIn.style.display = "none";
    va.style.display = "none";
    vb.style.display = "none";
    vc.style.display = "none";
    numBars.style.display = "none";
    rows.style.display = "none";
    cols.style.display = "none";
    tileSize.style.display = "none";
    textureIn.style.display = "none";
    uploadTextureIn.style.display = "none";
    fillIn.style.display = "none";
    //advanced.style.display = "none";
    circleSize.style.display = "none";
    spacing.style.display = "none";
    numDots.style.display = "none";
    numCircles.style.display = "none";
    arraySpacing.style.display = "none";
    ringPitch.style.display = "none";
    numRings.style.display = "none";
    toggleCenterDot.style.display = "none";
    textIn.style.display = "none";
}

function updateMovementSettings(){
    if(movementTypeIn.value == "Pause"){
        //
        startHeader.style.display = "block"
        startHeader.textContent = 'Time (ms)'
        startX.style.display = "none"
        startY.style.display = "block"
        startZ.style.display = "none"
        endHeader.style.display = "none"
        endX.style.display = "none"
        endY.style.display = "none"
        endZ.style.display = "none"
        speedHeader.style.display = "none"
        //speedHeader.textContent = 'Time (ms)'
        accelerationHeader.style.display = "none"
        keyHeader.style.display = "none"
        speed.style.display = "none"
        acceleration.style.display = "none"
        //keyBind.style.display = "none"
        movementButtonContainer.style.display = "none"
    } else if(movementTypeIn.value == "None"){
        if(selectedEntity.getAttribute('advanced').val){
            startHeader.innerHTML = 'Start Point (x: m, y: m, z: m)'
        } else {
            startHeader.innerHTML = 'Start Point (\u03B1: deg, y: m, r: m):'
        }
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
        //keyBind.style.display = "none"
        movementButtonContainer.style.display = "none"
    } else if(movementTypeIn.value == "Start" || movementTypeIn.value == "Rubberband"){
        if(selectedEntity.getAttribute('advanced').val){
            startHeader.innerHTML = 'Start Point (x: m, y: m, z: m)'
        } else {
            startHeader.innerHTML = 'Start Point (\u03B1: deg, y: m, r: m):'
        }
        startHeader.style.display = "block"
        startX.style.display = "block"
        startY.style.display = "block"
        startZ.style.display = "block"
        endHeader.style.display = "block"
        endX.style.display = "block"
        endY.style.display = "block"
        endZ.style.display = "block"
        speedHeader.style.display = "block"
        speedHeader.innerText = "Speed (m/s)"
        accelerationHeader.style.display = "block"
        //keyHeader.style.display = "block"
        speed.style.display = "block"
        acceleration.style.display = "block"
        //key.style.display = "block"
        movementButtonContainer.style.display = "inline"
    } else {
        if(selectedEntity.getAttribute('advanced').val){
            startHeader.innerHTML = 'Start Point (x: m, y: m, z: m)'
        } else {
            startHeader.innerHTML = 'Start Point (\u03B1: deg, y: m, r: m):'
        }
        startHeader.style.display = "block"
        startX.style.display = "block"
        startY.style.display = "block"
        startZ.style.display = "block"
        endHeader.style.display = "block"
        endX.style.display = "block"
        endY.style.display = "block"
        endZ.style.display = "block"
        speedHeader.style.display = "block"
        speedHeader.innerText = "Time (ms)"
        accelerationHeader.style.display = "none"
        //keyHeader.style.display = "block"
        speed.style.display = "block"
        acceleration.style.display = "none"
        //key.style.display = "block"
        movementButtonContainer.style.display = "inline"
    }
}

 var flag = false;
/* updates values in edit section */
function updateStats(){
    /* universal values */
    skyColor.value = sky.components.material.attrValue.color;
    $('#skyCol').minicolors("value",sky.components.material.attrValue.color);
    entity = selectedEntity;
    if(selectedEntity.getAttribute('advanced').val){
        endZ.disabled = false
        advanced.style.backgroundColor = '#00FF00'
        console.log('advanced')
        posIn.innerHTML = 'Position (x: m, y: m, z: m):'
        startHeader.innerHTML = 'Start Point (x: m, y: m, z: m)'
        endHeader.innerHTML = 'End Point (x: m, y: m, z: m)'
        rotationY.style.display = 'block'
        rotationX.style.display = 'block'
        xIn.value = (entity.components.position.attrValue.x).toFixed(3);
        yIn.value = (entity.components.position.attrValue.y).toFixed(3);
        zIn.value = (-entity.components.position.attrValue.z).toFixed(3);
        updateAnimationList(entity)

        if(animationList.getAttribute('selectedIndex') == ""){
            movementTypeIn.value = 'None'
        } else {   
            movementTypeIn.value = entity.components.movement.attrValue.types[0]
            updateMovementSettings()

            if(entity.components.movement.attrValue.startPoints.length != 0){

                startX.value = entity.components.movement.attrValue.startPoints[0].x
                startY.value = entity.components.movement.attrValue.startPoints[0].y
                startZ.value = -entity.components.movement.attrValue.startPoints[0].z
                endX.value = entity.components.movement.attrValue.endPoints[0].x
                endY.value = entity.components.movement.attrValue.endPoints[0].y
                endZ.value = -entity.components.movement.attrValue.endPoints[0].z
                acceleration.value = entity.components.movement.attrValue.accelerations[0]
                speed.value = entity.components.movement.attrValue.initialVelocities[0]
                if(entity.components.movement.attrValue.types[0] == 'Pause'){
                    startY.value = entity.components.movement.attrValue.initialVelocities[0]
                }
            }


        }

    } else {
        endZ.disabled = true
        advanced.style.backgroundColor =''
        posIn.innerHTML = 'Position (\u03B1: deg, y: m, r: m):'
        startHeader.innerHTML = 'Start Point (\u03B1: deg, y: m, r: m):'
        endHeader.innerHTML = 'End Point (\u03B1: deg, y: m, r: m):'
        rotationY.style.display = 'none'
        rotationX.style.display = 'none'
        xIn.value = (-entity.components.angle.attrValue.x).toFixed(3);
        yIn.value = (entity.components.position.attrValue.y).toFixed(3);
        zIn.value = (-entity.components.angle.attrValue.z).toFixed(3);

        if(animationList.getAttribute('selectedIndex') == ""){
            console.log('test 2')
            movementTypeIn.value = 'None'
        } else {  
            movementTypeIn.value = entity.components.movement.attrValue.types[0]
            updateMovementSettings()

            if(entity.components.movement.attrValue.startPoints.length != 0){
                startX.value = entity.components.movement.attrValue.startPoints[0].theta
                startY.value = entity.components.movement.attrValue.startPoints[0].y
                startZ.value = -entity.components.movement.attrValue.startPoints[0].r
                endX.value = entity.components.movement.attrValue.endPoints[0].theta
                endY.value = entity.components.movement.attrValue.endPoints[0].y
                endZ.value = -entity.components.movement.attrValue.endPoints[0].r
                acceleration.value = entity.components.movement.attrValue.accelerations[0]
                speed.value = entity.components.movement.attrValue.initialVelocities[0]
                if(entity.components.movement.attrValue.types[0] == 'Pause'){
                    startY.value = entity.components.movement.attrValue.initialVelocities[0]
                }
            }
        }

    }

    if(entity.components.movement.attrValue.status == -1){
        movementIcon.className = "fa-solid fa-play"
    } else {
        movementIcon.className = "fa-solid fa-pause"
    }

    rotationZ.value = (entity.components.rotation.attrValue.z).toFixed(3);
    rotationY.value = (entity.components.rotation.attrValue.y).toFixed(3);
    rotationX.value = (entity.components.rotation.attrValue.x).toFixed(3);
    flag = true;
    if(selectedEntity.getAttribute("id").includes("text") || selectedEntity.getAttribute("id").includes("timer")){
        color.value = entity.components.text.attrValue.color;
        $('#color').minicolors("value",entity.components.text.attrValue.color);
        console.log(entity)
    } else {
        color.value = entity.components.material.attrValue.color;
        $('#color').minicolors("value",entity.components.material.attrValue.color);
    }
    flag = false;
    if (entity.components.text || entity.components.material.attrValue.src == "" || entity.components.material.attrValue.src == null){
        texture.selectedIndex = 0;
        texture.options[0].selected = true;
    } else {
        $(texture.options).each(function() {
            if((entity.components.material.attrValue.src).includes(this.value))
                this.selected = true;
        });
    }

    if(selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusives */
        if(selectedEntity.children.length == 0){
            width.value = (selectedEntity.components.geometry.attrValue.width).toFixed(3);
            
        } else {
            width.value = (selectedEntity.children[2].components.geometry.attrValue.width).toFixed(3);
        }
        height.value = (selectedEntity.components.geometry.attrValue.height).toFixed(3);
        fill.value = (selectedEntity.components.fill.attrValue.val).toFixed(3);
    } else if(selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusives */
        radius.value = (selectedEntity.components.geometry.attrValue.radiusOuter).toFixed(3);
        fill.value = (selectedEntity.components.fill.attrValue.val).toFixed(3);
    } else if(selectedEntity.getAttribute("id").includes("triangle")){ /* triangle exclusives */
        vax.value = (selectedEntity.components.geometry.attrValue.vertexA.x).toFixed(3);
        vay.value = (selectedEntity.components.geometry.attrValue.vertexA.y).toFixed(3);
        vbx.value = (selectedEntity.components.geometry.attrValue.vertexB.x).toFixed(3);
        vby.value = (selectedEntity.components.geometry.attrValue.vertexB.y).toFixed(3);
        vcx.value = (selectedEntity.components.geometry.attrValue.vertexC.x).toFixed(3);
        vcy.value = (selectedEntity.components.geometry.attrValue.vertexC.y).toFixed(3);
    } else if(selectedEntity.getAttribute("id").includes("gradient")){ /* gradient exclusives */
        width.value = (selectedEntity.children[0].components.geometry.attrValue.width).toFixed(3);
        height.value = (selectedEntity.children[0].components.geometry.attrValue.height).toFixed(3);
        numBarsIn.value = (selectedEntity.children.length);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("checkerboard")){
        rowsIn.value = (selectedEntity.children.length);
        colsIn.value = (selectedEntity.children[0].children.length);
        tileSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.width).toFixed(3);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("grille")){
        width.value = (selectedEntity.children[0].components.geometry.attrValue.width).toFixed(3);
        height.value = (selectedEntity.children[0].components.geometry.attrValue.height).toFixed(3);
        numBarsIn.value = (selectedEntity.children.length);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("circularDotarray")){
        numDotsIn.value = (selectedEntity.children[1].children.length);
        numCirclesIn.value = (selectedEntity.children.length-1);
        arraySpacingIn.value = selectedEntity.components.arraySpacing.attrValue.val;
        circleSizeIn.value = (selectedEntity.children[0].components.geometry.attrValue.radiusOuter).toFixed(3);
        toggleCenterDotIn.checked = (selectedEntity.components.toggleCenterDot.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("dotarray")){
        rowsIn.value = (selectedEntity.children.length);
        colsIn.value = (selectedEntity.children[0].children.length);
        circleSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.radiusOuter).toFixed(3);
        spacingIn.value = selectedEntity.components.arraySpacing.attrValue.val;
        toggleCenterDotIn.checked = (selectedEntity.components.toggleCenterDot.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("bullseye")){
        numRingsIn.value = (selectedEntity.children.length-1);
        ringPitchIn.value = selectedEntity.children[0].components.geometry.attrValue.radiusOuter*2;
    }  else if(selectedEntity.getAttribute("id").includes("text")){
        width.value = entity.components.text.attrValue.width;
        height.value = entity.components.text.attrValue.height;
        textIn.value = entity.components.text.attrValue.value;
    } else if(selectedEntity.getAttribute("id").includes("timer")){
        width.value = entity.components.text.attrValue.width;
        height.value = entity.components.text.attrValue.height;
    }

}

/* switches between add or edit mode or refreshes current mode display */
function toggleDisplayEdit(swap){
    
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        stopAll()
        boolDisplayEdit = !boolDisplayEdit; /* change current mode */
    } 
    utility.checked = false;
    boolAddEdit = false;
    toggleAddEdit(null)
    /* check if current mode is add or edit */
    if(boolDisplayEdit){ /* if display */
    settingsButtonContainer.style.display = "inline-block"
    addEditContent.style.display = "none"
    packageLayout.style.display = "grid"
    swapContainer.style.width = ""
    animationListButtonContainer.style.display = "none"
    openAnimationList(true)
    //settingsButton.setAttribute('')
        //scene_input.value = ""
        //toggleAddEdit(false);
    } else { /* if add */
        
        if(!isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            if(coreLayout.style.gridTemplateColumns != "100% 0%"){
                openSettings()
            }
            settingsButtonContainer.style.display = "none"
            addEditContent.style.display = "block"
            packageLayout.style.display = "none"
            swapContainer.style.float = "left";
            swapContainer.style.paddingTop = "12px"
            swapContainer.style.paddingLeft = "18px"
            swapContainer.style.textAlign = ""
            //animationListButtonContainer.style.display = "inline-block"
            //$('#skyCol').minicolors('value', scenes[patternDisplay.value]['sky'].skyColor);
        } else {
            alert("You must select a pattern");
            displayUtility.checked = false;
            boolDisplayEdit = !boolDisplayEdit;
            swapContainer.style.float = "left";
            swapContainer.style.paddingTop = "12px"
            swapContainer.style.paddingLeft = "18px"
            swapContainer.style.textAlign = ""
            animationListButtonContainer.style.display = "none"
        }

    }
}

/* switches between add or edit mode or refreshes current mode display */
function toggleAddEdit(swap){
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        stopAll()
        if(numAdded == 0){
            alert("You must add an entity before editing the scene");
            utility.checked = false;
            return;
        }
        boolAddEdit = !boolAddEdit; /* change current mode */
        if(boolAddEdit){
            if(selectedEntity == null) {
                selectedEntity = els[0] /* set selected entity to be first entity created */
            }
            updateStats();
         } /* update stats */
    } else if(swap == false){
        utility.checked = false;
        boolAddEdit = false;
    }
    /* check if current mode is add or edit */
    if(boolAddEdit){ /* if edit */
        
        editContent.style.display = 'grid';
        addContent.style.display = 'none';
        background.style.display = "none";
        skyIn.style.display = "none";
        animationListButtonContainer.style.display = 'inline-block'
        

        /* check geometry of object */
        if (selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusive containers shown */
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            if(selectedEntity.components.material.attrValue.src == null || selectedEntity.components.material.attrValue.src == ""){
                area3.style.display = "block";
                fillIn.style.display = "flex";
            }
            area4.style.display = "block";
            textureIn.style.display = "flex";
            area5.style.display = "block";
            uploadTextureIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusive containers shown */
            specificSettings.style.gridTemplateRows = "17% 17% 0% 17% 16% 17%";
            area1.style.display = "block";
            radiusIn.style.display = "flex"; 
            area3.style.display = "block";
            fillIn.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("triangle")) { /* triangle exlcusive containers shown */
            area1.style.display = "block";
            vertices.style.display = "block";
            area2.style.display = "block";
            va.style.display = "flex";
            area3.style.display = "block";
            vb.style.display = "flex";
            area4.style.display = "block"
            vc.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("gradient") || selectedEntity.getAttribute("id").includes("grille")) { /* gradient exlcusive containers shown */
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            area3.style.display = "block";
            numBars.style.display = "flex";
            area4.style.display = "block";
            colIn2.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("checkerboard")) { /* gradient exlcusive containers shown */
            area1.style.display = "block";
            cols.style.display = "flex";
            area2.style.display = "block";
            rows.style.display = "flex";
            area3.style.display = "block";
            tileSize.style.display = "flex";
            area4.style.display = "block";
            colIn2.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("circularDotarray")){
            area1.style.display = "block";
            numDots.style.display = "flex";
            area2.style.display = "block";
            numCircles.style.display = "flex";
            area3.style.display = "block";
            circleSize.style.display = "flex";
            area4.style.display = "block";
            arraySpacing.style.display = "flex";
            area5.style.display = "block";
            toggleCenterDot.style.display = "flex"
        } else if (selectedEntity.getAttribute("id").includes("dotarray")){
            area1.style.display = "block";
            cols.style.display = "flex";
            area2.style.display = "block";
            rows.style.display = "flex";
            area3.style.display = "block";
            circleSize.style.display = "flex";
            area4.style.display = "block";
            spacing.style.display = "flex";
            area5.style.display = "block";
            toggleCenterDot.style.display = "flex"
        } else if (selectedEntity.getAttribute("id").includes("bullseye")){
            area1.style.display = "block";
            numRings.style.display = "flex";
            area2.style.display = "block";
            ringPitch.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("text")){
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            area3.style.display = "block";
            textIn.style.display = "flex";
        }  else if (selectedEntity.getAttribute("id").includes("timer")){
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
        }
        updateAnimationList(entity)
        if(animationList.childElementCount == 0){
            updateAnimationUI(entity,-1) 
        } else {
            updateAnimationUI(entity,0)
        }
        
    } else { /* if add */
        editContent.style.display = 'none'
        addContent.style.display = 'block'
        hideEditStats(); /* hide edit containers */
        background.style.display = 'block'
        entitySelectorText.style.display = 'flex'
        skyIn.style.display = 'block'
        animationListButtonContainer.style.display = 'none'
        openAnimationList(true)
    }
}

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

function hideUniversal(){

    if(uni.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%"){
        // hide
        //hideUniversalIcon.className = "fa-solid fa-chevron-right"
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
        //universalHeader.style.display = "none";
        //uni.style.borderBottom = "0px solid #999";
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
        //hideUniversalIcon.className = "fa-solid fa-chevron-down"
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
        //universalHeader.style.display = "block";
        //uni.style.borderBottom = "1px solid #999";
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

var oldSize = null;
function hideSpecific(){
    if(specificSettings.style.gridTemplateRows != "100% 0% 0% 0% 0% 0%"){
        // hide
        //hideSpecificIcon.className = "fa-solid fa-chevron-right"
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
        //hideSpecificIcon.className = "fa-solid fa-chevron-down"
        toggleAddEdit(null);
        specificSettings.style.gridTemplateRows = oldSize
        //universalHeader.style.display = "block";
        //uni.style.borderBottom = "1px solid #999";
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

function hideMovement(){

    if(movement.style.gridTemplateRows != "100% 0% 0% 0% 0% 0% 0% 0%"){
        // hide
        //hideUniversalIcon.className = "fa-solid fa-chevron-right"
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
        //keyBind.style.display = "none"
        movementButtonContainer.style.display = "none"
        //universalHeader.style.display = "none";
        //uni.style.borderBottom = "0px solid #999";
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
        //hideUniversalIcon.className = "fa-solid fa-chevron-down"
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
        //keyHeader.style.display = "block"
        speed.style.display = "block"
        acceleration.style.display = "block"
        //key.style.display = "block"
        movementButtonContainer.style.display = "inline"
        //universalHeader.style.display = "block";
        //uni.style.borderBottom = "1px solid #999";
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

let dragged;
let id;
let index;
let indexDrop;
let list;

  document.addEventListener("dragstart", ({target}) => {
      dragged = target;
      id = target.id;
      list = target.parentNode.children;
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === dragged){
          index = i;
        }
      }
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
   if(target.className == "dropzone" && target.id !== id) {
       dragged.remove( dragged );
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === target){
          indexDrop = i;
        }
      }
      if(index > indexDrop) {
        target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });

  function updateAnimationList(entity){
    if(entity == null){
        animationList.innerHTML = ""
        animationList.setAttribute('selectedIndex',"")
        return
    }

    console.log(entity)
    let anims = entity.getAttribute('movement').types;
    out = []
    let i = 0;
    animationList.innerHTML = ""
    animationList.setAttribute('selectedIndex',"")
    while(i < anims.length){
        if(anims[i] != 'Rebound'){
            let el = document.createElement('li');
            el.innerText = anims[i]
            if(i == 0){
                el.style.background ='#F39814'
                animationList.setAttribute('selectedIndex',0)
            }
        
            el.setAttribute('draggable',true)
            el.addEventListener('dragstart', dragStart)
            el.addEventListener('drop', droppedAnim)
            el.addEventListener('dragenter', cancelDefault)
            el.addEventListener('dragover', cancelDefault)
            el.addEventListener('click',selectAnimation)
        
            animationList.appendChild(el)
            animationList.scrollTo({
                top: 1000000000,
                left: 0,
                behavior: "smooth",
            });
        }
        i++;
    }
   
  }