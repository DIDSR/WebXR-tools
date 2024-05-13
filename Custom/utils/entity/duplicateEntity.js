/* Handles entity duplication */

function duplicateEntity(){
    if(selectedEntity == null){
        alert('No entities added');
        return
    }
    // get entity id and increment by 1
    key = selectedEntity.getAttribute("id");
    el = document.createElement("a-entity"); /* create entity */
    if(key.includes("circle")){ /* circle exclusive */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry);
        el.setAttribute("fill",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].fill);
    } else if(key.includes("plane")){ /* plane exclusive */
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry);
        if(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.src == ""){
            drawPlaneBorder(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].widthReal,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].fill.val,hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color),el);
        }   
        el.setAttribute("fill",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].fill);
    } else if(key.includes("triangle")){ /* triangle exclusive */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry);
    } else if (key.includes("gradient")){
        el.setAttribute("id", "gradient"+gradientNum++);
        drawGradient(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.width,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].numBars,hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color),hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2.val),el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2)
    } else if (key.includes("grille")){
        el.setAttribute("id", "grille"+grilleNum++);
        drawGrille(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.width,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].numBars,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2.val,el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2)
    } else if (key.includes("checkerboard")){
        el.setAttribute("id", "checkerboard"+checkerboardNum++);
        drawCheckerboard(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].rows,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].cols,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].tileSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2.val,el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2)
    } else if (key.includes("circularDotarray")){
        el.setAttribute("id", "circularDotarray"+circularDotarrayNum++);
        drawCircularDotArray(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].arraySpacing.val,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].circles,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].dots,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].circleSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot.val,el);
        el.setAttribute("arraySpacing",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].arraySpacing);
        el.setAttribute("toggleCenterDot",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot);
    } else if (key.includes("dotarray")){
        el.setAttribute("id", "dotarray"+dotarrayNum++);
        drawDotArray(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].rows,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].cols,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].circleSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].spacing.val,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot.val,el);
        el.setAttribute("arraySpacing",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].spacing);
        el.setAttribute("toggleCenterDot",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot);
    } else if (key.includes("bullseye")){
        el.setAttribute("id", "bullseye"+bullseyeNum++);
        drawBullseye(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].ringPitch,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].numRings,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,el);
    } else if(key.includes("text")){
        el.setAttribute("id", "text"+textNum++);
        el.setAttribute("text",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].text);
    } else if(key.includes("timer")){
        el.setAttribute("id", "timer"+timerNum++);
        el.setAttribute("text",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].text);
    }

    /* sets stats */
    el.setAttribute("angle", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].angle);
    el.setAttribute("advanced", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].advanced);
    el.setAttribute("position", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].movement.origin);
    let mat = null;
    if(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material){
        mat = JSON.parse(JSON.stringify(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material))

        for(let i = 0; i < texture.options.length; i++){
            if(texture.options[i].text == mat.src){
                mat.src = "#"+texture.options[i].value;
                break;
            }
        }
    }
    
    el.setAttribute("material", mat);
    el.setAttribute("rotation", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].rotation);

    el.setAttribute("movement", JSON.parse(JSON.stringify(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].movement)));

    el.setAttribute("click-checker","");
    numAdded++;
    entityCanvas.appendChild(el); /* adds entity to scene */

    /* adds option to dropdown */
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* adds entity to list of created entities */
    pool.push(el.object3D);
    updateJSON();
    setTimeout(() => {  selectNew(el) }, 100);
}