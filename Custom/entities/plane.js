/* Contains code related to plane entity */

// creates a plane entity
// called when plane is added to the scene
function createPlane() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","plane"+planeNum++);
    el.setAttribute("geometry",{primitive: "plane", width: .125*250, height: .25*250});
    el.setAttribute("fill",{val: .125*250, isFull: true});
    el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});

    return el;
}

/* draws hollow plane */
function drawPlaneBorder(width,height,fill,color,parent){

    let newWidth = fill/2;
    let newHeight = fill/2;

    /* Creates 4 new planes that will represent each side of the plane */
    vertL = document.createElement('a-entity');
    vertR = document.createElement('a-entity');
    horizU = document.createElement('a-entity');
    horizD = document.createElement('a-entity');

    /* Sets them to desired size */
    vertL.setAttribute("geometry",{primitive: "plane", width: newWidth, height: height});
    vertR.setAttribute("geometry",{primitive: "plane", width: newWidth, height: height});
    horizU.setAttribute("geometry",{primitive: "plane", width: width, height: newHeight});
    horizD.setAttribute("geometry",{primitive: "plane", width: width, height: newHeight});
    
    /* Sets position with very slight forward offset */
    vertL.setAttribute("position",{x: (-1*width/2)+(newWidth/2), y: 0, z: -0.00001});
    vertR.setAttribute("position",{x: (width/2)-(newWidth/2), y: 0, z: -0.00001});
    horizU.setAttribute("position",{x: 0, y: (height/2)-(newHeight/2), z: -0.00001});
    horizD.setAttribute("position",{x: 0, y: (-1*height/2)+(newHeight/2), z: -0.00001});

    /* Sets color to be parent color */
    vertL.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
    vertR.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
    horizU.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
    horizD.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});

    /* Sets entity ids */
    vertL.setAttribute("id",parent.getAttribute("id")+"-0");
    vertR.setAttribute("id",parent.getAttribute("id")+"-1");
    horizU.setAttribute("id",parent.getAttribute("id")+"-2");
    horizD.setAttribute("id",parent.getAttribute("id")+"-3");

    /* Adds entities to parent plane */
    parent.appendChild(vertL);
    parent.appendChild(vertR);
    parent.appendChild(horizU);
    parent.appendChild(horizD);
    
}

// edits a plane entity
// called on plane attribute change
function editPlane(ent){
    // check for valid inputs
    if(isNaN(parseFloat($("#width").val()))){
        alert("Please enter a valid width");
        return false;
    }
    if(isNaN(parseFloat($("#height").val()))){
        alert("Please enter a valid height");
        return false;
    }
    if(parseFloat($("#height").val()) < 0){
        alert("Please enter a valid height ( >= 0 )");
        return false;
    } else if(parseFloat($("#width").val()) < 0){
        alert("Please enter a valid width ( >= 0 )");
        return false;
    } else if(parseFloat($("#fill").val()) <= 0){
        alert("Border too small (0 < border <= smallest dimension of entity)");
        return false;
    } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) <= parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
        alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)");
        return false;
    }
    
    // if no texture, draw plane border
    if (texture.value == "none"){
        ent.setAttribute("geometry",{primitive: "plane", width: 0, height: parseFloat($("#height").val())});
        let i = ent.children.length-1;
        while (i >= 0) {
            ent.children[i].parentNode.removeChild(ent.children[i]);
            i--;
        }
        drawPlaneBorder(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#fill").val()),hexToRgb($("#color").val()),ent);
    } else { // draw solid plane that will be the texture canvas
        let i = ent.children.length-1;
        while (i >= 0) {
            ent.children[i].parentNode.removeChild(ent.children[i]);
            i--;
        }
        ent.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
    }

    return true;
}