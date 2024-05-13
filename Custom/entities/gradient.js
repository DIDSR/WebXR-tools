/* Contains code related to gradient entity */

// creates a gradient entity
// called when entity is added to the scene
function createGradient() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","gradient"+gradientNum++);
    drawGradient(.025*250,.075*250,32,hexToRgb("#"+R+G+B),hexToRgb("#000000"),el);
    el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
    el.setAttribute("color2",{val: "#000000"})

    return el;
}

/* draws gradient */
function drawGradient(width,height,numBars,color1,color2,parent){
    /* creates evenly spaced planes that progressively trend towards full color */
    rDiff = color2.r-color1.r
    gDiff = color2.g-color1.g
    bDiff = color2.b-color1.b    
    rStep = rDiff/(numBars-1)
    gStep = gDiff/(numBars-1)
    bStep = bDiff/(numBars-1)
    var j = numBars-1;
    while(j >= 0){
        let elChild = document.createElement('a-entity'); // creates plane
        elChild.setAttribute("id",parent.id+"-"+(numBars-j).toString()); // sets id correctly
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height}); // sets size
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0}); // sets proper position
        elChild.setAttribute("material",{shader: "flat", color: "rgb("+Math.ceil(color2.r-(rStep*j)).toString()+","+Math.ceil(color2.g-(gStep*j)).toString()+","+Math.floor(color2.b-(bStep*j)).toString()+")"}); // sets color
        parent.appendChild(elChild); // adds entity to parent
        j--;
    }
    
}

// edits gradient entity
// called when gradient attributes are changed
function editGradient(ent) {
    // check for valid inputs
    if(isNaN(parseFloat($("#width").val()))){
        alert("Please enter a valid width");
        return false;
    }
    if(isNaN(parseFloat($("#height").val()))){
        alert("Please enter a valid height");
        return false;
    }
    if(isNaN(parseFloat($("#numBarsIn").val()))){
        alert("Please enter a valid number of bars");
        return false;
    }
    if(parseFloat($("#height").val()) < 0){
        alert("Please enter a valid height ( >= 0 )");
        return false;
    } else if(parseFloat($("#width").val()) < 0){
        alert("Please enter a valid width ( >= 0 )");
        return false;
    } else if(parseFloat($("#numBarsIn").val()) < 0 || parseFloat($("#numBarsIn").val()) % 1 != 0){
        alert("Please enter a valid number of bars ( >= 0 and a whole number )");
        return false;
    }

    // remove bars
    let i = ent.children.length-1;
    while (i >= 0) {
        ent.children[i].parentNode.removeChild(ent.children[i]);
        i--;
    }

    drawGradient(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),hexToRgb($("#color").val()),hexToRgb($("#color2").val()),ent);

    ent.setAttribute('color2',{val: $("#color2").val()})

    return true;
}