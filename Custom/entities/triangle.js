/* Contains code related to triangle entity
   No draw function because only one entity
*/

// creates a triangle entity
// called when entity is added to the scene
function createTriangle() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","triangle"+triangleNum++);
    el.setAttribute("geometry",{primitive: "triangle", vertexA: {x: 0, y: 0.1875*125, z: 0}, vertexB: {x: -0.25*125, y: -0.25*125, z: 0}, vertexC: {x: 0.25*125, y: -0.25*125, z: 0}});
    el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});

    return el;
}

// edits triangle entity
// called when triangle attribute is changed
function editTriangle(ent) {
    // check for valid inputs
    if(isNaN(parseFloat($("#vax").val()))){
        alert("Please enter a valid position");
        return false;
    }
    if(isNaN(parseFloat($("#vay").val()))){
        alert("Please enter a valid position");
        return false;
    }
    if(isNaN(parseFloat($("#vbx").val()))){
        alert("Please enter a valid position");
        return false;
    }
    if(isNaN(parseFloat($("#vby").val()))){
        alert("Please enter a valid position");
        return false;
    }
    if(isNaN(parseFloat($("#vcx").val()))){
        alert("Please enter a valid position");
        return false;
    }
    if(isNaN(parseFloat($("#vcy").val()))){
        alert("Please enter a valid position");
        return false;
    }
    // update stats
    ent.setAttribute("geometry",{primitive: "triangle", vertexA: {x: parseFloat($("#vax").val()), y: parseFloat($("#vay").val()), z: 0},
        vertexB: {x: parseFloat($("#vbx").val()), y: parseFloat($("#vby").val()), z: 0}, vertexC: {x: parseFloat($("#vcx").val()), y: parseFloat($("#vcy").val()), z: 0}});

    return true;
}