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
    if(!names[packageSelect.value][patternName]){
        names[patternName] = 1
        currName = patternName
    } else {
        currName = patternName+''+names[packageSelect.value][patternName]
        names[packageSelect.value][patternName] = names[packageSelect.value][patternName] + 1
        
    }

    if(names[packageSelect.value][oldName] == 1){
        delete names[packageSelect.value][oldName]
    } else if(oldName.split('(').length > 1 && 
        Number(oldName.split('(')[1].split(')')[0]) == names[packageSelect.value][oldName.split(' (')[0]]-1){
            names[packageSelect.value][oldName.split(' (')[0]] = names[packageSelect.value][oldName.split(' (')[0]]-1;
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