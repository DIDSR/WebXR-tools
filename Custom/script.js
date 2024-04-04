/* Contains DOM information and code that will run on page load */

/* Scene related */
const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");

/* Edit Related */
var conRight = document.querySelector("#con-right");
var conLeft = document.querySelector("#con-left");

/* Headers */
const background = document.getElementById("backgroundSettings"); /* header for background settings */
const ent = document.getElementById("entitySettings");
const uni = document.getElementById("universalSettings");
const nonUni = document.getElementById("nonUniversalSettings");
const utility = document.getElementById("utility");
const collapse = document.getElementById("collapse");
const content = document.getElementById("content");
//content.style.display = "block";
const addEditContent = document.getElementById("addEditContent")
const addContent = document.getElementById('addContent')
const editContent = document.getElementById('editContent')
const displayEditContent = document.getElementById("displayEditContent")
const nameIn = document.getElementById('name');
const displayUtility = document.getElementById('displayUtility');
const advanced = document.getElementById('advancedButton');

/* Display scenes */
const pattern = document.getElementById("pattern");
const patternList = document.getElementById("items-list");

const patternDisplay = document.getElementById("patternDisplay");
const scene_display_input = document.getElementById("scene-disp-input");

/* Selection of entity */
const entitySelectorText = document.getElementById("editSelector"); /* current entity container paragraph */
const entitySelector = document.getElementById("entityId"); /* selector */

/* Sky related */
const skyIn = document.getElementById("skyIn"); /* sky color container */
const skyColor = document.getElementById("skyCol"); /* sky color input */
//skyIn.style.width = "75%";

/* Universal attributes */
/* Position related */
const posIn = document.getElementById("posIn"); /* position Container Paragraph */
var xIn = document.getElementById("x"); /* x input */
var yIn = document.getElementById("y"); /* y input */
var zIn = document.getElementById("z"); /* z input */

/* Rotation related */
const rotationZ = document.getElementById("rotationZ");
const rotationY = document.getElementById("rotationY");
const rotationX = document.getElementById("rotationX");

const pitch = document.getElementById("pitch");
const roll = document.getElementById("roll");
const yaw = document.getElementById("yaw");
/* rotation container paragraph */ 
//rotationY.style.display = 'none'
//rotationX.style.display = 'none'
const rotIn = document.getElementById("rotation"); /* rotation input */

/* Color related */
const entColor = document.getElementById("entColor");
const color = document.getElementById("color"); /* color container paragraph */
const colIn = document.getElementById("colIn"); /* color input */
const colIn2 = document.getElementById("colIn2"); /* color input */
const color2 = document.getElementById("color2"); /* color input */
//colIn.style.width = "75%";

/* Texture related */
const textureIn = document.getElementById("textureIn");
const texture = document.getElementById("texture");
const uploadTextureIn = document.querySelector("#uploadTextureIn");
const texture_input = document.querySelector("#texture-input");

/* Fill related */
const fillIn = document.getElementById("fillIn");
const fill = document.getElementById("fill");

/* Circle only attributes */
/* Radius related */
const radius = document.getElementById("radius"); /* radius container paragraph */
const radiusIn = document.getElementById("radiusIn"); /* radius input */

/* Plane/Gradient only attributes */
/* Width related */
const width = document.getElementById("width"); /* width container paragraph */
const widthIn = document.getElementById("widthIn"); /* width input */

/* Height related */
const height = document.getElementById("height"); /* height container paragraph */
const heightIn = document.getElementById("heightIn"); /* height input */

/* Triangle only attributes */
/* Vertex A related */

const vertices = document.getElementById("vertices");
const va = document.getElementById("va"); /* vertex A container paragraph */
const vax = document.getElementById("vax"); /* x input */
const vay = document.getElementById("vay"); /* y input */

/* vertex B related */
const vb = document.getElementById("vb"); /* vertex B container paragraph */
const vbx = document.getElementById("vbx"); /* x input */
const vby = document.getElementById("vby"); /* y input */

/* Vertex C related */
const vc = document.getElementById("vc"); /* vertex C container paragraph */
const vcx = document.getElementById("vcx"); /* x input */
const vcy = document.getElementById("vcy"); /* y input */

/* Gradient only attributes */
/* Number of bars related */
const numBars = document.getElementById("numBars"); /* number of bars container paragraph */
const numBarsIn = document.getElementById("numBarsIn"); /* number of bars input */

/* Checkerboard only attributes */
const rows = document.getElementById("rows"); /* rows container paragraph */
const rowsIn = document.getElementById("rowsIn"); /* rows input */
const cols = document.getElementById("cols"); /* columns container paragraph */
const colsIn = document.getElementById("colsIn"); /* columns input */
const tileSize = document.getElementById("tileSize"); /* tile size container paragraph */
const tileSizeIn = document.getElementById("tileSizeIn"); /* tile size input */

/* dotarray attributes */
const circleSize = document.getElementById("circleSize"); /* circle size container paragraph */
const circleSizeIn = document.getElementById("circleSizeIn"); /* circle size input */
const spacing = document.getElementById("spacing"); /* circle size container paragraph */
const spacingIn = document.getElementById("spacingIn"); /* circle size input */
const numDots = document.getElementById("numDots"); /* circle size container paragraph */
const numDotsIn = document.getElementById("numDotsIn"); /* circle size input */
const arrayRadius = document.getElementById("arrayRadius"); /* circle size container paragraph */
const arrayRadiusIn = document.getElementById("arrayRadiusIn"); /* circle size input */
const numCircles = document.getElementById("numCircles"); /* circle size container paragraph */
const numCirclesIn = document.getElementById("numCirclesIn"); /* circle size input */
const arraySpacing = document.getElementById("arraySpacing"); /* circle size container paragraph */
const arraySpacingIn = document.getElementById("arraySpacingIn"); /* circle size input */
const toggleCenterDot = document.getElementById("toggleCenterDot");
const toggleCenterDotIn = document.getElementById("toggleCenterDotIn");

/* bullseye attributes */
const numRings = document.getElementById("numRings"); /* number of rings container paragraph */
const numRingsIn = document.getElementById("numRingsIn"); /* number of rings input */
const ringPitch = document.getElementById("ringPitch"); /* ring pitch container paragraph */
const ringPitchIn = document.getElementById("ringPitchIn"); /* ring pitch input */

const textIn = document.getElementById("text");

const settingsButtonContainer = document.getElementById("settingsButtonContainer");
const settingsButton = document.getElementById("settingsButton");
const settingsIcon = document.getElementById("settingsIcon");

const swapContainer = document.getElementById("swapContainer");


/* Send back/forward */
/*const sendButton = document.getElementById("sendButton");*/

/* Save Edits Button */
/*const editButton = document.getElementById("editButton");*/

/* Save Scene button */
const saveButton = document.getElementById("saveButton");

/* Add related */
const addChoice = document.getElementById("addChoice"); /* add button container paragraph */
const addButton = document.getElementById("addButton"); /* add button */
const upload = document.getElementById("upload"); /* upload button container paragraph*/
const scene_input = document.querySelector("#scene-input"); /* upload button */

const removeButton = document.getElementById("removeButton"); /* remove button container paragraph */
const duplicateButton = document.getElementById("duplicateButton");

const specificSettings = document.getElementById("specificSettings");
const area1 = document.getElementById("area1");
const area2 = document.getElementById("area2");
const area3 = document.getElementById("area3");
const area4 = document.getElementById("area4");
const area5 = document.getElementById("area5");

const hideUniversalIcon = document.getElementById("hideUniversalIcon");
const hideSpecificIcon = document.getElementById("hideSpecificIcon");
const universalHeader = document.getElementById("universalHeader");
const coreLayout = document.getElementById('coreLayout');
const packageLayout = document.getElementById('packageLayout');
const editPatternLayout = document.getElementById('editPatternLayout');
const packageSelect = document.getElementById('packageDisplay')
const recentPackages = document.getElementById('recentPackages')

const movement = document.getElementById('movementSettings');
const movementButton = document.getElementById('movementButton');
const movementButtonContainer = document.getElementById('movementButtonContainer');
const stopIndividualButton = document.getElementById('stopIndividualButton');
const movementIcon = document.getElementById('movementIcon');
const movementType = document.getElementById('movementType');
const movementTypeIn = document.getElementById('movementTypeIn');
const movementHeader = document.getElementById('movementHeader');
const startHeader = document.getElementById('startHeader');
const endHeader = document.getElementById('endHeader');
const startX = document.getElementById('startX');
const startY = document.getElementById('startY');
const startZ = document.getElementById('startZ');
const endX = document.getElementById('endX');
const endY = document.getElementById('endY');
const endZ = document.getElementById('endZ');
const speedHeader = document.getElementById('speedHeader');
const accelerationHeader = document.getElementById('accelerationHeader');
//const keyHeader = document.getElementById('keyHeader');
const speed = document.getElementById('speed');
const acceleration = document.getElementById('acceleration');
//const keyBind = document.getElementById('key');

const animationButton = document.getElementById('animationButton')
const animationList = document.getElementById('movementAnims-list')
const animationListIcon = document.getElementById('animationListIcon')
const animationListButton = document.getElementById('animationListButton')
const animationListButtonContainer = document.getElementById('animationListButtonContainer')
const settingsLayout = document.getElementById('settingsLayout')

const startAllButton = document.getElementById('startAllButton')
const pauseAllButton = document.getElementById('pauseAllButton')
const stopAllButton = document.getElementById('stopAllButton')


/* Local Variables */
var el = null; /* recently created entity */
var els = new Array(); /* array of all created entities */
var pool = new Array();

var sky = scene.querySelector("#sky"); /* sky */

var selectedEntity = null; /* selected entity */

var circleNum = 0; /* number of circles created */
var planeNum = 0; /* number of planes created */
var triangleNum = 0; /* number of triangles created */
var gradientNum = 0; /* number of gradients created */
var checkerboardNum = 0; /* number of checkerboards created */
var grilleNum = 0;
var dotarrayNum = 0;
var circularDotarrayNum = 0;
var bullseyeNum = 0;
var textNum = 0;
var timerNum = 0;
var textureNum = 0;
var numAdded = 0; /* total entities added */

var boolAddEdit = false;
var boolDisplayEdit = true; /* toggle for add or edit element */

var fileContent = null; /* contents of uploaded JSON file */

var uploadedTextureFormat = {};
var scenes = {default: {}};

const packages = {default: ''} // dictionary of packages and their respective links
const names = {default: {}} // list of packages and the names and count of names of each pattern within


patternList.setAttribute('multi-select',false);


let items = document.querySelectorAll('#items-list > li');

items.forEach(item => {
  $(item).prop('draggable', true)
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('drop', dropped)
  item.addEventListener('dragenter', cancelDefault)
  item.addEventListener('dragover', cancelDefault)
  item.addEventListener('click',selectPattern)
})

let i = 0;
let reorderedScene = {}
while(i < patternList.children.length){
  reorderedScene[patternList.children[i].id] = scenes[packageSelect.value][patternList.children[i].id]
  i++;
}
scenes[packageSelect.value] = reorderedScene

// handles a pattern being selected from the pattern list
function selectPattern (e){
  stopAllMovement()
  if(e.target.style.background == 'rgb(243, 152, 20)' && patternList.getAttribute("multi-select") == false){ // if selected pattern is highlighted, unselect it
    e.target.style.background = '#FFF'
    patternList.setAttribute("selectedIndex","")
    patternList.setAttribute("multi-select",false);
    revertChanges()
    //nameIn.value = packageSelect.value;
    return;
  } else if(e.target.style.background == 'rgb(243, 152, 20)' && patternList.getAttribute("multi-select") == 'true'){
    e.target.style.background = '#FFF';
    first = true;
    items.forEach(item => { // changes displayed pattern to selected pattern
      if(item.style.background == 'rgb(243, 152, 20)' && first) {
        first = false;
        patternList.setAttribute("selectedIndex",$(item).index())
        
        revertChanges()
        addEntitiesFromScene(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id])
        //nameIn.value = patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent;
        if(els.length > 0){
          selectedEntity = els[0]
        }
      } else if(item.style.background == 'rgb(243, 152, 20)' && !first){
        patternList.setAttribute("multi-select",true);
      }
    })
    return;
  }

  e.target.style.background = '#F39814' // highlights selected pattern
  items = document.querySelectorAll('#items-list > li');
  if(keysPressed['ctrl'] && !isNaN(parseInt(patternList.getAttribute('selectedIndex')))){ // checks for multiselect
    patternList.setAttribute("multi-select",true);
    return;
  }
  items.forEach(item => { // changes displayed pattern to selected pattern
    if(item != e.target){
      item.style.background = '#FFF'
    } else {
      patternList.setAttribute("selectedIndex",$(item).index())
      patternList.setAttribute("multi-select",false);
      revertChanges()
      addEntitiesFromScene(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id])
      //nameIn.value = patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent;
      if(els.length > 0){
        selectedEntity = els[0]
      }
    }
  })
  /*let i = 0;
  while(i < els.length){
    if(!els[i].getAttribute('movement')){
      els[i].setAttribute("movement",{'startPoints': [],'endPoints': [],'initialVelocities':[],'accelerations':[],'types':[],'origin': els[i].getAttribute('position'), 'rotationOrigin': els[i].getAttribute('rotation'), 'status': -1, 'index': 0, 'currentVelocity': 0, 'timeElapsed': 0})
    }
    i++;
  }*/

  setTimeout(() => {
    if(els[0] && els[0].getAttribute('movement').types.length > 0){
      updateAnimationList(els[0])
      animationList.setAttribute('selectedIndex',0)
      updateStats()
      
    } else {
      updateAnimationList(els[0])
    }

  },200)

  
}




/* Code to make pattern list elements draggable */
function dragStart (e) {
  var index = $(e.target).index()
  e.dataTransfer.setData('text/plain', index)
}

function dropped (e) {
  cancelDefault(e)
  
  // get new and old index
  let oldIndex = e.dataTransfer.getData('text/plain')
  let target = $(e.target)
  let newIndex = target.index()
  
  // remove dropped items at old place
  if(newIndex != oldIndex){
    let dropped = $(this).parent().children().eq(oldIndex).remove()

    // insert the dropped items at new place
    if (newIndex < oldIndex) {
      target.before(dropped)
    } else {
      target.after(dropped)
    }
  } 
  
  let i = 0;
  let reorderedScene = {}
  while(i < patternList.children.length){
    reorderedScene[patternList.children[i].id] = scenes[packageSelect.value][patternList.children[i].id]
    i++;
  }
  scenes[packageSelect.value] = reorderedScene

}

function cancelDefault (e) {
  e.preventDefault()
  e.stopPropagation()
  return false
}


// animation list functionality 

let animations = document.querySelectorAll('#movementAnims-list > li');

animations.forEach(item => {
  $(item).prop('draggable', true)
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('drop', droppedAnim)
  item.addEventListener('dragenter', cancelDefault)
  item.addEventListener('dragover', cancelDefault)
  item.addEventListener('click',selectAnimation)
})

let j = 0;


// handles a pattern being selected from the pattern list
function selectAnimation (e){
  stopMovement(selectedEntity)
  if(e.target.style.background == 'rgb(243, 152, 20)'){ // if selected pattern is highlighted, unselect it
    e.target.style.background = '#FFF'
    animationList.setAttribute("selectedIndex","")
    movementTypeIn.disabled = true
    //revertChanges()
    //nameIn.value = packageSelect.value;
    return;
  }
  e.target.style.background = '#F39814' // highlights selected pattern
  items = document.querySelectorAll('#movementAnims-list > li');
  items.forEach(item => { // changes displayed pattern to selected pattern
    if(item != e.target){
      item.style.background = '#FFF'
    } else {
      animationList.setAttribute("selectedIndex",$(item).index())
      movementTypeIn.disabled = false
      updateAnimationUI(selectedEntity,$(item).index())
      

      // add in functionality that will update animation info based on selected
      
    }
  })
}

function updateAnimationUI(entity, ind) {
  if(ind == -1){
    movementTypeIn.value = "None"
    movementTypeIn.disabled = true
    updateMovementSettings()
    return
  }
  
  let mov = entity.getAttribute('movement')
  let i = 0;
  let counter = -1;

  // have to take into account rebounds from rubberband
  while(i < mov.types.length){
    if(mov.types[i] != 'Rebound'){
      counter++;
      if(counter == ind){
        break
      }
    }
    i++;
  }

  if(entity.getAttribute('advanced').val){
    startX.value = mov.startPoints[i].x
    startY.value = mov.startPoints[i].y
    startZ.value = -mov.startPoints[i].z
    endX.value = mov.endPoints[i].x
    endY.value = mov.endPoints[i].y
    endZ.value = -mov.endPoints[i].z
  } else {
    startX.value = mov.startPoints[i].theta
    startY.value = mov.startPoints[i].y
    startZ.value = -mov.startPoints[i].r
    endX.value = mov.endPoints[i].theta
    endY.value = mov.endPoints[i].y
    endZ.value = -mov.endPoints[i].r
  }

  movementTypeIn.value = mov.types[i]
  acceleration.value = mov.accelerations[i]
  speed.value = mov.initialVelocities[i]
  movementTypeIn.disabled = false
  if(mov.types[i] == 'Pause'){
    startY.value = mov.initialVelocities[i]
  }
  updateMovementSettings()

}

function droppedAnim (e) {
  cancelDefault(e)
  stopMovement(selectedEntity)
  
  // get new and old index
  let oldIndex = e.dataTransfer.getData('text/plain')
  let target = $(e.target)
  let newIndex = target.index()

  // find oldIndex equivalent and newIndex equivalent in types
  let i = 0;
  let oldI = -1;
  let newI = -1;
  let counterOld = -1;
  let counterNew = -1;

  let movementComponent = selectedEntity.getAttribute('movement')
  // have to take into account rebounds from rubberband
  while(i < movementComponent.types.length){
    if(movementComponent.types[i] != 'Rebound'){
      if(counterOld == oldIndex && counterNew == newIndex){
        break
      } 
      
      if(counterOld != oldIndex){
        counterOld++;
        if(counterOld == oldIndex){
          oldI = i
        }
      }
      if(counterNew != newIndex){
        counterNew++;
        if(counterNew == newIndex){
          newI = i
        }
      }
    }
    i++;
  }


  // remove dropped items at old place
  if(newIndex != oldIndex){
    let dropped = $(this).parent().children().eq(oldIndex).remove()

    // insert the dropped items at new place
    if (newIndex < oldIndex) {
      target.before(dropped)
    } else {
      target.after(dropped)
    }
    if(animationList.getAttribute('selectedIndex') == oldIndex){
      animationList.setAttribute('selectedIndex',newIndex);
    }
  } 

  if(movementComponent.types[newIndex] == 'Rubberband'){
    // insert at newIndex+2
    newIndex += 1;
  }

  if(oldI > newI){
    if(movementComponent.types[oldI] == 'Rubberband'){
      // remove both oldI and oldI+1
      let points = movementComponent.startPoints.splice(oldI,2);
      let points2 = movementComponent.endPoints.splice(oldI,2);
      let vels = movementComponent.initialVelocities.splice(oldI,2);
      let accelerations = movementComponent.accelerations.splice(oldI,2);
      let types = movementComponent.types.splice(oldI,2);

      movementComponent.startPoints.splice(newI,0,...points)
      movementComponent.endPoints.splice(newI,0,...points2)
      movementComponent.initialVelocities.splice(newI,0,...vels)
      movementComponent.accelerations.splice(newI,0,...accelerations)
      movementComponent.types.splice(newI,0,...types)

    } else {
      // remove oldI
      let points = movementComponent.startPoints.splice(oldI,1);
      let points2 = movementComponent.endPoints.splice(oldI,1);
      let vels = movementComponent.initialVelocities.splice(oldI,1);
      let accelerations = movementComponent.accelerations.splice(oldI,1);
      let types = movementComponent.types.splice(oldI,1);

      movementComponent.startPoints.splice(newI,0,...points)
      movementComponent.endPoints.splice(newI,0,...points2)
      movementComponent.initialVelocities.splice(newI,0,...vels)
      movementComponent.accelerations.splice(newI,0,...accelerations)
      movementComponent.types.splice(newI,0,...types)
    }

  } else if(newI > oldI) {
    // remove then insert at newI - 1 or - 2 if newI
    if(movementComponent.types[oldI] == 'Rubberband'){
      // remove both oldI and oldI+1
      let points = movementComponent.startPoints.splice(oldI,2);
      let points2 = movementComponent.endPoints.splice(oldI,2);
      let vels = movementComponent.initialVelocities.splice(oldI,2);
      let accelerations = movementComponent.accelerations.splice(oldI,2);
      let types = movementComponent.types.splice(oldI,2);

      if(movementComponent.types[newI-1] == 'Rubberband'){
        movementComponent.startPoints.splice(newI,0,...points)
        movementComponent.endPoints.splice(newI,0,...points2)
        movementComponent.initialVelocities.splice(newI,0,...vels)
        movementComponent.accelerations.splice(newI,0,...accelerations)
        movementComponent.types.splice(newI,0,...types)
      } else { 
        movementComponent.startPoints.splice(newI-1,0,...points)
        movementComponent.endPoints.splice(newI-1,0,...points2)
        movementComponent.initialVelocities.splice(newI-1,0,...vels)
        movementComponent.accelerations.splice(newI-1,0,...accelerations)
        movementComponent.types.splice(newI-1,0,...types)
      }

    } else {
      // remove oldI
      let points = movementComponent.startPoints.splice(oldI,1);
      let points2 = movementComponent.endPoints.splice(oldI,1);
      let vels = movementComponent.initialVelocities.splice(oldI,1);
      let accelerations = movementComponent.accelerations.splice(oldI,1);
      let types = movementComponent.types.splice(oldI,1);

      if(movementComponent.types[newI-1] == 'Rubberband'){
        movementComponent.startPoints.splice(newI+1,0,...points)
        movementComponent.endPoints.splice(newI+1,0,...points2)
        movementComponent.initialVelocities.splice(newI+1,0,...vels)
        movementComponent.accelerations.splice(newI+1,0,...accelerations)
        movementComponent.types.splice(newI+1,0,...types)
      } else { 
        movementComponent.startPoints.splice(newI,0,...points)
        movementComponent.endPoints.splice(newI,0,...points2)
        movementComponent.initialVelocities.splice(newI,0,...vels)
        movementComponent.accelerations.splice(newI,0,...accelerations)
        movementComponent.types.splice(newI,0,...types)
      }
    }

  }

  /*if(oldIndex < movementComponent.types.length-1 && movementComponent.types[oldIndex+1] == 'Rebound'){
    // remove both oldIndex and oldIndex+1
    let points = movementComponent.startPoints.splice(oldIndex,2);
    let points2 = movementComponent.endPoints.splice(oldIndex,2);
    let vels = movementComponent.initialVelocities.splice(oldIndex,2);
    let accelerations = movementComponent.accelerations.splice(oldIndex,2);
    let types = movementComponent.types.splice(oldIndex,2);

    movementComponent.startPoints.splice(newIndex,0,...points)
    movementComponent.endPoints.splice(newIndex,0,...points2)
    movementComponent.initialVelocities.splice(newIndex,0,...vels)
    movementComponent.accelerations.splice(newIndex,0,...accelerations)
    movementComponent.types.splice(newIndex,0,...types)
  
  } else {
    let points = movementComponent.startPoints.splice(oldIndex,1);
    let points2 = movementComponent.endPoints.splice(oldIndex,1);
    let vels = movementComponent.initialVelocities.splice(oldIndex,1);
    let accelerations = movementComponent.accelerations.splice(oldIndex,1);
    let types = movementComponent.types.splice(oldIndex,1);

    movementComponent.startPoints.splice(newIndex,0,...points)
    movementComponent.endPoints.splice(newIndex,0,...points2)
    movementComponent.initialVelocities.splice(newIndex,0,...vels)
    movementComponent.accelerations.splice(newIndex,0,...accelerations)
    movementComponent.types.splice(newIndex,0,...types)

  }*/



  updateJSON()
  //scenes[packageSelect.value] = reorderedScene

}




// SOURCE https://stackoverflow.com/questions/16616722/sending-all-javascript-console-output-into-a-dom-element 
// Writes console information to the debug div which can be opened by pressing ctrl+i


var baseLogFunction = console.log;
console.log = function(){
    baseLogFunction.apply(console, arguments);

    var args = Array.prototype.slice.call(arguments);
    for(var i=0;i<args.length;i++){
        var node = createLogNode(args[i]);
        document.querySelector("#debug").appendChild(node);
    }

}

function createLogNode(message){
    var node = document.createElement("div");
    node.style.overflowY = 'auto';
    var textNode = document.createTextNode(message);
    node.appendChild(textNode);
    return node;
}

window.onerror = function(message, url, linenumber) {
    console.log("JavaScript error: " + message + " on line " +
        linenumber + " for " + url);
}
