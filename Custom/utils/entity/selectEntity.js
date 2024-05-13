/* Handles code related to selecting a new entity */

/* selects a new entity for editing*/
function selectNew(clickedEntity){
    /* Check if entity was clicked on or selected via dropdown */
    if(clickedEntity != null){ /* if clicked */
        selectedEntity = clickedEntity; /* updated selected entity */
        entitySelector.value = clickedEntity.getAttribute("id"); /* update dropdown */
    } else { /* if selected via dropdown */
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text()); /* update selected entity */

    }
    /* Update stats in edit section */
    if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
        hideSpecific();
    }
    hideEditStats(); /* hide section briefly */
    updateStats(); /* update stats */
    toggleAddEdit(null); /* re-display section */
    updateAnimationList(selectedEntity)
    if(animationList.childElementCount == 0){
        animationList.setAttribute('selectedIndex',"")
    } else {
        animationList.setAttribute('selectedIndex',0)
    }

    highlightSelection(selectedEntity);
}

// highlights the entity with yellow entity
async function highlightSelection(ent){
    if(block){
        return
    }
    newPos = {x: 0, y: 0, z: -5};
    if(ent.id.includes("plane")){
        let width = (ent.children.length == 0 ? ent.components.geometry.attrValue.width : ent.children[2].components.geometry.attrValue.width)
        newGeom = {primitive: 'plane', width: width*1.5, height: ent.getAttribute('geometry').height*1.5};
    } else if(selectedEntity.id.includes("circle")){
        newGeom = {primitive: 'ring', radiusOuter: ent.getAttribute('geometry').radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("triangle")){
        newGeom = {primitive: 'triangle', vertexA: {x: ent.getAttribute('geometry').vertexA.x*1.5 ,y: ent.getAttribute('geometry').vertexA.y*1.5 ,z: ent.getAttribute('geometry').vertexA.z*1.5}, vertexB: {x: ent.getAttribute('geometry').vertexB.x*1.5 ,y: ent.getAttribute('geometry').vertexB.y*1.5 ,z: ent.getAttribute('geometry').vertexB.z*1.5}, vertexC: {x: ent.getAttribute('geometry').vertexC.x*1.5 ,y: ent.getAttribute('geometry').vertexC.y*1.5 ,z: ent.getAttribute('geometry').vertexC.z*1.5}};
    } else if(selectedEntity.id.includes("checkerboard")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'plane', width: colNum*tileSizeNum*1.5, height: rowNum*tileSizeNum*1.5};
    } else if(selectedEntity.id.includes("gradient")){
        let width = ent.children[0].components.geometry.attrValue.width;
        let height = ent.children[0].components.geometry.attrValue.height;
        let numBars = ent.children.length;
        newGeom = {primitive: 'plane', width: width*numBars*1.25, height: height*1.5};
    } else if(selectedEntity.id.includes("grille")){
        let width = selectedEntity.children[0].components.geometry.attrValue.width;
        let height = selectedEntity.children[0].components.geometry.attrValue.height;
        let numBars = selectedEntity.children.length;
        newGeom = {primitive: 'plane', width: width*numBars*1.25, height: height*1.5};
    } else if(selectedEntity.id.includes("circularDotarray")){
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("dotarray")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    }  else if(selectedEntity.id.includes("bullseye")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("text") || selectedEntity.id.includes("timer")){
        let width = ent.components.text.attrValue.value.length * (ent.components.text.attrValue.width / ent.components.text.attrValue.wrapCount);
        let height = ent.components.text.attrValue.height;
        newGeom = {primitive: 'plane', width: width, height: height};
    }
    
    tmp = document.createElement('a-entity');
    tmp.setAttribute('id','tmp')
    tmp.setAttribute("geometry",newGeom);
    tmp.setAttribute('position',newPos);
    tmp.setAttribute("material", {shader: "flat", color: "#FFFF00"});
    ent.appendChild(tmp);
    await sleep(ent, tmp).then(() => {
        
    });
    
}

function sleep (par1, par2) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(clearHighlight(par1,par2)), 1000)
    })
  }

  async function clearHighlight(ent){
    let i = ent.children.length-1;
    while (i >= 0) {
        if(ent.children[i].getAttribute('id') == 'tmp'){
            ent.children[i].parentNode.removeChild(ent.children[i]);
            i--;
        }
        i--;
    }
}