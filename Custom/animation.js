function handleAnimationToggle(){
    if(animationButton.children[0].className.includes('fa-play')){
        animationButton.children[0].className = "fa-solid fa-pause";
        selectedEntity.emit('animLoopStart',null,false)
    } else {
        animationButton.children[0].className = "fa-solid fa-play";
        selectedEntity.emit('animLoopPause',null,false)
    }  

}

/*function handleAll(){
    // if no entities then do nothing
    if(els.length <= 0){
        return
    }
    // loop through each
    let status = 0;
    if(handleAllButton.children[0].className.includes('fa-play')){
        handleAllButton.children[0].className = "fa-solid fa-pause";
        status = 1;
        if(timerNum > 0){
            startTimer()
        }
    } else {
        handleAllButton.children[0].className = "fa-solid fa-play";
        // timer pause
        if(timerNum > 0){
            clearInterval(time)
        }
    }
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        if(data.startPoints.length > 0){
            data.status = status;
            els[i].setAttribute('movement',data)
        }

        i++;
    }

}*/

function startAll(){
    let status = 1;
    if(timerNum > 0){
        startTimer()
    }
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        if(data.startPoints.length > 0){
            data.status = status;
            els[i].setAttribute('movement',data)
        }

        i++;
    }

    startAllButton.disabled = true
    pauseAllButton.disabled = false
    stopAllButton.disabled = false
}

function pauseAll(){
    let status = 0;
    if(timerNum > 0){
        clearInterval(time)
    }
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        if(data.startPoints.length > 0){
            data.status = status;
            els[i].setAttribute('movement',data)
        }

        i++;
    }

    startAllButton.disabled = false
    pauseAllButton.disabled = true
    stopAllButton.disabled = false
}

function stopAll(){
    // if no entities then do nothing
    if(els.length <= 0){
        return
    }
    // set start all button icon to play
    //handleAllButton.children[0].className = "fa-solid fa-play";
    // loop through each
    let i = 0;
    while(i < els.length){
        let data = els[i].getAttribute('movement');
        data.status = -1;
        els[i].setAttribute('movement',data)

        i++;
    }
    // timer pause
    if(timerNum > 0){
        clearInterval(time)
        timeElapsed = 0;
        let timer = document.getElementById('timer0')
        let textVal = timer.getAttribute('text')
        textVal.value = "00:00.00 "
        timer.setAttribute('text',textVal)
    }

    startAllButton.disabled = false
    pauseAllButton.disabled = true
    stopAllButton.disabled = true

    movementIcon.className = "fa-solid fa-play"
}


function handleMovementToggle(e){
    e.stopPropagation()
    if(movementIcon.className == "fa-solid fa-play"){
        let data = selectedEntity.getAttribute('movement')
        data.status = 1
        selectedEntity.setAttribute('movement',data)
        movementIcon.className = "fa-solid fa-pause"
    } else {
        let data = selectedEntity.getAttribute('movement')
        data.status = 0
        selectedEntity.setAttribute('movement',data)
        movementIcon.className = "fa-solid fa-play"

    }
}

function stopIndividual(e){
    e.stopPropagation()
    let data = selectedEntity.getAttribute('movement')
    data.status = -1
    selectedEntity.setAttribute('movement',data)
    movementIcon.className = "fa-solid fa-play"


}