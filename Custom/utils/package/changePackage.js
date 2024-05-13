/* Selects a new package */
function changePackage(){
    let i = 0;
    patternList.setAttribute('selectedIndex',"")
    while(patternList.children.length != 0){
        patternList.removeChild(patternList.children[0])
    }
    Object.keys(scenes[packageSelect.value]).forEach(currName =>{
        let textContent = currName;
        if(currName.length > 20){
            textContent = currName.substring(0,20)+"..."
        }

        var toggle_button = '<li id="'+currName+'">'+textContent+'</li>';
 
        
        $('#items-list').append(toggle_button)
        
        item = document.getElementById(currName)
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
        item.addEventListener('click',selectPattern)
    }
    )
    revertChanges()
}