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
    colIn2.style.display = "none";
    heightIn.style.display = "none";
    sizeIn.style.display = "none";
    widthIn.style.display = "none";
    radiusIn.style.display = "none";
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

// updates movement settings UI
function updateMovementSettings(){
    if(movementTypeIn.value == "Pause"){
        // pause
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
        accelerationHeader.style.display = "none"
        keyHeader.style.display = "none"
        speed.style.display = "none"
        acceleration.style.display = "none"
        movementButtonContainer.style.display = "none"
    } else if(movementTypeIn.value == "None"){
        // none
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
        movementButtonContainer.style.display = "none"
    } else if(movementTypeIn.value == "Start" || movementTypeIn.value == "Rubberband"){
        // rubberband
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
        speed.style.display = "block"
        acceleration.style.display = "block"
        movementButtonContainer.style.display = "inline"
    } else {
        // start to finish
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
        speed.style.display = "block"
        acceleration.style.display = "none"
        movementButtonContainer.style.display = "inline"
    }
}

 var flag = false;
/* updates values in edit section */
function updateStats(){
    /* update universal values */
    skyColor.value = sky.components.material.attrValue.color;
    $('#skyCol').minicolors("value",sky.components.material.attrValue.color);
    entity = selectedEntity;
    // if advanced
    if(selectedEntity.getAttribute('advanced').val){
        endZ.disabled = false
        advanced.style.backgroundColor = '#00FF00'
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
        // if not advanced
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
    } else {
        color.value = entity.components.material.attrValue.color;
        $('#color').minicolors("value",entity.components.material.attrValue.color);
    }

    flag = false; // this is used to stop color changer events from firing
    if (entity.components.text || entity.components.material.attrValue.src == "" || entity.components.material.attrValue.src == null){
        texture.selectedIndex = 0;
        texture.options[0].selected = true;
    } else {
        $(texture.options).each(function() {
            if((entity.components.material.attrValue.src).includes(this.value))
                this.selected = true;
        });
    }

    // specific values

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
    } else if(selectedEntity.getAttribute("id").includes("checkerboard")){ /* checkerboard */
        rowsIn.value = (selectedEntity.children.length);
        colsIn.value = (selectedEntity.children[0].children.length);
        tileSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.width).toFixed(3);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("grille")){ /* grille */
        width.value = (selectedEntity.children[0].components.geometry.attrValue.width).toFixed(3);
        height.value = (selectedEntity.children[0].components.geometry.attrValue.height).toFixed(3);
        numBarsIn.value = (selectedEntity.children.length);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("circularDotarray")){ /* circular dot array */
        numDotsIn.value = (selectedEntity.children[1].children.length);
        numCirclesIn.value = (selectedEntity.children.length-1);
        arraySpacingIn.value = selectedEntity.components.arraySpacing.attrValue.val;
        circleSizeIn.value = (selectedEntity.children[0].components.geometry.attrValue.radiusOuter).toFixed(3);
        toggleCenterDotIn.checked = (selectedEntity.components.toggleCenterDot.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("dotarray")){ /* dot array */
        rowsIn.value = (selectedEntity.children.length);
        colsIn.value = (selectedEntity.children[0].children.length);
        circleSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.radiusOuter).toFixed(3);
        spacingIn.value = selectedEntity.components.arraySpacing.attrValue.val;
        toggleCenterDotIn.checked = (selectedEntity.components.toggleCenterDot.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("bullseye")){ /* bullseye */
        numRingsIn.value = (selectedEntity.children.length-1);
        ringPitchIn.value = selectedEntity.children[0].components.geometry.attrValue.radiusOuter*2;
    }  else if(selectedEntity.getAttribute("id").includes("text")){ /* text */
        width.value = entity.components.text.attrValue.width;
        textIn.value = entity.components.text.attrValue.value;
    } else if(selectedEntity.getAttribute("id").includes("timer")){ /* timer */
        width.value = entity.components.text.attrValue.width;
        height.value = entity.components.text.attrValue.height;
    }

}

// updates all aspects of the animation UI on change from animation list
function updateAnimationUI(entity, ind) {
    if(ind == -1){
      movementTypeIn.value = "None"
      movementTypeIn.disabled = true
      updateMovementSettings()
      return
    }
    
    let mov = entity.getAttribute('movement')
    let i = 0;
    let counter = -1;
  
    // have to take into account rebounds from rubberband
    while(i < mov.types.length){
      if(mov.types[i] != 'Rebound'){
        counter++;
        if(counter == ind){
          break
        }
      }
      i++;
    }
  
    if(entity.getAttribute('advanced').val){
      startX.value = mov.startPoints[i].x
      startY.value = mov.startPoints[i].y
      startZ.value = -mov.startPoints[i].z
      endX.value = mov.endPoints[i].x
      endY.value = mov.endPoints[i].y
      endZ.value = -mov.endPoints[i].z
    } else {
      startX.value = mov.startPoints[i].theta
      startY.value = mov.startPoints[i].y
      startZ.value = -mov.startPoints[i].r
      endX.value = mov.endPoints[i].theta
      endY.value = mov.endPoints[i].y
      endZ.value = -mov.endPoints[i].r
    }
  
    movementTypeIn.value = mov.types[i]
    acceleration.value = mov.accelerations[i]
    speed.value = mov.initialVelocities[i]
    movementTypeIn.disabled = false
    if(mov.types[i] == 'Pause'){
      startY.value = mov.initialVelocities[i]
    }
    updateMovementSettings()
  
  }