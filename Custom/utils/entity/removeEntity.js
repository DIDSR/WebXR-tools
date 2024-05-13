/* Removes current entity */
function removeEntity(){
    if(selectedEntity == null){
        alert('No entities added');
        return
    }
    let conf = confirm("Delete the selected entity?");
    if(!conf){
        return
    }
    els.splice(els.indexOf(selectedEntity),1);
    pool.splice(pool.indexOf(selectedEntity.object3D),1);
    entityCanvas.removeChild(selectedEntity);
    for (var i=0; i<entitySelector.length; i++) {
        if (entitySelector.options[i].value == selectedEntity.id)
            entitySelector.remove(i);
    }
    if(els.length == 0){
        utility.checked = false;
        toggleAddEdit(true);
        selectedEntity = null;
    } else {
        selectNew(null);
    }
    numAdded--;
    updateJSON()
}