/* Contains code related to grille entity */

// creates a grille entity
// called when entity is added to the scene
function createGrille() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","grille"+grilleNum++);
    drawGrille(.025*250,.125*250,32,"#"+R+G+B,"#000000",el);
    el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
    el.setAttribute("color2",{val: "#000000"})

    return el;
}

/* draws grille */
function drawGrille(width,height,numBars,color1, color2,parent){
    /* creates evenly spaced planes that alternate between some color and black */
    console.log(color1)
    console.log(color2)
    var j = 0;
    var isBlack = false;
    while(j < numBars){
        let elChild = document.createElement('a-entity');
        elChild.setAttribute("id",parent.id+"-"+(numBars-j).toString());
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height});
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0});
        if(isBlack){ // if on black bar
            elChild.setAttribute("material",{shader: "flat", color: color2});
        } else {
            elChild.setAttribute("material",{shader: "flat", color: color1});
        }
        isBlack = !isBlack;
        parent.appendChild(elChild);
        j++;
    }
}

// edits a grille entity
// called on grille attribute change
function editGrille(ent) {
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
    
        drawGrille(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),$("#color").val(),$("#color2").val(),ent);
    
        ent.setAttribute('color2',{val: $("#color2").val()})
    
        return true;
}
