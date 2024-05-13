/* 
    Responsible for editing currently selected entity
    Whenever an appropriate change is queued, editEntity function is called and adjusts current entity based on changes

*/

/* edits selected entity */
function editEntity(){
    /* checks for valid entries of universal changes */
    if(isNaN(parseFloat($("#x").val())) || isNaN(parseFloat($("#y").val())) || isNaN(parseFloat($("#z").val()))){
        alert("Please enter a valid position");
        return false;
    }
    if(hexToRgb($("#color").val()) == null){
        alert("Invalid color (check that the color was entered in hexadecimal format)");
        return;
    }
    if(val && ((isNaN(parseFloat($("#rotationZ").val())) || isNaN(parseFloat($("#rotationY").val())) || isNaN(parseFloat($("#rotationX").val()))))){
        alert("Please enter a valid rotation");
        return;
    } else if(!val && isNaN(parseFloat($("#rotationZ").val()))) {
        alert("Please enter a valid rotation");
        return;
    }

    let p1;
    let p2;
    let d;
    /* Checks whether the current entity is advanced or not */
    let animationComponent = selectedEntity.getAttribute('movement')
    if(selectedEntity.getAttribute('advanced').val){
        /* Updates universal settings if advanced */
        
        d = (-Math.round(Math.sqrt((parseFloat($("#x").val()))*(parseFloat($("#x").val()))+(parseFloat($("#z").val()))*(parseFloat($("#z").val())))))
        selectedEntity.setAttribute("angle",{x: ((Math.asin(parseFloat($("#x").val())/d))*180)/Math.PI, z: d});
        selectedEntity.setAttribute("rotation",{x: parseFloat($("#rotationX").val()), y: parseFloat($("#rotationY").val()), z: parseFloat($("#rotationZ").val())});
        stopMovement(selectedEntity);
        selectedEntity.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: -parseFloat($("#z").val())});
        
        p1 = {x: parseFloat($("#startX").val()), y: parseFloat($("#startY").val()), z: -parseFloat($("#startZ").val())}
        p2 = {x: parseFloat($("#endX").val()), y: parseFloat($("#endY").val()), z: -parseFloat($("#endZ").val())}

        let xDelta = p2.x-p1.x
        let yDelta = p2.y-p1.y
        let zDelta = p2.z-p1.z
        d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
        animationComponent.origin = {x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: -parseFloat($("#z").val())}
        animationComponent.rotationOrigin = {x: parseFloat($("#rotationX").val()), y: parseFloat($("#rotationY").val()), z: parseFloat($("#rotationZ").val())}

    } else {
        /* Updates universal settings if not advanced */
        
        selectedEntity.setAttribute("angle",{x: -parseFloat($("#x").val()), z: -parseFloat($("#z").val())})
        selectedEntity.setAttribute("rotation",{x: 0, y: selectedEntity.getAttribute('angle').x, z: parseFloat($("#rotationZ").val())});
        stopMovement(selectedEntity);
        selectedEntity.setAttribute("position",{x: -parseFloat($("#z").val()) * Math.sin((-parseFloat($("#x").val())*Math.PI)/180), y: parseFloat($("#y").val()), z: -parseFloat($("#z").val()) * Math.cos((-parseFloat($("#x").val())*Math.PI)/180)});
        
        p1 = {theta: parseFloat($("#startX").val()), y: parseFloat($("#startY").val()), r: -parseFloat($("#startZ").val())}
        p2 = {theta: parseFloat($("#endX").val()), y: parseFloat($("#endY").val()), r: -parseFloat($("#endZ").val())}
        let thetaDelta = (p2.theta-p1.theta)
        let arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(p2.r);
        let yDelta = Math.abs(p2.y-p1.y)
        d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
        let animationComponent = selectedEntity.getAttribute('movement')
        animationComponent.origin = {x: -parseFloat($("#z").val()) * Math.sin((-parseFloat($("#x").val())*Math.PI)/180), y: parseFloat($("#y").val()), z: -parseFloat($("#z").val()) * Math.cos((-parseFloat($("#x").val())*Math.PI)/180)}
        animationComponent.rotationOrigin = {x: 0, y: selectedEntity.getAttribute('angle').x, z: parseFloat($("#rotationZ").val())}
        
    }

    /* Updates Movement Animation */
 
    let selectedIndex = parseFloat(animationList.getAttribute('selectedIndex'))
    let i = 0;
    let counter = -1;

    // have to take into account rebounds from rubberband
    while(i < animationComponent.types.length){
      if(animationComponent.types[i] != 'Rebound'){
        counter++;
        if(counter == selectedIndex){
          break
        }
      }
      i++;
    }

    // if old animation type is rebound, remove resulting rebounds
    if(i < animationComponent.types.length-1 && animationComponent.types[i+1] == 'Rebound'){
        animationComponent.startPoints.splice(i+1,1);
        animationComponent.endPoints.splice(i+1,1);
        animationComponent.initialVelocities.splice(i+1,1);
        animationComponent.accelerations.splice(i+1,1);
        animationComponent.types.splice(i+1,1);
    }

    // add new movement
    if($('#movementTypeIn').val() == 'Pause'){
        animationComponent.types[i] = 'Pause'
        animationComponent.initialVelocities[i] = parseFloat($("#startY").val());
        animationComponent.accelerations[i] = 0;
        animationComponent.status = -1
        animationComponent.index = 0
        animationComponent.timeElapsed = 0
        animationComponent.currentVelocity = 0
    } else if($('#movementTypeIn').val() == 'Rubberband'){
        animationComponent.startPoints[i] = p1;
        animationComponent.startPoints.splice(i+1,0,p2);
        animationComponent.endPoints[i] = p2;
        animationComponent.endPoints.splice(i+1,0,p1);
        animationComponent.initialVelocities[i] = parseFloat($("#speed").val());
        animationComponent.initialVelocities.splice(i+1,0,Math.sqrt(parseFloat($("#speed").val())**2+2*parseFloat($("#acceleration").val())*d));
        animationComponent.accelerations[i] = parseFloat($("#acceleration").val());
        animationComponent.accelerations.splice(i+1,0,parseFloat($("#acceleration").val()));
        animationComponent.types[i] = 'Rubberband'
        animationComponent.types.splice(i+1,0,'Rebound');
        animationComponent.status = -1
        animationComponent.index = 0
        animationComponent.timeElapsed = 0
        animationComponent.currentVelocity = 0
        
    } else if($('#movementTypeIn').val() != 'None'){

        animationComponent.startPoints[i] = p1;
        animationComponent.endPoints[i] = p2;
        animationComponent.initialVelocities[i] = parseFloat($("#speed").val());
        animationComponent.accelerations[i] = parseFloat($("#acceleration").val());
        animationComponent.types[i] = ($('#movementTypeIn').val() == 'Start') ? 'Start' :'Discontinuous'
        animationComponent.status = -1
        animationComponent.index = 0
        animationComponent.timeElapsed = 0
        animationComponent.currentVelocity = 0
    }

    selectedEntity.setAttribute('movement',animationComponent)
    updateMovementSettings()

    // create new animation list child
    if(animationList.childElementCount != 0){
        animationList.children[selectedIndex].innerText = $('#movementTypeIn').val()
    }

    // handle texture change
    if(!selectedEntity.getAttribute('id').includes("plane")){
        selectedEntity.setAttribute("material",{shader: "flat", src: "", color: $("#color").val()});
    } else {
        /* Adds a texture if a texture input is selected */
        if($("#texture").val() == "none"){
            selectedEntity.setAttribute("material",{shader: "flat", src: "", color: $("#color").val()});
        } else {
            selectedEntity.setAttribute("material",{shader: "flat", src: "#"+texture.selectedOptions[0].value, color: $("#color").val()});
        }
    } 
    

    // update appropriate entity
    if(selectedEntity.getAttribute("id").includes("circle")){  /* circle only changes */
        if(!editCircle(selectedEntity)){
            return;
        }
        
    } else if (selectedEntity.getAttribute("id").includes("plane")){ /* plane only changes */
        if(!editPlane(selectedEntity)){
            return;
        }
    } else if (selectedEntity.getAttribute("id").includes("triangle")){ /* triangle only changes */
        if(!editTriangle(selectedEntity)){
            return;
        }
    } else if (selectedEntity.getAttribute("id").includes("gradient")) {
        if(!editGradient(selectedEntity)){
            return;
        }
    } else if(selectedEntity.getAttribute("id").includes("grille")){ /* gradient and grille only changes */
        if(!editGrille(selectedEntity)){
            return;
        }
    } else if (selectedEntity.getAttribute("id").includes("checkerboard")){ /* checkerboard only changes */
        if(!editCheckerboard(selectedEntity)){
            return;
        } 
    } else if (selectedEntity.getAttribute("id").includes("circularDotarray")){ /* checkerboard only changes */
        if(!editCircularDotArray(selectedEntity)){
            return;
        }  
    } else if (selectedEntity.getAttribute("id").includes("dotarray")){ /* checkerboard only changes */
        if(!editDotArray(selectedEntity)){
            return;
        }
    }  else if (selectedEntity.getAttribute("id").includes("bullseye")){ /* checkerboard only changes */
        if(!editBullseye(selectedEntity)){
            return;
        }
    } else if (selectedEntity.getAttribute("id").includes("text")){ /* text only changes */
        if(!editText(selectedEntity)){
            return;
        }
    } else if (selectedEntity.getAttribute("id").includes("timer")){ /* text only changes */
        if(!editTimer(selectedEntity)){
            return;
        }        
    }

    updateJSON() // update the json file of current scene
}