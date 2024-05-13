/* Contains code related to draggable lists */

let items = document.querySelectorAll('#items-list > li'); // list of patterns

// for each list item, listen for following events
items.forEach(item => {
  $(item).prop('draggable', true)
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('drop', dropped)
  item.addEventListener('dragenter', cancelDefault)
  item.addEventListener('dragover', cancelDefault)
  item.addEventListener('click',selectPattern)
})

// reorders keys in json package when necessary
let i = 0;
let reorderedScene = {}
while(i < patternList.children.length){
  reorderedScene[patternList.children[i].id] = scenes[packageSelect.value][patternList.children[i].id]
  i++;
}
scenes[packageSelect.value] = reorderedScene

// handles a pattern being selected from the pattern list
function selectPattern (e){
  stopAll()
  if(e.target.style.background == 'rgb(243, 152, 20)' && patternList.getAttribute("multi-select") == false){ // if selected pattern is highlighted, unselect it
    e.target.style.background = '#FFF'
    patternList.setAttribute("selectedIndex","")
    patternList.setAttribute("multi-select",false);
    revertChanges()
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
      if(els.length > 0){
        selectedEntity = els[0]
      }
    }
  })

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

// when an animation list item is dropped somewhere
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

  updateJSON()
}

let dragged;
let id;
let index;
let indexDrop;
let list;

  document.addEventListener("dragstart", ({target}) => {
      dragged = target;
      id = target.id;
      list = target.parentNode.children;
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === dragged){
          index = i;
        }
      }
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
   if(target.className == "dropzone" && target.id !== id) {
       dragged.remove( dragged );
      for(let i = 0; i < list.length; i += 1) {
        if(list[i] === target){
          indexDrop = i;
        }
      }
      if(index > indexDrop) {
        target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });

  // updates contents of animation list
  // takes in the entity to use for this
  function updateAnimationList(entity){
    // add types of movement present in new entity to animation list
    if(entity == null){
        animationList.innerHTML = ""
        animationList.setAttribute('selectedIndex',"")
        return
    }

    let anims = entity.getAttribute('movement').types;
    out = []
    let i = 0;
    animationList.innerHTML = ""
    animationList.setAttribute('selectedIndex',"")
    while(i < anims.length){
        if(anims[i] != 'Rebound'){
            let el = document.createElement('li');
            el.innerText = anims[i]
            if(i == 0){
                el.style.background ='#F39814'
                animationList.setAttribute('selectedIndex',0)
            }
        
            el.setAttribute('draggable',true)
            el.addEventListener('dragstart', dragStart)
            el.addEventListener('drop', droppedAnim)
            el.addEventListener('dragenter', cancelDefault)
            el.addEventListener('dragover', cancelDefault)
            el.addEventListener('click',selectAnimation)
        
            animationList.appendChild(el)
            animationList.scrollTo({
                top: 1000000000,
                left: 0,
                behavior: "smooth",
            });
        }
        i++;
    }
   
  }

  // adds movement to the list
  function addMovementAnim(){
    var toggle_button = '<li>Pause</li>';
    let el = document.createElement('li');
    el.innerText = "Pause"

    el.setAttribute('draggable',true)
    el.addEventListener('dragstart', dragStart)
    el.addEventListener('drop', droppedAnim)
    el.addEventListener('dragenter', cancelDefault)
    el.addEventListener('dragover', cancelDefault)
    el.addEventListener('click',selectAnimation)

    animationList.appendChild(el)


    

    
    animationList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
    });
    let movementComponent = selectedEntity.getAttribute('movement');
    if(selectedEntity.getAttribute('advanced').val){
        movementComponent.startPoints.push({x: 0, y: 0, z: -250});
        movementComponent.endPoints.push({x: 0, y: 0, z: -250});
        movementComponent.initialVelocities.push(0);
        movementComponent.accelerations.push(0);
        movementComponent.types.push('Pause');
    } else {
        movementComponent.startPoints.push({theta: 0, y: 0, r: -250});
        movementComponent.endPoints.push({theta: 0, y: 0, r: -250});
        movementComponent.initialVelocities.push(0);
        movementComponent.accelerations.push(0);
        movementComponent.types.push('Pause');
    }
    

    
}

// removes movement from list
function removeMovementAnim(){
    // remove animation from entity
    if(animationList.childElementCount == 0){
        return
    }
    stopMovement(selectedEntity)

    let index = parseInt(animationList.getAttribute('selectedIndex'))
    let i = 0;
    let counter = -1;
    let movementComponent = selectedEntity.getAttribute('movement');
    // have to take into account rebounds from rubberband
    while(i < movementComponent.types.length){
      if(movementComponent.types[i] != 'Rebound'){
        counter++;
        if(counter == index){
          break
        }
      }
      i++;
    }

    
    if(movementComponent.types[i] == 'Rubberband'){
        // need to remove this and also and rebound entry
        movementComponent.types.splice(i,2)
        movementComponent.startPoints.splice(i,2)
        movementComponent.endPoints.splice(i,2)
        movementComponent.initialVelocities.splice(i,2)
        movementComponent.accelerations.splice(i,2)
    } else {
        movementComponent.types.splice(i,1)
        movementComponent.startPoints.splice(i,1)
        movementComponent.endPoints.splice(i,1)
        movementComponent.initialVelocities.splice(i,1)
        movementComponent.accelerations.splice(i,1)
    }
    animationList.removeChild(animationList.children[i])
    animationList.setAttribute('selectedIndex',"")
    updateAnimationUI(selectedEntity,-1)
    movementTypeIn.disabled = true

    updateJSON();
}