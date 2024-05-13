/* Contains code related to circlular dot array entity */

// creates a circlular dot array entity
// called when entity is added to the scene
function createCircularDotArray() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","circularDotarray"+circularDotarrayNum++);
    drawCircularDotArray(10,5,10,2,"#"+R+G+B,false,el);
    el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
    el.setAttribute("arraySpacing", {val: 10});
    el.setAttribute("toggleCenterDot", {val: false});

    return el;
}

// draws a circular dot array entity using aframe rings
// called whenever an entity needs to be drawn or redrawn
function drawCircularDotArray(radius,circles,dots,size,color1,toggle,parent){
    let c = 1;
    let middleDot = document.createElement("a-entity");
    middleDot.setAttribute("id",parent.id+"-center");
    if(toggle){
        middleDot.setAttribute("geometry",{primitive: "ring", radiusOuter: size, radiusInner: 0, segmentsTheta: 100});
    } else {
        middleDot.setAttribute("geometry",{primitive: "ring", radiusOuter: size, radiusInner: size/3, segmentsTheta: 100});
    }
    
    middleDot.setAttribute("position",{x: 0, y: 0, z: 0});
    middleDot.setAttribute("material",{shader: "flat", color: color1});
    parent.appendChild(middleDot)
    while(c <= circles){
        let elChildArr = document.createElement("a-entity");
        elChildArr.setAttribute("id",parent.id+"-"+"circle"+c);
        var i = 1;
        while(i <= dots){
            let elChild = document.createElement("a-entity");
            elChild.setAttribute("id",parent.id+"-"+"circle"+c+"-"+i);
            let theta = i*(2*Math.PI)/dots;
            x = (radius*c)*Math.cos(theta);
            y = (radius*c)*Math.sin(theta);
            elChild.setAttribute("geometry",{primitive: "ring", radiusOuter: size, radiusInner: 0, segmentsTheta: 100});
            elChild.setAttribute("position",{x: x, y: y, z: 0});
            elChild.setAttribute("material",{shader: "flat", color: color1});
            elChildArr.appendChild(elChild)
            i++;
        }
        parent.append(elChildArr);
        c++;
    }
    
}

// edits a circular dot array entity
// called on circular dot array attribute change
function editCircularDotArray(ent) {
    // check for valid inputs
    if(isNaN(parseFloat($("#numDotsIn").val()))){
        alert("Please enter a valid number of dots");
        return false;
    }
    if(isNaN(parseFloat($("#numCirclesIn").val()))){
        alert("Please enter a valid number of circles");
        return false;
    }
    if(isNaN(parseFloat($("#circleSizeIn").val()))){
        alert("Please enter a valid size");
        return false;
    }
    if(isNaN(parseFloat($("#arraySpacingIn").val()))){
        alert("Please enter a valid array spacing");
        return false;
    }
    if(parseFloat($("#numDotsIn").val()) < 0 || parseFloat($("#numDotsIn").val()) % 1 != 0){
        alert("Please enter a valid number of dots ( >= 0 and a whole number)");
        return false;
    } else if(parseFloat($("#numCirclesIn").val()) <= 0 || parseFloat($("#numCirclesIn").val()) % 1 != 0){
        alert("Please enter a valid number of circles ( > 0 and a whole number)");
        return false;
    } else if(parseFloat($("#circleSizeIn").val()) < 0){
        alert("Please enter a circle size ( >= 0 )");
        return false;
    } else if(parseFloat($("#arraySpacingIn").val()) < 0){
        alert("Please enter a valid array spacing ( >= 0 )");
        return false;
    }
    // remove boxes
    let i = ent.children.length-1;
    while (i >= 0) {
        ent.children[i].parentNode.removeChild(ent.children[i]);
        i--;
    }
    // draw new boxes
    drawCircularDotArray(parseFloat($("#arraySpacingIn").val()),parseFloat($("#numCirclesIn").val()),parseFloat($("#numDotsIn").val()),parseFloat($("#circleSizeIn").val()),$("#color").val(),toggleCenterDotIn.checked,ent);
    ent.setAttribute('arraySpacing',{val: parseFloat($("#arraySpacingIn").val())});
    ent.setAttribute('toggleCenterDot',{val: toggleCenterDotIn.checked});

    return true;
}