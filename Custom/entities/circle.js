/* Contains code related to circle entity

    No draw function because it only consists of one entity
*/

// creates a circle entity
// called when entity is added to the scene
function createCircle() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","circle"+circleNum++);
    el.setAttribute("geometry",{primitive: "ring", radiusOuter: 0.125*250, radiusInner: 0, segmentsTheta: 100});
    el.setAttribute("fill",{val: .125*250, isFull: true});
    el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});

    return el;
}

// edits a circle entity
// called on circle attribute change
function editCircle(ent) {
    /* check for valid inputs */
    if(isNaN(parseFloat($("#radius").val()))){
        alert("Please enter a valid radius");
        return false;
    } else if(parseFloat($("#radius").val()) < 0){
        alert("Please enter a valid radius");
        return false;
    } else if(parseFloat($("#fill").val()) <= 0){
        alert("Border too small (0 < border <= smallest dimension of entity)");
        return false;
    } else if(parseFloat($("#radius").val()) < parseFloat($("#fill").val())){
        alert("Border too large, will change size of entity (0 < border <= radius)")
        return false;
    }

    // edit stats
    ent.setAttribute("geometry",{primitive: "ring", radiusOuter: parseFloat($("#radius").val()), radiusInner: parseFloat($("#radius").val())-parseFloat($("#fill").val()), segmentsTheta: 100});
    ent.setAttribute("material",{shader: "flat", src: ent.getAttribute("material").src, color: $("#color").val()});

    return true;
}