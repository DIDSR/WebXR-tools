/* Renames a pattern */
function renamePattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    }
    if(patternList.getAttribute('multi-select') == "true"){
        alert('Multiple patterns selected')
        return
    }
    let patternName = prompt("Enter a pattern name: ")
    if(patternName == null){
        return
    }
    while(patternName == "" ){
        patternName = prompt("Enter a valid pattern name: ")
    }
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(patternName)){
        alert('Pattern name is invalid. '+ patternName +' Limit names to only alphanumerics, - , _ , or spaces.')
        return;
    }
    if(scenes[packageSelect.value][patternName] != null){
        alert('A pattern with this name already exists');
        return;
    }
    oldName = patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id
    currScene = scenes[packageSelect.value][oldName]
    currName = ''
    if(Object.keys(names).indexOf(patternName) == -1){
        names[patternName] = 1
        currName = patternName
    } else {
        names[patternName] = names[patternName] + 1
        currName = patternName+''+names[patternName]
    }
    scenes[packageSelect.value][currName] = currScene
    delete scenes[packageSelect.value][oldName]

    patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id = currName

    if(currName.length > 20){
        patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].innerText = currName.substring(0,20)+"..."
    } else {
        patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].innerText = currName
    }
}