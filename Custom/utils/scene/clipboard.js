/* Handles code related to copying, cutting, and pasting */

// copies a pattern or group of patterns
let clipboard;
function copyPattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    }
    let i = 0;
    indices = []
    while(i < patternList.children.length){
        if(patternList.children[i].style.background == 'rgb(243, 152, 20)'){
            indices.push(i)
        }
        i++;
    }
    clipboard = {}
    indices.forEach(ind => {
        clipboard[patternList.children[ind].id] = scenes[packageSelect.value][patternList.children[ind].id]
    })
}

// pastes a pattern or group of patterns
function pastePattern(){
    if(clipboard == null){
        return;
    }

    Object.keys(clipboard).forEach(name =>{
        currName = name.split(' (')[0];
        if(names[packageSelect.value][currName]){
            currName = currName + ' ('+names[packageSelect.value][currName]+')'
            names[packageSelect.value][name.split(' (')[0]] = names[packageSelect.value][name.split(' (')[0]] + 1

        } else {
            names[packageSelect.value][currName] = 1
        }

        scenes[packageSelect.value][currName] = clipboard[name]
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
    })
    patternList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
      });
    
}

// cuts a pattern or group of patterns
function cutPattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    }
    keysPressed["ctrl"] = false;
    keysPressed["x"] = false;
    copyPattern()
    removePattern()
}
