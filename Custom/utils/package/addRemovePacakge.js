/* Handles code related to adding or removing packages  */

// adds a package
function addPackage(){
    flag = false;
    let i = 0;
    if(packageSelect.options.length == 10){
        alert('There are already 10 packages.')
        return;
    }
    let packageName = prompt("Enter a package name: ");
    if(packageName == null){
        return
    }
    while(packageName == ""){
        packageName = prompt('Please enter a valid package name');
    }
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(packageName)){
        alert('Package name is invalid. '+ packageName +' Limit names to only alphanumerics, -, _, or spaces.')
        return;
    }
    if(scenes[packageName] != null){
        alert('A package with this name already exists');
        return;
    }
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == packageName){
            alert('A package with this name already exists');
            return
        }
        i++;
    }

    packageSelect.options.add(new Option(packageName,packageName))
    packages[packageName] = ''
    scenes[packageName] = {}
    names[packageName] = {}
    packageSelect.value = packageName
    changePackage();
}

// removes a package
function removePackage(){
    if(packageSelect.value == ''){
        alert('No package selected')
        return
    }
    let conf = confirm("Delete the selected package: "+packageSelect.value);
    packageName = packageSelect.value
    if(!conf){
        return
    }
    i = 0;
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == packageName){
            packageSelect.remove(i)
        }
        i++;
    }
    while(patternList.childElementCount != 0){
        patternList.removeChild(patternList.children[0])
    }
    delete scenes[packageName]
    delete names[packageName]
    revertChanges()
    if(packageSelect.value != ''){
        changePackage();
    }
    patternList.setAttribute('selectedIndex',null);
    if(packages[packageName] != ''){
        let newURL = window.location.href.replace(","+encodeURIComponent(packages[packageName]),'')
        newURL = newURL.replace(encodeURIComponent(packages[packageName])+",",'')
        newURL = newURL.replace(encodeURIComponent(packages[packageName]),'')
        if(newURL.split("?id=")[1] == ''){
            newURL = newURL.split("?id=")[0]
        }
        window.history.pushState('object', document.title, newURL);
    }
    delete packages[packageName]
}