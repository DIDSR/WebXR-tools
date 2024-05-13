/* Contains code related to dot array entity */

// creates a dot array entity
// called when entity is added to the scene
function createDotArray() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","dotarray"+dotarrayNum++);
    drawDotArray(5,5,2,10,"#"+R+G+B,false,el);
    el.setAttribute("arraySpacing",{val: 10});
    el.setAttribute("toggleCenterDot", {val: false});
    el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});

    return el;
}

/* draws dot array */
function drawDotArray(rows,cols,size,spacing,color1,toggle,parent){
    /* draws evenly spaced squares */
    var r = 0;
    while (r < rows){
        let elChildRow = document.createElement("a-entity");
        elChildRow.setAttribute("id",parent.id+"-"+"row"+r);
        var c = 0;
        while (c < cols){
            let elChildCol = document.createElement("a-entity");
            elChildCol.setAttribute("id",parent.id+"-"+"col"+c);
            if((size+2*spacing)*cols/2-((size+2*spacing)*c)-((size+2*spacing)/2) == 0 && (size+2*spacing)*rows/2-((size+2*spacing)*r)-((size+2*spacing)/2) == 0){
                if(toggle){
                    elChildCol.setAttribute("geometry",{primitive: "ring", radiusOuter: size, radiusInner: 0, segmentsTheta: 100});
                } else {
                    elChildCol.setAttribute("geometry",{primitive: "ring", radiusOuter: size, radiusInner: size/3, segmentsTheta: 100});
                }
            } else {
                elChildCol.setAttribute("geometry",{primitive: "ring", radiusOuter: size, radiusInner: 0, segmentsTheta: 100});
            }
            elChildCol.setAttribute("position",{x: (size+2*spacing)*cols/2-((size+2*spacing)*c)-((size+2*spacing)/2), y: (size+2*spacing)*rows/2-((size+2*spacing)*r)-((size+2*spacing)/2), z: 0});
            elChildCol.setAttribute("material",{shader: "flat", color: color1});
            elChildRow.appendChild(elChildCol)
            c++;
        }
        parent.appendChild(elChildRow);
        r++;
    }
    
}

// edits a dot array entity
// called on dot array attribute change
function editDotArray(ent) {
    // check for valid inputs
    if(isNaN(parseFloat($("#rowsIn").val()))){
        alert("Please enter a valid number of rows");
        return false;
    }
    if(isNaN(parseFloat($("#colsIn").val()))){
        alert("Please enter a valid number of columns");
        return false;
    }
    if(isNaN(parseFloat($("#circleSizeIn").val()))){
        alert("Please enter a valid size");
        return false;
    }
    if(isNaN(parseFloat($("#spacingIn").val()))){
        alert("Please enter a spacing");
        return false;
    }
    if(parseFloat($("#rowsIn").val()) <= 0 || parseFloat($("#rowsIn").val()) % 1 != 0){
        alert("Please enter a valid number of rows ( > 0 and a whole number)");
        return false;
    } else if(parseFloat($("#colsIn").val()) <= 0 || parseFloat($("#colsIn").val()) % 1 != 0){
        alert("Please enter a valid number of cols ( > 0 and a whole number)");
        return false;
    } else if(parseFloat($("#circleSizeIn").val()) < 0){
        alert("Please enter a circle size ( >= 0 )");
        return false;
    } else if(parseFloat($("#spacingIn").val()) < 0){
        alert("Please enter a valid spacing ( >= 0 )");
        return false;
    }
    // remove dots
    let i = ent.children.length-1;
    while (i >= 0) {
        ent.children[i].parentNode.removeChild(ent.children[i]);
        i--;
    }
    // draw new dots
    drawDotArray(parseFloat($("#rowsIn").val()),parseFloat($("#colsIn").val()),parseFloat($("#circleSizeIn").val()),parseFloat($("#spacingIn").val()),$("#color").val(),toggleCenterDotIn.checked,ent);
    ent.setAttribute('arraySpacing',{val: parseFloat($("#spacingIn").val())});
    ent.setAttribute('toggleCenterDot',{val: toggleCenterDotIn.checked});

    return true;
}