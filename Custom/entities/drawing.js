/* 
    Responsible for adding entities to the scene and updating the json object of the current scene.
    Can add circle, plane, triangle, checkerboard, grille, or gradient.
    
*/

/* adds entity to scene */
function addEntity(){

    let el;

    /* check desired type of entity */
    if($("#entity :selected").text() == "circle"){ /* if circle */
        // make circle
        el = createCircle();


    } else if ($("#entity :selected").text() == "plane"){ /* if plane */
        // make plane
        el = createPlane();

    } else if ($("#entity :selected").text() == "triangle"){ /* if triangle */
        // make triangle
        el = createTriangle();

    } else if ($("#entity :selected").text() == "gradient"){
        // make gradient
        el = createGradient();

    } else if ($("#entity :selected").text() == "checkerboard"){
        // make checkerboard
        el = createCheckerboard();

    } else if ($("#entity :selected").text() == "grille"){
        // make grille
        el = createGrille();

    } else if ($("#entity :selected").text() == "dot array"){
        // make dot array
        el = createDotArray();

    }  else if ($("#entity :selected").text() == "circlular dot array"){
        // make circular dot array
        el = createCircularDotArray();

    } else if ($("#entity :selected").text() == "bullseye"){
        // make bullseye
        el = createBullseye();

    }   else if ($("#entity :selected").text() == "text"){
        // make text
        el = createText();

    } else if ($("#entity :selected").text() == "timer"){
        // make timer
        if(timerNum > 0){
            alert("A timer already exists")
            return
        }
        el = createTimer();
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