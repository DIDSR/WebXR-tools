/* Contains code related to starting or stopping animations*/

// starts all animations in the scene
// called by start all button and controller input
function startAll(){
    // starts timer if present
    let status = 1;
    if(timerNum > 0){
        startTimer()
    }

    // updates statuses of each element in scene
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        if(data.startPoints.length > 0){
            data.status = status;
            els[i].setAttribute('movement',data)
        }

        i++;
    }

    // disables and enables appropiate buttons
    startAllButton.disabled = true
    pauseAllButton.disabled = false
    stopAllButton.disabled = false
}

// pauses all animations in the scene
// called by pause all button and controller input
function pauseAll(){
    // pauses timer if present
    let status = 0;
    if(timerNum > 0){
        clearInterval(time)
    }
    // updates status of each entity
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        if(data.startPoints.length > 0){
            data.status = status;
            els[i].setAttribute('movement',data)
        }

        i++;
    }

    // disables and enables appropriate buttons
    startAllButton.disabled = false
    pauseAllButton.disabled = true
    stopAllButton.disabled = false
}

// stops all animations in the scene
// called by stop all button and controller input
function stopAll(){
    // if no entities then do nothing
    if(els.length <= 0){
        return
    }

    // stop and reset timer if present
    if(timerNum > 0){
        clearInterval(time)
        timeElapsed = 0;
        let timer = document.getElementById('timer0')
        let textVal = timer.getAttribute('text')
        textVal.value = "00:00.00 "
        timer.setAttribute('text',textVal)
    }

    // update status of each element
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        data.status = -1;
        els[i].setAttribute('movement',data)

        i++;
    }

    // disables and enables appropriate buttons
    startAllButton.disabled = false
    pauseAllButton.disabled = true
    stopAllButton.disabled = true

    movementIcon.className = "fa-solid fa-play"
}

// handles movement of a single entity
function handleMovementToggle(e){
    e.stopPropagation() // prevents collapsing of movement section on button press
    // if not currently playing
    if(movementIcon.className == "fa-solid fa-play"){
        // start playing
        let data = selectedEntity.getAttribute('movement')
        data.status = 1
        selectedEntity.setAttribute('movement',data)
        movementIcon.className = "fa-solid fa-pause"
    } else { 
        // pause movement
        let data = selectedEntity.getAttribute('movement')
        data.status = 0
        selectedEntity.setAttribute('movement',data)
        movementIcon.className = "fa-solid fa-play"

    }
}

// stops movement of single entity
function stopIndividual(e){
    e.stopPropagation() // prevents collapsing of movement section on button press
    let data = selectedEntity.getAttribute('movement')
    data.status = -1
    selectedEntity.setAttribute('movement',data)
    movementIcon.className = "fa-solid fa-play"

}

// stops the movement of a single entity
function stopMovement(el){
    mov = el.getAttribute('movement')
    clearInterval(mov.status)
    mov.status = -1
    el.setAttribute('movement',mov)
    movementIcon.className = "fa-solid fa-play";
}
