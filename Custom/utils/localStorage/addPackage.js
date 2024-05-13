/* Adds packages to local storage.
   Returns true on success and throws an error on failure.
 */
   function manageLocalStorage(key, value){

    let textures = {}

    let textureVals = {};
    for(let i = 0; i < texture.children.length; i++){
        textureVals[texture.children[i].innerText] = texture.children[i].value;
    }

    // find textures being used
    Object.keys(value).forEach((pat) => {
        Object.keys(value[pat]).forEach((el) => {
            // if there is an uploaded texture being used
                // save it and its formatting information
            if(value[pat][el].material && value[pat][el].material.src && value[pat][el].material.src != '' && uploadedTextureFormat[value[pat][el].material.src]){
                let src = textureVals[value[pat][el].material.src];
                let format = uploadedTextureFormat[value[pat][el].material.src]
                if(!textures[value[pat][el].material.src]){
                    textures[value[pat][el].material.src] = [src,format];
                }
            }
        })
    })

    // compress the package content
    value = LZString.compressToBase64(JSON.stringify(value))

    let arr = [value,textures,version]

    // get the contents of localStorage
    let localScenes = JSON.parse(localStorage.getItem('packages'))

    // check if replacing existing package
    let ind = null;
    let j = 0;
    localScenes.forEach((package) => {
        let name = Object.keys(package)[0]
        if(encodeURIComponent(key.split(' (')[0]) == key.split(' (')[0]){
            // check for exact name match
            if(name.split(' (')[0] === key.split(' (')[0]){
                ind = j
            }
        } else {
            // check for link match
            if(name.includes(key.split('(')[1].split(')')[0])){
                ind = j
            }
        }
        j++;
    })



    sum = 0;
    let max = localScenes.length-1
    for(let i = 0; i < max; i++){
        if(ind && i == ind){
            continue;
        }
        sum += ByteSize(localScenes[i])
    }


    // create the object
    let packageToInsert = {}
    packageToInsert[key] = arr

    console.log(packageToInsert)
    // strinify the object 
    let stringified = JSON.stringify(packageToInsert)

    // check if package is larger than localStorage space allocation
    // 2 comes from the opening and closing braces []
    if(ByteSize(stringified) >= 5242880-2){
        alert('The package '+key+' is too large to save.')
        return false
    }

    // if we have space

    // check if we are replacing an existing package with a new one
    if(ind != null){
        // prompt if this is ok
        let allowDelete = confirm('This process will replace the saved package: \n'+ Object.keys(localScenes[ind])[0]+'\nPress OK to confirm.')
        if(!allowDelete){
            return true
        }
        localScenes.splice(ind,1)
        max--;
    } else {
        let deleteCount = 0
        if(localScenes.length == 20 && sum + 2 + ByteSize(stringified) < 5242880){
            // insert without deleting
            deleteCount++;
            max--;
        } else if(sum + 2 + ByteSize(stringified) >= 5242880){
            // check how many we would need to delete
            // not optimal
            while(sum + 2 + ByteSize(stringified) >= 5242880){
                sum -= ByteSize(JSON.stringify(localScenes[max]))
                deleteCount++;
                max--;
            }

        }

        // check if user permits delete and then proceed
        if(deleteCount > 0){
            let allowDelete = confirm('This process will delete '+ deleteCount +' previously saved packages. Press OK to confirm.')
            if(!allowDelete){
                return true
            }
            localScenes.splice(max+1,deleteCount)
        }
        
    }
    
    // add package to the beginning of localStorage array
    localScenes.unshift(packageToInsert)
    localStorage.setItem('packages',JSON.stringify(localScenes))

    return true; // return success
}

// Called when a package is selected from one of the local storage options
async function changeUrl(){
    if(recentPackages.value == "none"){
        return
    }
    // only 10 packages allowed in the browser at once
    if(packageSelect.options.length == 10){
        alert('There are already 10 packages.')
        return;
    }

    // get contents of local storage
    let localArr = JSON.parse(localStorage.getItem('packages'))

    

    // get the desired package from localStorage
    let key = Object.keys(localArr[recentPackages.selectedIndex])[0]
    

    if(localArr[recentPackages.selectedIndex][key][2] < version){
        alert('Package is out of date. You might need to remake it.')
    }

    // prompt user for a name for the package and validate the input
    let packageName = prompt("Enter a name for this package: ", key)
    const re = /^[a-zA-Z0-9-_ ]+$/
    while(packageName == null || packageName == "" || !re.test(packageName) || scenes[packageName] != null){
        if(packageName == null){
            return
        } else if(packageName == ""){
            packageName = prompt("Enter a valid package name: ")
        } else if(!re.test(packageName)){
            packageName = prompt('Package name is invalid. Limit names to only alphanumerics, - , _ , or spaces.')
        } else if(scenes[packageName] != null){
            packageName = prompt('A pattern with this name already exists');
        } 
    
    }
    
    // add the selected package to the options list
    packageSelect.options.add(new Option(packageName,packageName))
    packages[packageName] = ''
    scenes[packageName] = JSON.parse(LZString.decompressFromBase64(localArr[recentPackages.selectedIndex][key][0]))
    packageSelect.value = packageName

    // read in the uploaded textures and add them to the existing collection
    let len2 = texture.options.length;
    currTextures = []
    while(i < len2){
        currTextures.push(texture.options[i].text)
        i++;
    }
    i = 0;

    uploadedTextures = []
    newUploadedTextureFormats = []
    Object.keys(localArr[recentPackages.selectedIndex][key][1]).forEach((texture) => {
        uploadedTextures.push(texture)
        newUploadedTextureFormats.push(texture)
    })
    newTextures = [...new Set([...uploadedTextures,...currTextures])]
    newTextures.forEach(text => {

        if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
            var option = document.createElement("option"); 
            option.text = text
            option.value = localArr[recentPackages.selectedIndex][key][1][text][0]
            texture.add(option);
        }
        

    })

    // combines uploaded textures in uploaded file and current file
    newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...newUploadedTextureFormats])]
    tmp = {}
    newUploadedTextureFormat.forEach(texture => {
        if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
            tmp[texture] = uploadedTextureFormat[texture]
        } else {
            tmp[texture] = localArr[recentPackages.selectedIndex][key][1][texture][1]
        }
    });
    uploadedTextureFormat = tmp


    // update the link
    if(!key.includes('(upload)') && !window.location.href.includes(key.split('(')[1].split(')')[0])){
        if(!window.location.href.includes('?')){
            let newURL = window.location.href + "?id=" +key.split('(')[1].split(')')[0]
            window.history.pushState('object', document.title, newURL);
        } else {
            let newURL = '';
            newURL = window.location.href + "," +key.split('(')[1].split(')')[0]
            window.history.pushState('object', document.title, newURL);
        }
    }

    changePackage(); // invoke the function to change packages to the selected option
}

// condensed function to get size of a string
function ByteSize(str){
    return new Blob([str]).size
}