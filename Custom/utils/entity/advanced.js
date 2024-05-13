/* handles switches to advanced mode */
val = false;
function switchToAdvanced(e){
    e.stopPropagation()
    newVal = !selectedEntity.getAttribute('advanced').val
    selectedEntity.setAttribute('advanced', {val: newVal});
    mov = selectedEntity.getAttribute('movement')
    let i = 0;
    while(i < mov.types.length){
        if(newVal){
            if(mov.endPoints[i].r != null){
                mov.endPoints[i] = {x: -mov.endPoints[i].r*Math.sin((mov.endPoints[i].theta*Math.PI)/180), y: mov.endPoints[i].y, z: mov.endPoints[i].r * Math.cos((mov.endPoints[i].theta*Math.PI)/180)}
                mov.startPoints[i] = {x: -mov.startPoints[i].r*Math.sin((mov.startPoints[i].theta*Math.PI)/180), y: mov.startPoints[i].y, z: mov.startPoints[i].r * Math.cos((mov.startPoints[i].theta*Math.PI)/180)}
            }
        } else {
            if(mov.endPoints[i].r == null){
                mov.endPoints[i] = {r: Math.sqrt(mov.endPoints[i].x*mov.endPoints[i].x+mov.endPoints[i].z*mov.endPoints[i].z), theta: Math.atan(mov.endPoints[i].z/mov.endPoints[i].x), y: mov.endPoints[i].y}
                mov.startPoints[i] = {r: Math.sqrt(mov.startPoints[i].x*mov.startPoints[i].x+mov.startPoints[i].z*mov.startPoints[i].z), theta: Math.atan(mov.startPoints[i].z/mov.startPoints[i].x), y: mov.startPoints[i].y}
            }
        }
        i++;
    }
    selectedEntity.setAttribute('movement',mov)
    endZ.disabled = !endZ.disabled
    advanced.style.backgroundColor == '' ? advanced.style.backgroundColor = '#00FF00' : advanced.style.backgroundColor =''
    updateStats()
  }