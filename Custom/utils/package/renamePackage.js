/* Renames a package */
function renamePackage(){
    if(packageSelect.options.length == 0){
        alert('No package selected')
        return
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


    oldName = packageSelect.value
    currPackage = scenes[packageSelect.value]
    
    scenes[packageName] = currPackage
    delete scenes[packageSelect.value]
    packageSelect.options[packageSelect.selectedIndex].value = packageName
    packageSelect.options[packageSelect.selectedIndex].text = packageName

}