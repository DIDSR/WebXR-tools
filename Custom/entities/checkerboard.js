/* Contains code related to checkerboard entity */

// creates a checkerboard entity
// called when entity is added to the scene
function createCheckerboard() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
 
    el.setAttribute("id","checkerboard"+checkerboardNum++);
    drawCheckerboard(16,16,.02*250,"#"+R+G+B,"#000000",el);
    el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
    el.setAttribute("color2",{val: "#000000"})

    return el;
}

/* draws checkerboard */
function drawCheckerboard(rows,cols,size,color1,color2,parent){
    /* draws evenly spaced squares */
    var r = 0;
    var isBlack = false;
    while (r < rows){
        let elChildRow = document.createElement("a-entity");
        elChildRow.setAttribute("id",parent.id+"-"+"row"+r);
        var c = 0;
        while (c < cols){
            let elChildCol = document.createElement("a-entity");
            elChildCol.setAttribute("id",parent.id+"-"+"col"+c);
            elChildCol.setAttribute("geometry",{primitive: "plane", width: size, height: size});
            elChildCol.setAttribute("position",{x: size*cols/2-(size*c)-(size/2), y: size*rows/2-(size*r)-(size/2), z: 0});
            if(isBlack){
                elChildCol.setAttribute("material",{shader: "flat", color: color2});
            } else {
                elChildCol.setAttribute("material",{shader: "flat", color: color1});
            }
            isBlack = !isBlack;
            elChildRow.appendChild(elChildCol)
            c++;
        }
        if (cols % 2 == 0) {isBlack = !isBlack};
        r++;
        parent.appendChild(elChildRow);
    }
}

// edits a bullseye entity
// called on bullseye attribute change
function editCheckerboard(ent) {
    // check for valid inputs
    if(isNaN(parseFloat($("#rowsIn").val()))){
        alert("Please enter a valid number of rows");
        return false;
    }
    if(isNaN(parseFloat($("#colsIn").val()))){
        alert("Please enter a valid number of columns");
        return false;
    }
    if(isNaN(parseFloat($("#tileSizeIn").val()))){
        alert("Please enter a valid size");
        return false;
    }
    if(parseFloat($("#rowsIn").val()) <= 0 || parseFloat($("#rowsIn").val()) % 1 != 0){
        alert("Please enter a valid number of rows ( > 0 and a whole number)");
        return false;
    } else if(parseFloat($("#colsIn").val()) <= 0 || parseFloat($("#colsIn").val()) % 1 != 0){
        alert("Please enter a valid number of cols ( > 0 and a whole number)");
        return false;
    } else if(parseFloat($("#tileSizeIn").val()) < 0){
        alert("Please enter a tile size ( >= 0 )");
        return false;
    }
    ent.setAttribute('color2',{val: $("#color2").val()})
    // remove boxes
    let i = ent.children.length-1;
    while (i >= 0) {
        ent.children[i].parentNode.removeChild(ent.children[i]);
        i--;
    }
    // draw new boxes
    drawCheckerboard(parseFloat($("#rowsIn").val()),parseFloat($("#colsIn").val()),parseFloat($("#tileSizeIn").val()),$("#color").val(),$("#color2").val(),ent);

    return true;
}