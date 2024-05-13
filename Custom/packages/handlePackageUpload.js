/* 
    Handles processes involved once a package is uploaded
*/

var defaultStr = "default"

/* if JSON is uploaded */

// gets the extension of the current file name
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }


/* loads entities from JSON to scene */
function entityLoader(fileContent,name,def,isSingle){
    let skip = false;
    // check for json file validity
    if(Object.keys(fileContent).length == 0){
        alert("Cannot parse file");
        if(isSingle){
            scene_input.value = "";
        } else {
            scene_display_input.value = ""
        }
        return;
    }
    Object.keys(fileContent).forEach(key => {
        if (!key.includes("scenes") && !key.includes("textures") &&  !key.includes("date")){
            alert("Cannot parse file");
            if(isSingle){
                scene_input.value = "";
            } else {
                scene_display_input.value = ""
            }
            skip = true;
        }
    });
    if(skip){
        return;
    }

    // check to see if proper amount of scenes were uploaded
    if(isSingle && Object.keys(fileContent['scenes']).length != 1){
        alert("Cannot parse file, more than one scene detected");
        scene_input.value = "";
        return;
    } else if(isSingle && Object.keys(fileContent['scenes']).length == 1){
        addEntitiesFromScene(fileContent['scenes'][Object.keys(fileContent['scenes'])[0]])
        updateJSON()
    } else if(!isSingle){
        // adds entities from file to scene
        Object.keys(fileContent['scenes']).forEach(key => {
            addEntitiesFromScene(fileContent['scenes'][key])
        })
        // if this scene is the default scene
        if(def){  
            let len = pattern.childElementCount
            let i = 0;
            const obj = scenes[defaultStr]
            scenes[name] = obj;
            delete scenes[defaultStr];
            while(i < len){
                if(pattern.children[i].text == defaultStr){
                    pattern.children[i].text = name
                    pattern.children[i].value = name
                }
                i++;
            }
    
            len = patternDisplay.childElementCount
            i = 0;
            while(i < len){
                if(patternDisplay.children[i].text == defaultStr){
                    patternDisplay.children[i].text = name
                    patternDisplay.children[i].value = name
                    defaultStr = name
                }
                i++;
            }
            scenes[name] = fileContent
        }
    }
    // combines textures in uploaded file and current file
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
    while(i < fileContent['textures']['textureValues'].length){
        uploadedTextures.push(fileContent['textures']['textureValues'][i].text)
        i++;
    }
    newTextures = [...new Set([...uploadedTextures,...currTextures])]
    newTextures.forEach(text => {
        var option = document.createElement("option"); 
        if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
            option.text = fileContent['textures']['textureValues'][uploadedTextures.indexOf(text)].text
            option.value = fileContent['textures']['textureValues'][uploadedTextures.indexOf(text)].val
            texture.add(option);
        }
        

    })

    // combines uploaded textures in uploaded file and current file
    newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(fileContent['textures']['uploadedTextureFormats'])])]
    tmp = {}
    newUploadedTextureFormat.forEach(texture => {
        if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
            tmp[texture] = uploadedTextureFormat[texture]
        } else {
            tmp[texture] = fileContent['textures']['uploadedTextureFormats'][texture]
        }
    });
    uploadedTextureFormat = tmp
}

/* adds entities from json to current scene */
function addEntitiesFromScene(scene){
    // go through each key in the scene
    Object.keys(scene).forEach(key => {
        // handle adding entity similar to drawing entity
        if(key.includes("sky")){
            sky.setAttribute("material",{color: scene[key].skyColor});
            colorChange = false;
            $('#skyCol').minicolors('value', scene[key].skyColor);
        } else if (key.includes("texture")){
            let i = 0;
            $("#texture").empty();
            while( i < scene[key].vals.length){
                var option = document.createElement("option"); 
                option.text = scene[key].vals[i].text;
                option.value = scene[key].vals[i].val;
                texture.add(option);
                i++;
            }
        } else {
            el = document.createElement("a-entity"); /* create entity */
            if(key.includes("circle")){ /* circle exclusive */
                el.setAttribute("id","circle"+circleNum++);
                el.setAttribute("geometry", scene[key].geometry);
                el.setAttribute("fill",scene[key].fill);
            } else if(key.includes("plane")){ /* plane exclusive */
                el.setAttribute("id","plane"+planeNum++);
                el.setAttribute("geometry", scene[key].geometry);
                if(scene[key].material.src == ""){
                    drawPlaneBorder(scene[key].widthReal,scene[key].geometry.height,scene[key].fill.val,hexToRgb(scene[key].material.color),el);
                }   
                el.setAttribute("fill",scene[key].fill);
            } else if(key.includes("triangle")){ /* triangle exclusive */
                el.setAttribute("id","triangle"+triangleNum++);
                el.setAttribute("geometry", scene[key].geometry);
            } else if (key.includes("gradient")){
                el.setAttribute("id", "gradient"+gradientNum++);
                drawGradient(scene[key].childGeometry.width,scene[key].childGeometry.height,scene[key].numBars,hexToRgb(scene[key].material.color),hexToRgb(scene[key].color2.val),el);
                el.setAttribute('color2',scene[key].color2)
            } else if (key.includes("grille")){
                el.setAttribute("id", "grille"+grilleNum++);
                drawGrille(scene[key].childGeometry.width,scene[key].childGeometry.height,scene[key].numBars,scene[key].material.color,scene[key].color2.val,el);
                el.setAttribute('color2',scene[key].color2)
            } else if (key.includes("checkerboard")){
                el.setAttribute("id", "checkerboard"+checkerboardNum++);
                drawCheckerboard(scene[key].rows,scene[key].cols,scene[key].tileSize,scene[key].material.color,scene[key].color2.val,el);
                el.setAttribute('color2',scene[key].color2)
            } else if (key.includes("circularDotarray")){
                el.setAttribute("id", "circularDotarray"+circularDotarrayNum++);
                drawCircularDotArray(scene[key].arraySpacing.val,scene[key].circles,scene[key].dots,scene[key].circleSize,scene[key].material.color,scene[key].toggleCenterDot.val,el);
                el.setAttribute("arraySpacing",scene[key].arraySpacing);
                el.setAttribute('toggleCenterDot',scene[key].toggleCenterDot);
            } else if (key.includes("dotarray")){
                el.setAttribute("id", "dotarray"+dotarrayNum++);
                drawDotArray(scene[key].rows,scene[key].cols,scene[key].circleSize,scene[key].spacing.val,scene[key].material.color,scene[key].toggleCenterDot.val,el);
                el.setAttribute('arraySpacing',scene[key].spacing);
                el.setAttribute('toggleCenterDot',scene[key].toggleCenterDot);
            }  else if (key.includes("bullseye")){
                el.setAttribute("id", "bullseye"+bullseyeNum++);
                drawBullseye(scene[key].ringPitch,scene[key].numRings,scene[key].material.color,el);
            } else if (key.includes("text")){
                el.setAttribute("id", "text"+textNum++);
                el.setAttribute("text",scene[key].text)
            } else if (key.includes("timer")){
                el.setAttribute("id", "timer"+timerNum++);
                el.setAttribute("text",scene[key].text)
            }
            /* sets stats */
            el.setAttribute("angle", scene[key].angle);
            el.setAttribute("advanced", scene[key].advanced);
            el.setAttribute("position", {x: scene[key].position.x, y: scene[key].position.y, z: scene[key].position.z});
            let mat = null;
            if(scene[key].material){
                mat = JSON.parse(JSON.stringify(scene[key].material))

                for(let i = 0; i < texture.options.length; i++){
                    if(texture.options[i].text == mat.src){
                        mat.src = "#"+texture.options[i].value;
                        break;
                    }
                }
            }
            
            
            el.setAttribute("material", mat);
            el.setAttribute("rotation", scene[key].rotation);
            el.setAttribute("movement",JSON.parse(JSON.stringify(scene[key].movement)))
            el.setAttribute("click-checker","");
            numAdded++;
            entityCanvas.appendChild(el); /* adds entity to scene */


            /* adds option to dropdown */
            var option = document.createElement("option");
            option.text = el.getAttribute("id");
            entitySelector.add(option);

            els.push(el);/* adds entity to list of created entities */
            pool.push(el.object3D);
        }   
    })
}
