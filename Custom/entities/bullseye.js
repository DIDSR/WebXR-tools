/* Contains code related to bullseye entity */

// creates a bullseye entity
// called when entity is added to the scene
function createBullseye(){
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","bullseye"+bullseyeNum++);
    drawBullseye(5,5,"#"+R+G+B,el);
    el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});

    return el;
}

// draws a bullseye entity using aframe rings
// called whenever an entity needs to be drawn or redrawn
function drawBullseye(pitch,rings,color1,parent){
    let r = 1;
    let middleDot = document.createElement("a-entity");
    middleDot.setAttribute("id",parent.id+"-center");
    middleDot.setAttribute("geometry",{primitive: "ring", radiusOuter: pitch/2, radiusInner: 0, segmentsTheta: 100});
    middleDot.setAttribute("position",{x: 0, y: 0, z: 0});
    middleDot.setAttribute("material",{shader: "flat", color: color1});
    parent.appendChild(middleDot);
    while(r <= rings){
        let elChild = document.createElement("a-entity");
        elChild.setAttribute("id",parent.id+"-"+"ring-"+r);
        elChild.setAttribute("geometry",{primitive: "ring", radiusOuter: (pitch*2)*r+(pitch/2), radiusInner: (pitch*2)*r-(pitch/2), segmentsTheta: 100});
        elChild.setAttribute("position",{x: 0, y: 0, z: 0});
        elChild.setAttribute("material",{shader: "flat", color: color1});
        parent.append(elChild);
        r++;
    }   
}

// edits a bullseye entity
// called on bullseye attribute change
function editBullseye(ent) {
    // check for valid inputs
    if(isNaN(parseFloat($("#numRingsIn").val()))){
        alert("Please enter a valid number of rings");
        return false;
    }
    if(isNaN(parseFloat($("#ringPitchIn").val()))){
        alert("Please enter a valid ring thickness");
        return false;
    }
    if(parseFloat($("#numRingsIn").val()) <= 0 || parseFloat($("#numRingsIn").val()) % 1 != 0){
        alert("Please enter a valid number of rings ( > 0 and a whole number)");
        return false;
    } else if(parseFloat($("#ringPitchIn").val()) < 0){
        alert("Please enter a ring thickness ( >= 0 )");
        return false;
    }
    // remove rings
    let i = ent.children.length-1;
    while (i >= 0) {
        ent.children[i].parentNode.removeChild(ent.children[i]);
        i--;
    }
    // draw new rings
    drawBullseye(parseFloat($("#ringPitchIn").val()),parseFloat($("#numRingsIn").val()),$("#color").val(),ent);
    
    return true;
}