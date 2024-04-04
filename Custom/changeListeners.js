/* 
    Handles user input

*/

/* If the textbox for sky color is changed */
$('#skyCol').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        sky.setAttribute("material",{color: $("#skyCol").val()});
        if(colorChange){
            updateJSON();
        }
        colorChange = true
    },
});

/* If the textbox for x value is changed */
$("#x").change(function() {
    editEntity();
  });

/* If the textbox for y value is changed */
$("#y").change(function() {
    editEntity();
  });

/* If the textbox for z value is changed */
$("#z").change(function() {
    editEntity();
  });

/* If the textbox for endX value is changed */
$("#startX").change(function() {
    editEntity();
  });

/* If the textbox for endY value is changed */
$("#startY").change(function() {
    editEntity();
  });

/* If the textbox for endZ value is changed */
$("#startZ").change(function() {
    editEntity();
  });

/* If the textbox for endX value is changed */
$("#endX").change(function() {
    editEntity();
  });

/* If the textbox for endY value is changed */
$("#endY").change(function() {
    editEntity();
  });

/* If the textbox for endZ value is changed */
$("#endZ").change(function() {
    editEntity();
  });

  /* If the textbox for endX value is changed */
$("#speedIn").change(function() {
    editEntity();
  });

/* If the textbox for endY value is changed */
$("#accelerationIn").change(function() {
    editEntity();
  });

/* If the textbox for endZ value is changed */
/*$("#key").change(function(e) {
    if(keyBind.value.length > 1 || keyBind.value == 'm'){
        alert('Invalid key, please choose a key other than \'m\' or leave this blank.')
        return
    }
    i = 0;
    while(i < entityCanvas.children.length){
        if(entityCanvas.children[i] == selectedEntity){
            break;
        }
        i++;
    }
    
    if(movementKeyBinds[keyBind.value] == null){
        movementKeyBinds[keyBind.value] = []
    }
    movementKeyBinds[keyBind.value].push(i);
    mov = selectedEntity.getAttribute('mov')
    if(mov.keyBind != ''){
        movementKeyBinds[mov.keyBind].splice(movementKeyBinds[mov.keyBind].indexOf(i), 1);
    }
    mov.keyBind = keyBind.value
  });*/

/* If the textbox for endZ value is changed */
$("#movementTypeIn").change(function() {
    editEntity();
  });

/* If the textbox for color value is changed */
$('#color').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

$('#color2').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

/* If the textbox for texture value is changed */
$("#texture").change(function() {
    if(texture.value == "none"){
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: ""});
        fillIn.style.display = "block";
        editEntity()
    } else {
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: "#"+texture.value});
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        if(typeof selectedEntity.getAttribute("material").src == "object"){
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(selectedEntity.getAttribute("material").src.naturalWidth/selectedEntity.getAttribute("material").src.naturalHeight)*250, height: .5*250});
        } else {
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(uploadedTextureFormat[texture.options[texture.selectedIndex].text].width/uploadedTextureFormat[texture.options[texture.selectedIndex].text].height)*250, height: .5*250});
        }
        if(selectedEntity.getAttribute("fill").isFull){
            if(selectedEntity.getAttribute("geometry").width > selectedEntity.getAttribute("geometry").height){
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").height, isFull: true});
            } else {
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").width, isFull: true});
            }
        }
        width.value = selectedEntity.getAttribute("geometry").width;
        height.value = selectedEntity.getAttribute("geometry").height;
        fill.value = selectedEntity.getAttribute("fill").val;
        fillIn.style.display = "none";
        updateJSON();
    }
    

  });
  

/* If the textbox for x value is changed */
$("#texture-input").change(function() {
    let i = 0;
    var j = 0;
    while(i < texture_input.files.length){
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploaded_image = reader.result;
        });
        
        var name = this.files[i].name;
        reader.readAsDataURL(this.files[i]);
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();
    
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            
            //Validate the File Height and Width.
            image.onload = function () {
                let k = 0;
                let skip = false;
                while(k < texture.options.length){
                    if(texture.options[k].text == texture_input.files[j].name){
                        skip = true;
                    }
                    k++;
                }
                if(!skip){
                    var height = this.height;
                    var width = this.width;
                    uploadedTextureFormat[texture_input.files[j].name] = {width: width, height: height};
                    var option = document.createElement("option"); 
                    option.text = texture_input.files[j++].name;
                    option.value = `url(${this.src})`;
                    texture.add(option);
                }
            };
        }
        i++;
    }

    /*editEntity();*/
  });

/* If the textbox for x value is changed */
$("#fill").change(function() {
    if(selectedEntity.id.includes("plane")){
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) <= parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
            alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else if(parseFloat($("#fill").val()) == parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    } else {
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if(parseFloat($("#radius").val()) < parseFloat($("#fill").val())){
            alert("Border too large, will change size of entity (0 < border <= radius)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#radius").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    }
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationZ").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationY").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationX").change(function() {
    editEntity();
  });

/* If the textbox for radius value is changed */
$("#radius").change(function() {
    if(parseFloat($("#fill").val()) > parseFloat($("#radius").val()) || selectedEntity.getAttribute("fill").isFull){
        fill.value = parseFloat($("#radius").val());
        selectedEntity.setAttribute("fill",{val: parseFloat($("#radius").val()), isFull: true});
    }
    editEntity();
  });

/* If the textbox for width value is changed */
$("#width").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())) || (parseFloat($("#height").val()) > parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#width").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#width").val()), isFull: true});
        }
    }
    
    
    editEntity();
  });

/* If the textbox for height value is changed */
$("#height").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())) || (parseFloat($("#height").val()) < parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#height").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#height").val()), isFull: true});
        }
    }
    editEntity();
  });

/* If the textbox for vax value is changed */
$("#vax").change(function() {
    editEntity();
  });

/* If the textbox for vay value is changed */
$("#vay").change(function() {
    editEntity();
  });

/* If the textbox for vbx value is changed */
$("#vbx").change(function() {
    editEntity();
  });

/* If the textbox for vby value is changed */
$("#vby").change(function() {
    editEntity();
  });

/* If the textbox for vcx value is changed */
$("#vcx").change(function() {
    editEntity();
  });

/* If the textbox for vcy value is changed */
$("#vcy").change(function() {
    editEntity();
  });

/* If the textbox for numbers of bars value is changed */
$("#numBarsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of rows is changed */
$("#rowsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of cols is changed */
$("#colsIn").change(function() {
    editEntity();
  });

/* If the textbox for size of tiles is changed */
$("#tileSizeIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#circleSizeIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#spacingIn").change(function() {
    editEntity();
  });

/* If the textbox for size of tiles is changed */
$("#numDotsIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#numCirclesIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#arraySpacingIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#numRingsIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#ringSpacingIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#ringThicknessIn").change(function() {
    editEntity();
  });

$("#toggleCenterDotIn").change(function() {
    editEntity();
});

$("#ringPitchIn").change(function() {
    editEntity();
});

$("#text").change(function() {
    editEntity();
});

/* sends entity back or forward one layer */
/*function sendBack(isback){
    let tmp = null;
    let selected = els.indexOf(selectedEntity); /* finds layer number of current entity */
    /* checks if back or forward */
    /*if(isback){*/ /* if back */
        /*if (selected != 0) {*/ /* if it is not on layer 0 */
            /* swap z values */
            /*tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected-1].getAttribute("position").z;
            els[selected-1].getAttribute("position").z = tmp;*/

            /* swap position in el arr (this preserves the layering order) */    
            /*tmp = els[selected];
            els[selected] = els[selected-1];
            els[selected-1] = tmp;
        }*/
    /*} else {*/ /* if forward */
        /*if (selected != els.length-1) {*/ /* if not the last layer */
            /* swap z values */
            /*tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected+1].getAttribute("position").z;
            els[selected+1].getAttribute("position").z = tmp;*/

            /* swap position in el arr (this preserves the layering order) */
            /*tmp = els[selected];
            els[selected] = els[selected+1];
            els[selected+1] = tmp;
        }
    }
}*/

/* Raycasting with orthographic camera */
/*var raycaster = new THREE.Raycaster();
raycaster.layers.set(0);
window.addEventListener("pointerup", function(e) {
    var screenPos = new THREE.Vector2();
    
    screenPos.x = (e.clientX / window.innerWidth) * 2 - 1;
    screenPos.y = - (e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(screenPos, scene.camera);

    var rays = raycaster.intersectObjects(pool, true);
    let i = rays.length;
    if(i > 0){
        currMin = rays[0].distance;
        selected = rays[0].object.el;
        while (i > 0) {
            i--;
            if(rays[i].distance < currMin){
                currMin = rays[i].distance;
                selected = rays[i].object.el;
            }
        }
        selected = document.getElementById(selected.id.split("-")[0]);
        console.log(selected);
        selectNew(selected);
    }
});*/


finished = false
var ind = 0
var block = false
var fileName;
var myLoop;
var test;
/* if JSON is uploaded */
scene_display_input.addEventListener("change", function() {

    myLoop = slowLoop(scene_display_input.files, (itm, idx, cb)=>{
        test = itm;
        setTimeout(()=>{
            const reader = new FileReader();
            /*reader.addEventListener("load", () => {

                fileContent = JSON.parse(reader.result);
                scenes[fileName] = fileContent['scenes']
                textures = fileContent['textures']['textureValues']
                uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']
                cb();
            });*/

            reader.onload = function() {
                fileContent = JSON.parse(reader.result);
                names[fileName] = ""
                for (const [name, value] of Object.entries(fileContent['scenes'])) {
                    const re = /^[a-zA-Z0-9-_ ]+( \([0-9]+\))?$/
                    if(!re.test(name)){
                        alert('Pattern name is invalid. '+name+' Limit names to only alphanumerics, -, _, or spaces.')
                        delete names[fileName]
                        return
                    }
                    currName = name.split(' (')[0];
                    if(names[fileName][currName]){
                        currName = currName + ' ('+names[fileName][currName]+')'
                        names[fileName][name.split(' (')[0]] = names[fileName][name.split(' (')[0]] + 1
                    } else {
                        names[fileName][currName] = 1
                    }
                  }
                packageSelect.options.add(new Option(fileName,fileName))
                scenes[fileName] = fileContent['scenes']
                names[fileName] = {}
                /*Object.keys(fileContent['scenes']).forEach( currName => {
                    if(names[fileName] == null){
                        names[fileName][currName] = names[fileName][currName] + 1
                    } else {
                        names[fileName][currName] = 1
                    }
                });*/
                textures = fileContent['textures']['textureValues']
                uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']
                cb();
            };

            reader.onabort = function() {
                console.log('aborted')
                return false;
            };
            reader.addEventListener("error", (event) => {
                console.log('error:')
                console.log(event.currentTarget.error)
            });

            if(itm.name.split(".")[1] != "JSON"){
                alert("Invalid file type");
                scene_display_input.value = ""
                return false;
            }
            if(Object.keys(scenes).indexOf(itm.name.split(".")[0]) != -1){
                itm.name = itm.name.split(".")[0]+"1"+itm.name.split(".")[1]
                fileName = itm.name;

            }
            fileName = itm.name.split(".")[0];
            const re = /^[a-zA-Z0-9-_ ]+$/
            if(!re.test(itm.name.split(".")[0])){
                alert('Package name is invalid. '+fileName+' Limit names to only alphanumerics, -, _, or spaces.')
                return false;
            }
            if(scenes[fileName] != null){
                alert('A package with this name already exists');
                return false;
            }
            reader.readAsText(itm);
            console.log(fileName)
            
            
            // call cb when finished
            
        }, 100);
        
    });
    
    myLoop.catch(() => {
        //console.log('error')
    })
    // when it's done....
    myLoop.then(()=>{
        //patternList.innerHTML = ''
        console.log('then');
        packages[fileName] = ''
        let arr = Object.keys(scenes)
        let len = arr.length
        let i = 0;
        let len2 = texture.options.length;
        currTextures = []
        while(i < len2){
            currTextures.push(texture.options[i].text)
            i++;
        }
        i = 0;
        uploadedTextures = []
        while(i < textures.length){
            uploadedTextures.push(textures[i].text)
            i++;
        }
        newTextures = [...new Set([...uploadedTextures,...currTextures])]
        newTextures.forEach(text => {
            var option = document.createElement("option"); 
            if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
                option.text = textures[uploadedTextures.indexOf(text)].text
                option.value = textures[uploadedTextures.indexOf(text)].val
                texture.add(option);
            }
            

        })

    
        newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(uploadedTextureFormats)])]
        tmp = {}
        newUploadedTextureFormat.forEach(texture => {
            if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
                tmp[texture] = uploadedTextureFormat[texture]
            } else {
                tmp[texture] = uploadedTextureFormats[texture]
            }
        });
        uploadedTextureFormat = tmp
        flag = false;
        i = 0;
    
        
        packageSelect.value = fileName
        changePackage()
        /*i = 0;
        while(i < len){
            var toggle_button = '<p><input type="checkbox" id="'+arr[i]+'" name="'+arr[i]+'" onclick="handlePatternSelect(this)"'
            let res = Array.from(patternDisplay.children).reduce(function(acc, x) {
                acc = acc || x.text == arr[i]
                return acc;
              }, false);
            if(res == true){
                toggle_button += 'checked/>'
            
            } else {
                toggle_button += '/>'
            }
            toggle_button += '<label for="'+arr[i]+'">'+arr[i]+'</label></p>';
            $('#patternList').append(toggle_button)
            //pattern.options.add(new Option(arr[i], arr[i]))
            i++
        }*/

    
    });

/**
 * Execute the loopBody function once for each item in the items array, 
 * waiting for the done function (which is passed into the loopBody function)
 * to be called before proceeding to the next item in the array.
 * @param {Array} items - The array of items to iterate through
 * @param {Function} loopBody - A function to execute on each item in the array.
 *		This function is passed 3 arguments - 
 *			1. The item in the current iteration,
 *			2. The index of the item in the array,
 *			3. A function to be called when the iteration may continue.
 * @returns {Promise} - A promise that is resolved when all the items in the 
 *		in the array have been iterated through.
 */

 // code taken from here https://stackoverflow.com/questions/48767979/javascript-how-to-wait-event-listener-end-to-next-iteration
function slowLoop(items, loopBody) {
	return new Promise(f => {
		done = arguments[2] || f;
		idx = arguments[3] || 0;
		let cb = items[idx + 1] ? () => slowLoop(items, loopBody, done, idx + 1) : done;
		loopBody(items[idx], idx, cb);
	});
}
    
});

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
    } else if(movementKeyBinds[e.key]) {
        if(document.activeElement == keyBind){
            return
        }
        for(const i of movementKeyBinds[e.key]){
            console.log('i')
            if(entityCanvas.children[i].getAttribute('mov').status != 0){
                stopMovement(entityCanvas.children[i])
            } else {
                if((entityCanvas.children[i].getAttribute('position').x == entityCanvas.children[i].getAttribute('mov').startPoint.x && entityCanvas.children[i].getAttribute('position').y == entityCanvas.children[i].getAttribute('mov').startPoint.y && entityCanvas.children[i].getAttribute('position').z == entityCanvas.children[i].getAttribute('mov').startPoint.z) && (entityCanvas.children[i].getAttribute('rotation').x == entityCanvas.children[i].getAttribute('mov').startRotation.x && entityCanvas.children[i].getAttribute('rotation').y == entityCanvas.children[i].getAttribute('mov').startRotation.y && entityCanvas.children[i].getAttribute('rotation').z == entityCanvas.children[i].getAttribute('mov').startRotation.z)){
                    toggleMovement(i)
                } else {
                    mov = entityCanvas.children[i].getAttribute('mov')
                    entityCanvas.children[i].setAttribute('position',mov.startPoint)
                    entityCanvas.children[i].setAttribute('rotation',mov.startRotation)
                }
                
            }
        }
    }



  });  
  
