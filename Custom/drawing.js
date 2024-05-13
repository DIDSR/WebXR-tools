/* 
    Responsible for adding entities to the scene and updating the json object of the current scene.
    Can add circle, plane, triangle, checkerboard, grille, or gradient.
    
*/

/* adds entity to scene */
function addEntity(){
    
    el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    

    /* check desired type of entity */
    if($("#entity :selected").text() == "circle"){ /* if circle */
        /* Set radius*/
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry",{primitive: "ring", radiusOuter: 0.125*250, radiusInner: 0, segmentsTheta: 100});
        el.setAttribute("fill",{val: .125*250, isFull: true});
        el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});

    } else if ($("#entity :selected").text() == "plane"){ /* if plane */
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry",{primitive: "plane", width: .125*250, height: .25*250});
        el.setAttribute("fill",{val: .125*250, isFull: true});
        el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});
    } else if ($("#entity :selected").text() == "triangle"){ /* if triangle */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "triangle", vertexA: {x: 0, y: 0.1875*125, z: 0}, vertexB: {x: -0.25*125, y: -0.25*125, z: 0}, vertexC: {x: 0.25*125, y: -0.25*125, z: 0}});
        el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});
    } else if ($("#entity :selected").text() == "gradient"){
        el.setAttribute("id","gradient"+gradientNum++);
        drawGradient(.025*250,.075*250,32,hexToRgb("#"+R+G+B),hexToRgb("#000000"),el);
        el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
        el.setAttribute("color2",{val: "#000000"})
    } else if ($("#entity :selected").text() == "checkerboard"){
        el.setAttribute("id","checkerboard"+checkerboardNum++);
        drawCheckerboard(16,16,.02*250,"#"+R+G+B,"#000000",el);
        el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
        el.setAttribute("color2",{val: "#000000"})
    } else if ($("#entity :selected").text() == "grille"){
        el.setAttribute("id","grille"+grilleNum++);
        drawGrille(.025*250,.125*250,32,"#"+R+G+B,"#000000",el);
        el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
        el.setAttribute("color2",{val: "#000000"})
    } else if ($("#entity :selected").text() == "dot array"){
        el.setAttribute("id","dotarray"+dotarrayNum++);
        drawDotArray(5,5,2,10,"#"+R+G+B,false,el);
        el.setAttribute("arraySpacing",{val: 10});
        el.setAttribute("toggleCenterDot", {val: false});
        el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
    }  else if ($("#entity :selected").text() == "circlular dot array"){
        el.setAttribute("id","circularDotarray"+circularDotarrayNum++);
        drawCircularDotArray(10,5,10,2,"#"+R+G+B,false,el);
        el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
        el.setAttribute("arraySpacing", {val: 10});
        el.setAttribute("toggleCenterDot", {val: false});
    } else if ($("#entity :selected").text() == "bullseye"){
        el.setAttribute("id","bullseye"+bullseyeNum++);
        drawBullseye(5,5,"#"+R+G+B,el);
        el.setAttribute("material",{shader: "flat", color: "#"+R+G+B});
    }   else if ($("#entity :selected").text() == "text"){
        el.setAttribute("id","text"+textNum++);
        el.setAttribute("text",{"value": "Default Text", "color": "#FFFFFF",  width: 65, height: 65, align:"center", "wrapCount": 12});
        /*el.setAttribute("value","Default Text")
        el.setAttribute("color","#FFFFFF")
        el.setAttribute("height", .25*2000)
        el.setAttribute("width", .125*2000)*/
    } else if ($("#entity :selected").text() == "timer"){
        if(timerNum > 0){
            alert("A timer already exists")
            return
        }
        el.setAttribute("id","timer"+timerNum++);
        el.setAttribute("text",{"value": "00:00.00 ", "color": "#FFFFFF",  width: 65, height: 65, align:"center", "wrapCount": 9});
    }
    /* Set default universal stats */

    numAdded++; // number of elements added
    el.setAttribute("click-checker",""); // listener for click
    el.setAttribute("advanced",{val: false}); // advanced mode indicator
    let THETAX = Math.random() * 110 -55; // random x position
    let Y = Math.random() * 30 - 15; // random y position
    el.setAttribute("position",{x: -250 * Math.sin((THETAX*Math.PI)/180), y: Y, z: -250 * Math.cos((THETAX*Math.PI)/180)}); // set position to random x, random y, distance = 250
    el.setAttribute("rotation", {x: 0, y: THETAX, z: 0}); // set rotation to be 0
    el.setAttribute("angle",{x: THETAX, z: -250}); // set angular units to be random x and 
    //el.setAttribute("mov",{startPoint: {x: -250 * Math.sin((THETAX*Math.PI)/180), y: Y, z: -250 * Math.cos((THETAX*Math.PI)/180)}, endPoint: {theta: 0, y: 0, r: -250},speed: 10, acceleration: 1, status: 0, type: "None", startRotation: {x: 0, y: THETAX, z: 0}, keyBind: ''})
    el.setAttribute("movement",{'startPoints': [],'endPoints': [],'initialVelocities':[],'accelerations':[],'types':[],'origin': {x: -250 * Math.sin((THETAX*Math.PI)/180), y: Y, z: -250 * Math.cos((THETAX*Math.PI)/180)}, 'rotationOrigin': {x: 0, y: THETAX, z: 0}, 'status': -1, 'index': 0, 'currentVelocity': 0, 'timeElapsed': 0})

    entityCanvas.appendChild(el); /* add entity to scene */

    /* adds option to dropdown */
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    /* add entity to list of created entities */
    els.push(el);
    pool.push(el.object3D);

    updateJSON(); // update JSON of current scene
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
    
    /*
    var j = 0;
    while(j < numBars){

        let elChild = document.createElement('a-entity'); // creates plane
        elChild.setAttribute("id",parent.id+"-"+(numBars-j).toString()); // sets id correctly
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height}); // sets size
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0}); // sets proper position
        elChild.setAttribute("material",{shader: "flat", color: "rgb("+Math.ceil(color.r-((color.r/numBars)*j)).toString()+","+Math.ceil(color.g-((color.g/numBars)*j)).toString()+","+Math.ceil(color.b-((color.b/numBars)*j)).toString()+")"}); // sets color
        parent.appendChild(elChild); // adds entity to parent
        j++;
    }*/
}

/* draws grille */
function drawGrille(width,height,numBars,color1, color2,parent){
    /* creates evenly spaced planes that alternate between some color and black */

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

/* updates the current json object for the active scene*/
function updateJSON(){
    const jsonData = {};
    jsonData["sky"] = {skyColor: sky.getAttribute("material").color};
    els.forEach(element => { 
        mov = JSON.parse(JSON.stringify(element.components.movement.attrValue))
        mov.status = -1;
        if(element.id.includes("gradient") || element.id.includes("grille")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, numBars: element.children.length, color2: element.components.color2.attrValue, childGeometry: element.children[0].components.geometry.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("checkerboard")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, rows: element.children.length, cols: element.children[0].children.length, tileSize: element.children[0].children[0].components.geometry.attrValue.width,  color2: element.components.color2.attrValue, position: {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("plane")){
            let mat = JSON.parse(JSON.stringify(element.components.material.attrValue));
            for(let i = 0; i < texture.options.length; i++){
                if("#"+texture.options[i].value == mat.src){
                    mat.src = texture.options[i].text;
                    break;
                }
            }
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, widthReal: (element.children.length == 0 ? element.components.geometry.attrValue.width : element.children[2].components.geometry.attrValue.width),fill: element.components.fill.attrValue, geometry: element.components.geometry.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: mat, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("circle")){
            jsonData[element.id]={advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, geometry: element.components.geometry.attrValue, fill: element.components.fill.attrValue, position: {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("triangle")){
            jsonData[element.id]={advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, geometry: element.components.geometry.attrValue, position: {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("circularDotarray")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, toggleCenterDot: element.components.toggleCenterDot.attrValue, circles: element.children.length-1, dots: element.children[1].children.length, arraySpacing: element.components.arraySpacing.attrValue, circleSize: element.children[0].components.geometry.attrValue.radiusOuter, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("dotarray")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, toggleCenterDot: element.components.toggleCenterDot.attrValue, rows: element.children.length, cols: element.children[0].children.length, circleSize: element.children[0].children[0].components.geometry.attrValue.radiusOuter, spacing: element.components.arraySpacing.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("bullseye")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, numRings: element.children.length-1, ringPitch: element.children[0].components.geometry.attrValue.radiusOuter*2, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("text")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, text: element.components.text.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        }  else if(element.id.includes("timer")){
            text = JSON.parse(JSON.stringify(element.components.text.attrValue))
            text.value = "00:00.000"
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, text: element.components.text.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        }});
        scenes[packageSelect.value][patternList.children[parseFloat(patternList.getAttribute('selectedIndex'))].id] = jsonData
}

/* converts hex to RGB values */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }