/* Contains code that handles keyboard input */

keysPressed = {ctrl: false, x: false, c: false, v: false, i: false, m: false, r: false}

/* listens for key presses to change pattern */
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp"){
        if( boolAddEdit == false  || block == false){
            if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
                return
            }
            if(parseInt(patternList.getAttribute('selectedIndex')) == 0){
                patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
            } else {
                patternList.children[parseInt(patternList.getAttribute('selectedIndex'))-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
            }
            
        }
    } else if (e.code === "ArrowDown"){
        if( boolAddEdit == false  || block == false){
            if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
                return
            }
            if(parseInt(patternList.getAttribute('selectedIndex')) == patternList.children.length-1){
                patternList.children[0].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
            } else {
                patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
            }
            
        }
    } else if (e.key === "Control"){
        keysPressed["ctrl"] = false;
    } else if(e.code === "KeyC"){
        keysPressed["c"] = false;
    } else if(e.code === "KeyX"){
        keysPressed["x"] = false;
    } else if(e.code === "KeyV"){
        keysPressed["v"] = false;
    } else if(e.code === "KeyI"){
        keysPressed["i"] = false;
    } else if(e.code === "KeyM"){
        keysPressed["m"] = false;
    }  else if(e.code === "KeyR"){
        keysPressed["r"] = false;
    }
  });

/* listens for key presses to change pattern */
document.addEventListener('keydown', (e) => {
    if (e.key === "Control"){
        keysPressed["ctrl"] = true;
        if(keysPressed["c"]){
            // copy
            copyPattern();
        } else if(keysPressed["x"]){
            // cut
            cutPattern();

        } else if(keysPressed["v"]){
            // paste
            pastePattern();
        } else if(keysPressed["i"]){
            document.querySelector("#debug").style.display == 'block' ? document.querySelector("#debug").style.display = 'none' : document.querySelector("#debug").style.display = 'block'
        }
    } else if(e.code === "KeyC"){
        keysPressed["c"] = true;
        if(keysPressed["ctrl"]){
            // copy
            copyPattern();
        }
    } else if(e.code === "KeyX"){
        keysPressed["x"] = true;
        if(keysPressed["ctrl"]){
            // cut
            cutPattern();
        }
    } else if(e.code === "KeyV"){
        keysPressed["v"] = true;
        if(keysPressed["ctrl"]){
            // paste
            pastePattern();
        }
    } else if(e.code === "KeyI"){
        keysPressed["i"] = true;
        if(keysPressed["ctrl"]){
            // paste
            document.querySelector("#debug").style.display == 'block' ? document.querySelector("#debug").style.display = 'none' : document.querySelector("#debug").style.display = 'block'
        }
    } else if(e.code === "KeyM"){
        keysPressed['m'] = true;
        let i = 0;
        while(i < entityCanvas.children.length){
            mov = entityCanvas.children[i].getAttribute('mov')
            if(mov.status != 0){
                break;
            }
            i++;
        }
        if(i != entityCanvas.children.length){
            stopAllMovement()
        } else {
            let i = 0;
            sum = 0;
            while(i < entityCanvas.children.length){
                if((entityCanvas.children[i].getAttribute('position').x == entityCanvas.children[i].getAttribute('mov').startPoint.x && entityCanvas.children[i].getAttribute('position').y == entityCanvas.children[i].getAttribute('mov').startPoint.y && entityCanvas.children[i].getAttribute('position').z == entityCanvas.children[i].getAttribute('mov').startPoint.z) && (entityCanvas.children[i].getAttribute('rotation').x == entityCanvas.children[i].getAttribute('mov').startRotation.x && entityCanvas.children[i].getAttribute('rotation').y == entityCanvas.children[i].getAttribute('mov').startRotation.y && entityCanvas.children[i].getAttribute('rotation').z == entityCanvas.children[i].getAttribute('mov').startRotation.z)){
                    sum++;
                }
                i++;
            }
            if(sum != i){
                let i = 0;
                while(i < entityCanvas.children.length){
                    mov = entityCanvas.children[i].getAttribute('mov')
                    entityCanvas.children[i].setAttribute('position',mov.startPoint)
                    entityCanvas.children[i].setAttribute('rotation',mov.startRotation)
                    i++;
                }
            } else {
                startAllMovement()
            }
        }
    }
  });  
