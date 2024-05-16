/* Contains code to add or remove patterns */

/* adds a pattern to pattern list */
function addPattern(){
    if(packageSelect.value == ''){
        alert('No package selected')
        return
    }
    let patternName = prompt("Enter a pattern name: ")
    if(patternName == null){
        return
    }
    while(patternName == ""){
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

    currName = ''
    if(!names[packageSelect.value][patternName]){
        names[packageSelect.value][patternName] = 1
        currName = patternName
    } else {
        currName = patternName+' ('+names[packageSelect.value][patternName]+')'
        names[packageSelect.value][patternName] = names[packageSelect.value][patternName] + 1
    }
    let textContent = currName;
    if(currName.length > 20){
        textContent = currName.substring(0,20)+"..."
    }
    scenes[packageSelect.value][currName] = {sky: {skyColor: '#000000'}}
    var toggle_button = '<li id="'+currName+'">'+textContent+'</li>';

    $('#items-list').append(toggle_button)
    
    item = document.getElementById(currName)
    $(item).prop('draggable', true)
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropped)
    item.addEventListener('dragenter', cancelDefault)
    item.addEventListener('dragover', cancelDefault)
    item.addEventListener('click',selectPattern)
    
    patternList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
      });
      patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
}

/* removes current pattern from pattern list */
function removePattern(){
    if(patternList.childElementCount == 0 || isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    } 
    let conf = confirm("Delete the selected pattern?");
    if(!conf){
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
    children = []
    let childrenNames = []
    revertChanges()
    indices.forEach(ind => {
        delete scenes[packageSelect.value][patternList.children[ind].id]
        childrenNames.push(patternList.children[ind].id)
        children.push(patternList.children[ind])
    })

    childrenNames.sort((a,b) => { a.localeCompare(b) }).reverse()

    console.log(childrenNames)
    childrenNames.forEach((name) => {
        if(name.split('(').length > 1 && 
            Number(name.split('(')[1].split(')')[0]) == names[packageSelect.value][name.split(' (')[0]]-1){
                names[packageSelect.value][name.split(' (')[0]] = names[packageSelect.value][name.split(' (')[0]]-1;
        } else if(names[packageSelect.value][name] == 1){
            delete names[packageSelect.value][name]
        } 
    })

    children.forEach(child =>{
        patternList.removeChild(child)
    })
    patternList.setAttribute('selectedIndex',null);
}