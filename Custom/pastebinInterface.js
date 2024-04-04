// Contains all code that interfaces with the pastebin.run API and local storage


/* On page load, fetch all packages that are contained within the link.
   Local storage is updated to reflect links. */

window.onload = async function() {
    // on page load get rid of the aframe cursor
    scene.canvas.classList.remove("a-grab-cursor")

    // if there is nothing in localStorage, instantiate an empty packages array
       if(localStorage.getItem('packages') == null){
        localStorage.setItem('packages',JSON.stringify([]))
    }

    // go through url and fetch desired packages
    let thisPage = new URL(window.location);
    if(thisPage.searchParams.size != 0){
        // for each search parameter
        for (const id of thisPage.searchParams.get('id').split(',')) {
            //if the parameter is a pastebin id

            if(encodeURIComponent(id) == id){
                const res = await pastebinFetch('https://didsr.pythonanywhere.com/webxrtools/get?id='+id,true);
            } else {
                // otherwise the id is an uploaded link
                const res = await pastebinFetch(decodeURIComponent(id),true);
            }
        }
    }




    // fetch the packages array from localStorage
    let localArr = JSON.parse(localStorage.getItem('packages'))

    // for each package in the array
    localArr.forEach((package) => {
        // get the name of the package
        let key = Object.keys(package)[0]
 
        // add the package as an option to the recent pacakages dropdown
        var option = document.createElement("option");
        option.text = key.split(' (')[0]
        option.value = key
        recentPackages.add(option);

    })
    recentPackages.selectedIndex = -1 // ensure that there are no selected recent packages
    
    // update the names dictionary for the default package on load
    // done dynamically since we add/remove default patterns
    let patternNames = Object.keys(scenes['default']);
    patternNames.forEach((patternName) => {
        // check if we have some type of name like test (1) and remove the (1)
        if(patternName.split(' (').length > 1){
            patternName = patternName.split(' (')[0]
        }
        names['default'][patternName] = names['default'][patternName] ? names['default'][patternName] + 1 : 1;
    })

    
  };

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

// function to compress textures (unused right now)
function compressTextures(textures){
    textures.forEach( texture => {
        if(texture['val'].split("url(data:image/png;base64").length > 1){
            // compress texture and post it
            // save id as pastebin(<id>)
            let compressed = LZString.compressToBase64(texture.val.split(',')[1].split(')')[0])
            let code = {name: texture['name'], val: texture.val.split(',')[1].split(')')[0]}
            //console.log(texture.val.split(',')[1].split(')')[0])
            fetch('https://pastebin.run/api/v1/pastes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: "code="+JSON.stringify(code)
            })
            .then(response => {return response.text()}).then( async function (text) {
                try {
                    alert("URL copied to clipboard: "+ text);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            })
                }
            }).catch((error) => alert('Failed to import from: '+url+' with error '+error))
}


/* Posts content to pastebin.
   Navigates to new link on success and returns false on failure. */
async function pastebinPost(useTextures){
    // create object to be posted
    let code = {filename: packageSelect.value, scenes: JSON.parse(JSON.stringify(scenes[packageSelect.value])), textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}

    // if we want to save textures
    if(useTextures){
        // get all textures
        textures = []
        i = 0;
        while(i < texture.options.length){
            textures.push({val: texture.options[i].value, text: texture.options[i].text});
            i++;
        }
        code['textures']['textureValues'] = textures
        code['textures']['uploadedTextureFormats'] = uploadedTextureFormat
    } else {
        // clear all textures
        console.log(code)
        for (const pattern of Object.keys(code['scenes'])){
            for (const ent of Object.keys(code['scenes'][pattern])){
                if(ent.includes('plane')){
                    code['scenes'][pattern][ent].material = {shader: code['scenes'][pattern][ent].material.shader, color: code['scenes'][pattern][ent].material.color, src: ''}
                }
            }
        }
    }

    // save date
    code['date'] = new Date().toLocaleString();

    // check size of package to ensure it can be posted
    const size = new TextEncoder().encode(JSON.stringify(code)).length;
    console.log('Package size: '+size)
    /*if(size > 100000){
        // if too large then alert and abort
        alert('Package is too large, no link can be generated');
        
        return false
    }*/

    // attempt to post package
    let response = await fetch('https://didsr.pythonanywhere.com/webxrtools/share', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(code)
    }).catch((error) => alert('Failed to post with error:\n '+error));

    if(!response.ok){
        console.log(response)
        alert('Failed to post with error:\n '+response.status+"\n"+response.statusText)
        return
    } 

    let text = await response.text();

    try {
        // update the link and copy the code to the clipboard
        let thisPage = new URL(window.location);
        newUrl = thisPage.origin+thisPage.pathname+"?id="+text
        // store the package in local storage
        manageLocalStorage(packageSelect.value+" ("+text+")", scenes[packageSelect.value]);
        tmp = packages[packageSelect.value]
        packages[packageSelect.value] = text
        await navigator.clipboard.writeText(newUrl);
        alert("URL copied to clipboard: "+ newUrl);
        if(!window.location.href.includes('?')){
            let newURL = window.location.href + "?id=" +text
            window.history.pushState('object', document.title, newURL);
        } else {
            let newURL = '';
            if(tmp != null && tmp != ''){
                newURL = window.location.href.replace(tmp,text)
            } else {
                newURL = window.location.href + "," +text
            }
            console.log(newURL)
            window.history.pushState('object', document.title, newURL);
        }
      } catch (err) {
        console.error('Failed to copy: ', err);
        return false
      }
   }


/* Adds packages to local storage.
   Returns true on success and throws an error on failure.
 */
function manageLocalStorage(key, value){
    console.log('key '+key)

    // compress the package content
    value = LZString.compressToBase64(JSON.stringify(value))

    // get the contents of localStorage
    let localScenes = JSON.parse(localStorage.getItem('packages'))

    // check if replacing existing package
    let ind = null;
    let j = 0;
    localScenes.forEach((package) => {
        let name = Object.keys(package)[0]
        console.log(name)
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
    packageToInsert[key] = value
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
        console.log(ind)
        let allowDelete = confirm('This process will replace the saved package: \n'+ Object.keys(localScenes[ind])[0]+'\nPress OK to confirm.')
        if(!allowDelete){
            return true
        }
        localScenes.splice(ind,1)
        console.log("Local Scenes")
        console.log(localScenes)
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
    scenes[packageName] = JSON.parse(LZString.decompressFromBase64(localArr[recentPackages.selectedIndex][key]))
    packageSelect.value = packageName

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

