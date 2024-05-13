/* resets current scene */
function resetScene(){
    let conf = confirm("Reset the selected pattern?");
    if(!conf){
        return
    }
    planeNum = 0;
    circleNum = 0;
    triangleNum = 0;
    gradientNum = 0;
    checkerboardNum = 0;
    grilleNum = 0;
    dotarrayNum = 0;
    circularDotarrayNum = 0;
    bullseyeNum = 0;
    timerNum = 0;
    textNum = 0;
    stopAllMovement();
    movementKeyBinds = {}
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
    } 
    while(entitySelector.childElementCount != 0){
        entitySelector.remove(entitySelector.children[0])
   }
    movementIcon.className = "fa-solid fa-play"
    $('#skyCol').minicolors('value', '#000000');
    els = []
    updateJSON()
    selectedEntity = null
}

/* function used to remove changes made to a scene */
function revertChanges(){
    sky.setAttribute('material',{color: '#000000'})
    stopAll()
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
       }
       while(entitySelector.childElementCount != 0){
            entitySelector.remove(entitySelector.children[0])
       }
        els = []
        pool = []
        circleNum = 0; /* number of circles created */
        planeNum = 0; /* number of planes created */
        triangleNum = 0; /* number of triangles created */
        gradientNum = 0; /* number of gradients created */
        checkerboardNum = 0; /* number of checkerboards created */
        grilleNum = 0;
        dotarrayNum = 0;
        circularDotarrayNum = 0;
        bullseyeNum = 0;
        textureNum = 0;
        timerNum = 0;
        textNum = 0;
        numAdded = 0;
        selectedEntity = null;
        movementKeyBinds = {}
}