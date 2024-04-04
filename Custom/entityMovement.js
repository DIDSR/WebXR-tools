movementKeyBinds = {}
function calcNextPoint(p1,p2,covered){
    if(p1.r){
        thetaDelta = p2.theta-p1.theta
        yDelta = p2.y-p1.y
        newPoint = {theta: p1.theta+(thetaDelta*covered), y: p1.y+(yDelta*covered), r: p1.r}
    } else {
        xDelta = p2.x-p1.x
        yDelta = p2.y-p1.y
        zDelta = p2.z-p1.z
        newPoint = {x: p1.x+(xDelta*covered), y: p1.y+(yDelta*covered), z: p1.z+(zDelta*covered)}
    }


    return newPoint;
}

function toggleMovement(entPos){
    // Teleport
    let ent = entityCanvas.children[entPos];
    if(ent.getAttribute('mov').type == 'Teleport'){
        toggle = false;    
        var tmp = setInterval((entPos) => {
            let ent = entityCanvas.children[entPos];
            if(ent.getAttribute('mov').endPoint.r == null){
                if(toggle == false){
                    ent.setAttribute('position',ent.getAttribute('mov').endPoint)
                    //ent.setAttribute("rotation", {x: 0, y: THETAX, z: 0}); // set rotation to be 0
                } else {
                    ent.setAttribute('position',ent.getAttribute('mov').startPoint)
                }
            } else {
                if(toggle == false){
                    ent.setAttribute('position',{x: -ent.getAttribute('mov').endPoint.r*Math.sin((ent.getAttribute('mov').endPoint.theta*Math.PI)/180), y: ent.getAttribute('mov').endPoint.y, z: ent.getAttribute('mov').endPoint.r * Math.cos((ent.getAttribute('mov').endPoint.theta*Math.PI)/180)})
                    ent.setAttribute("rotation", {x: 0, y: -ent.getAttribute('mov').endPoint.theta, z: 0}); // set rotation to be 0
                    //ent.setAttribute("rotation", {x: 0, y: THETAX, z: 0}); // set rotation to be 0
                } else {
                    ent.setAttribute('position',ent.getAttribute('mov').startPoint)
                    ent.setAttribute("rotation", {x: 0, y: ent.getAttribute('angle').x, z: 0}); // set rotation to be 0
                }
            }
            
            toggle = !toggle;
        },ent.getAttribute('mov').speed, entPos)
        mov = ent.getAttribute('mov')
        mov.status = tmp
        ent.setAttribute('mov',mov)
        return
    }

    
    if(ent.getAttribute('mov').endPoint.r == null){
        p1 = ent.getAttribute('mov').startPoint
        xDelta = Math.abs(ent.getAttribute('mov').endPoint.x-p1.x)
        yDelta = Math.abs(ent.getAttribute('mov').endPoint.y-p1.y)
        zDelta = Math.abs(ent.getAttribute('mov').endPoint.z-p1.z)
        d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
        steps = d/ent.getAttribute('mov').speed*60
        
    } else {
        p1 = {r: ent.getAttribute('angle').z, theta: -ent.getAttribute('angle').x, y: ent.getAttribute('mov').startPoint.y}
        thetaDelta = (ent.getAttribute('mov').endPoint.theta-p1.theta)
        arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(ent.getAttribute('mov').endPoint.r);
        yDelta = Math.abs(ent.getAttribute('mov').endPoint.y-p1.y)
        d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
        steps = d/ent.getAttribute('mov').speed*60
    }
    console.log(d)
    var prev = p1;
    var num = 1;
    var time = 1;
    var toggle = true;
    var endPoint = ent.getAttribute('mov').endPoint
    var initialVelocity = ent.getAttribute('mov').speed
    var entAcceleration = ent.getAttribute('mov').acceleration
    var tmp = setInterval((entPos,p1,endPoint) => {
        let ent = entityCanvas.children[entPos]
        distanceCovered = (initialVelocity)*(num*(.017)) + 0.5*entAcceleration*((num*(.017))*(num*(.017)))
        amtCovered = (distanceCovered/d)
        if(amtCovered > 1){
            if(ent.getAttribute('mov').type == 'Rubberband'){
                num = 0;
                if(toggle){
                    //endPoint = Object.assign({},p1)
                    //p1 = ent.getAttribute('mov').endPoint
                    toggle = false;
                } else {
                    //p1 = Object.assign({},endPoint)
                    //endPoint = ent.getAttribute('mov').endPoint
                    toggle = true;
                }
                
                initialVelocity = initialVelocity + entAcceleration*time*(.017)
                distanceCovered = (initialVelocity)*(num*(.017)) + 0.5*entAcceleration*((num*(.017))*(num*(.017)))

                amtCovered = (distanceCovered/d)
                
            } else {
                num = 0;
            }
        }

        if(!toggle){
            res = calcNextPoint(endPoint,p1,amtCovered)
        } else {
            res = calcNextPoint(p1,endPoint,amtCovered)
        }
        

        if(ent.getAttribute('advanced').val){
            ent.setAttribute('position',{x: res.x, y: res.y, z: res.z})
            //ent.setAttribute("rotation", {x: 0, y: THETAX, z: 0}); // set rotation to be 0
        } else {
            ent.setAttribute('position',{x: -res.r*Math.sin((res.theta*Math.PI)/180), y: res.y, z: res.r * Math.cos((res.theta*Math.PI)/180)})
            ent.setAttribute("rotation", {x: 0, y: -res.theta, z: 0}); // set rotation to be 0
        }
        /*if(toggle){
            num++
        } else {
            num--
        }*/
        num++;
        time++;
    },17,entPos,p1,endPoint)
    mov = ent.getAttribute('mov')
    mov.status = tmp
    ent.setAttribute('mov',mov)
}

function stopMovement(el){
    mov = el.getAttribute('movement')
    clearInterval(mov.status)
    mov.status = -1
    el.setAttribute('movement',mov)
    movementIcon.className = "fa-solid fa-play";
}

/*function handleMovementToggle(e){
    e.stopPropagation()
    if(selectedEntity.getAttribute('mov').type == 'None'){
        return
    }
    i = 0;
    while(i < entityCanvas.children.length){
        if(entityCanvas.children[i] == selectedEntity){
            break;
        }
        i++;
    }
    if(movementIcon.className == "fa-solid fa-play"){
        toggleMovement(i);
        movementIcon.className = "fa-solid fa-pause"
    } else {
        stopMovement(selectedEntity);
        movementIcon.className = "fa-solid fa-play"
    }
}*/


  function stopAllMovement(){
    let i = 0;
    while(i < entityCanvas.children.length){
        mov = entityCanvas.children[i].getAttribute('movement')
        mov.status = -1;
        i++;
    }
  }

  function startAllMovement(){
    let i = 0;
    while(i < entityCanvas.children.length){
        mov = entityCanvas.children[i].getAttribute('mov')
        if(mov.type != 'None'){
            toggleMovement(i)
        }
        i++;
    }
  }
  
  function processConsecutiveMovement(entPos, movementArr){
    let ent = entityCanvas.children[entPos];
    let i = 0;
    // movementArr [[startP,endP,speed,acc,type]...]

    if(movementArr[i][1].r == null){
        p1 = movementArr[i][0]
        xDelta = Math.abs(movementArr[i][1].x-p1.x)
        yDelta = Math.abs(movementArr[i][1].y-p1.y)
        zDelta = Math.abs(movementArr[i][1].z-p1.z)
        d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
        steps = d/movementArr[i][2]*60
    
    } else {
        // angle, angle, mov
        p1 = movementArr[i][0]
        thetaDelta = (movementArr[i][1].theta-p1.theta)
        arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(movementArr[i][1].r);
        yDelta = Math.abs(movementArr[i][1].y-p1.y)
        d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
        steps = d/movementArr[i][2]*60
    }
    console.log(d)
    var prev = p1;
    var num = 1;
    var time = 1;
    var toggle = true;
    var endPoint = movementArr[i][1]
    var initialVelocity = movementArr[i][2]
    var entAcceleration = movementArr[i][3]
    var tmp = setInterval((entPos,p1,endPoint, movementArr, i) => {
        console.log(movementArr)
        let ent = entityCanvas.children[entPos]
        distanceCovered = (initialVelocity)*(num*(.017)) + 0.5*entAcceleration*((num*(.017))*(num*(.017)))
        amtCovered = (distanceCovered/d)
        if(amtCovered > 1){
            i++;
            if(i > movementArr.length){
                clearInterval(tmp)
            }
            p1 = movementArr[i][0]
            num = 1
            if(movementArr[i][1].r == null){
                p1 = movementArr[i][0]
                xDelta = Math.abs(movementArr[i][1].x-p1.x)
                yDelta = Math.abs(movementArr[i][1].y-p1.y)
                zDelta = Math.abs(movementArr[i][1].z-p1.z)
                d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
                steps = d/movementArr[i][2]*60
            
            } else {
                // angle, angle, mov
                p1 = {r: movementArr[i][0].z, theta: -movementArr[i][0].x, y: movementArr[i][0].y}
                thetaDelta = (movementArr[i][1].theta-p1.theta)
                arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(movementArr[i][1].r);
                yDelta = Math.abs(movementArr[i][1].y-p1.y)
                d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
                steps = d/movementArr[i][2]*60
            }
            endPoint = movementArr[i][1]
            initialVelocity = movementArr[i][2]
            entAcceleration = movementArr[i][3]
            distanceCovered = (initialVelocity)*(num*(.017)) + 0.5*entAcceleration*((num*(.017))*(num*(.017)))
            amtCovered = (distanceCovered/d)

        }

        res = calcNextPoint(endPoint,p1,amtCovered)
        

        if(ent.getAttribute('advanced').val){
            ent.setAttribute('position',{x: res.x, y: res.y, z: res.z})
            //ent.setAttribute("rotation", {x: 0, y: THETAX, z: 0}); // set rotation to be 0
        } else {
            ent.setAttribute('position',{x: -res.r*Math.sin((res.theta*Math.PI)/180), y: res.y, z: res.r * Math.cos((res.theta*Math.PI)/180)})
            ent.setAttribute("rotation", {x: 0, y: -res.theta, z: 0}); // set rotation to be 0
        }
        /*if(toggle){
            num++
        } else {
            num--
        }*/
        num++;
        time++;
    },17,entPos,p1,endPoint)
    mov = ent.getAttribute('mov')
    mov.status = tmp
    ent.setAttribute('mov',mov)

  }

