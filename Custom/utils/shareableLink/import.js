// Contains all code relating to the implementation of the sharing feature

/* Called when a link is provided for import.
   Determines if the link is valid and calls appropriate handler.
   Returns true on success and false on failure. */
   async function handleImport(){
    let thisPage = new URL(window.location);
    if(packageSelect.options.length == 10){
        alert('There are already 10 packages.')
        return;
    }
    let url = prompt('Enter the provided url: ');
    if(url == null){
        return null;
    }
    
    // handle links that come from the tool itself
    if(url.includes(thisPage.origin) && url.includes('?id=')){
        let res = await localLinkImport(url).then( (res) => {
            if(res){
                let ids = url.split("?id=")[1]
                if(!window.location.href.includes('?')){
                    let newURL = window.location.href + "?id=" +ids
                    window.history.pushState('object', document.title, newURL);
                } else {
                    let newURL = window.location.href + "," +ids
                    window.history.pushState('object', document.title, newURL);
                }
                
                alert('Success')
                return true;
            } else {
                alert('Invalid link');
                return false;
            }
        })
        return res;
    } else { // handle links that host valid JSON content
        let res = await validateLink(url).then( async (res) => {
            if(res){
                let res2 = await pastebinFetch(url).then((res) => {
                    return res;
                })
                if(res2){
                    if(url.includes('https://didsr.pythonanywhere.com/webxrtools/get?id=')){
                        if(!window.location.href.includes('?')){
                            let newURL = window.location.href + "?id=" +url.split("https://didsr.pythonanywhere.com/webxrtools/get?id=")[1]
                            window.history.pushState('object', document.title, newURL);
                        } else {
                            let newURL = window.location.href + "," +url.split("https://didsr.pythonanywhere.com/webxrtools/get?id=")[1]
                            window.history.pushState('object', document.title, newURL);
                        }
                    } else {
                        if(!window.location.href.includes('?')){
                            let newURL = window.location.href + "?id=" +encodeURIComponent(url)
                            window.history.pushState('object', document.title, newURL);
                        } else {
                            let newURL = window.location.href + "," +encodeURIComponent(url)
                            window.history.pushState('object', document.title, newURL);
                        }
                    }
                    
                    alert('Success')
                    return true;
                }
                alert.log('Handling failed')
                return false;
            } else {
                alert('Invalid link');
                return false;
            }
        })
        return res;
    }

}

/* Handles links that originate from the tool.
   Returns true on success and false on failure. */
async function localLinkImport(url){
    ids = url.split('?id=')[1].split(',');
    let i = 0;
    while(i < ids.length){
        var res = pastebinFetch("https://didsr.pythonanywhere.com/webxrtools/get?id="+ids[i]).then((result) => {
            return result
        });
        if(!res){
            return res
        }
        i++;
    }
    return true
}

/* Handles links that don't originate from the tool.
   Returns true on success and false on failure. */
async function validateLink(url){
    var fileContent = await fetch(url).then((res) => {
        if(res.ok != true){
            return null
            
        } else {
           return res.json()
        }
    }).catch((error) => alert('Failed to fetch from: '+url+' with error '+error));
    return validateJSON(fileContent)

}

/* Fetches content from pastebin or another valid JSON link.
   Returns true on success and false on failure. */
   defaultNum = 1;
async function pastebinFetch(url,onload){
    
    // fetch contents of JSON at url if it exists
    var fileContent = await fetch(url).then((res) => {
        if(res.ok != true){
            return null
                
            } else {

            return res.json()
        }
     }).catch((error) => alert('Failed to import from: '+url+' with error '+error));

     // if there is no json object then alert and return
    if(fileContent == null){
        alert('No package found')
        return false;
    }

    if(!validateJSON(fileContent)){
        alert('Invalid Package')
        return false;
    }
    
    let currVer = fileContent['version'] ? fileContent['version'] : 1.0
    if(currVer < version){
        alert('Package is out of date. You might need to remake it.')
    }
    
    // Begin name validation

    const re = /^[a-zA-Z0-9-_ ]+$/ // checks that names contain only alphanumerics, dash, underscore, or spaces

    // filename is present for pastebin files, otherwise it is a different link
    if(fileContent['filename']){ 
        
        if(!re.test(fileContent['filename'])){ 
            // failed regex validation indicating the file may have been tampered with
            // since this name is not possible in the first place
            alert('Package name is invalid. '+fileContent['filename']+' Limit names to only alphanumerics, -, _, or spaces.')
            return false;
        }

        // check if there is already a package that has this name
        if(packages[fileContent['filename']] != null){
            // get a new name and continously check validate it until it passes or user aborts
            let packageName = prompt('A package with the name '+ fileContent['filename'] +' already exists. Enter a new name for the package: ')
            while(packageName == null || packageName == "" || !re.test(packageName) || scenes[packageName] != null){
                if(packageName == null){
                    return
                } else if(packageName == ""){
                    packageName = prompt("Enter a valid package name: ")
                } else if(!re.test(packageName)){
                    packageName = prompt('Package name is invalid. '+ packageName +' Limit names to only alphanumerics, - , _ , or spaces.')
                } else if(scenes[packageName] != null){
                    packageName = prompt('A package with this name already exists. Enter a new name for the package: ');
                } 
            } 
            fileContent['filename'] = packageName
        }
        
    } else {
        // the link provided was not from pastebin

        // get a new name and continously check validate it until it passes or user aborts
        let packageName = prompt('Enter a name for this package: ')
        while(packageName == null || packageName == "" || !re.test(packageName) || scenes[packageName] != null){
            if(packageName == null){
                return
            } else if(packageName == ""){
                packageName = prompt("Enter a valid package name: ")
            } else if(!re.test(packageName)){
                packageName = prompt('Package name is invalid. '+ packageName +' Limit names to only alphanumerics, - , _ , or spaces.')
            } else if(scenes[packageName] != null){
                packageName = prompt('A package with this name already exists. Enter a new name for the package: ');
            } 
        } 
        fileContent['filename'] = packageName
    }

    names[fileContent['filename']] = {} // create new dictionary in names object to store names of patterns in requested file

    // Validate each pattern name in the package
    for (const [name, value] of Object.entries(fileContent['scenes'])) {
        const re = /^[a-zA-Z0-9-_ ]+( \([0-9]+\))?$/ // regex to check for a name like test_one-2 (1)

        if(!re.test(name)){
            // failed regex validation indicating the file may have been tampered with
            // since this name is not possible in the first place
            alert('Pattern name is invalid. '+name+' Limit names to only alphanumerics, -, _, or spaces.')
            delete names[fileContent['filename']]
            return false;
        }

        // update name dictionary
        currName = name.split(' (')[0];
        if(names[fileContent['filename']][currName]){
            currName = currName + ' ('+names[fileContent['filename']][currName]+')'
            names[fileContent['filename']][name.split(' (')[0]] = names[fileContent['filename']][name.split(' (')[0]] + 1
        } else {
            names[fileContent['filename']][currName] = 1
        }
    }

    // handle local storage updates
    if(url.split("https://didsr.pythonanywhere.com/webxrtools/get?id=").length > 1){
        // if link came from pastebin, then only save pastebin id
        let out = manageLocalStorage(fileContent['filename'] + " ("+url.split("https://didsr.pythonanywhere.com/webxrtools/get?id=")[1]+")", fileContent['scenes'])
        if(out == false){
            return false;
        }
        packages[fileContent['filename']] = url.split("https://didsr.pythonanywhere.com/webxrtools/get?id=")[1]// save id in packages
    } else {
        // if link is not from pastebin, save entire link address
        let out = manageLocalStorage(fileContent['filename'] + " ("+encodeURIComponent(decodeURIComponent(url))+")", fileContent['scenes'])
        if(out == false){
            return false;
        }
        packages[fileContent['filename']] = url
    } 
    scenes[fileContent['filename']] = fileContent['scenes']
    
    // update list of textures
    textures = fileContent['textures']['textureValues'] // texture images
    uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats'] // texture aspect ratios

    // merge incoming and existing textures
    let i = 0;
    let len = texture.options.length;
    currTextures = []
    while(i < len){
        currTextures.push(texture.options[i].text)
        i++;
    }
    i = 0;
    uploadedTextures = []
    while(i < textures.length){
        uploadedTextures.push(textures[i].text)
        i++;
    }
    newTextures = [...new Set([...uploadedTextures,...currTextures])]
    newTextures.forEach(text => {
        var option = document.createElement("option"); 
        if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
            option.text = textures[uploadedTextures.indexOf(text)].text
            option.value = textures[uploadedTextures.indexOf(text)].val
            texture.add(option);
        }
    })

    // merge incoming and existing texture formats
    newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(uploadedTextureFormats)])]
    tmp = {}
    newUploadedTextureFormat.forEach(texture => {
        if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
            tmp[texture] = uploadedTextureFormat[texture]
        } else {
            tmp[texture] = uploadedTextureFormats[texture]
        }
    });
    uploadedTextureFormat = tmp
    flag = false;
    
    // add option to packageSelect
    packageSelect.options.add(new Option(fileContent['filename'],fileContent['filename']))
    packageSelect.value = fileContent['filename']
    
    changePackage() // invokes the function change packages to the uploaded one
    return true; // returns success
}
