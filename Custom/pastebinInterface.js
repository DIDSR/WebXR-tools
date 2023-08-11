// Contains all code that interfaces with the pastebin.run API

/* On page load, fetch all packages that are contained within the link.
   Local storage is updated to reflect links. */
   packages = {default: ''}
window.onload = async function() {
    scene.canvas.classList.remove("a-grab-cursor")
    let thisPage = new URL(window.location);

    if(thisPage.searchParams.size != 0){
        
        //let id = window.location.href.split(window.location.origin+'/Custom/index.html?id=')[1].split(',').forEach( async id => {
            for (const id of thisPage.searchParams.get('id').split(',')) {
            //console.log(id)
                if(decodeURIComponent(id) == id){
                    const res = await pastebinFetch('https://pastebin.run/'+id+'.txt',true);
                } else {
                    const res = await pastebinFetch(decodeURIComponent(id),true);
            }
        }
    }


   
    
    let i = 1;
    while(i < localStorage.length){
        var option = document.createElement("option");
        option.text = localStorage.getItem("key"+i)
        recentPackages.add(option);
        i++;
    }
    recentPackages.selectedIndex = -1
    
  };

/* Fetches content from pastebin or another valid JSON link.
   Returns true on success and false on failure. */
   defaultNum = 1;
async function pastebinFetch(url,onload){
var fileContent = await fetch(url).then((res) => {
        if(res.ok != true){
            return null
            
        } else {
            //console.log(url)
           return res.json()
        }
    }).catch((error) => alert('Failed to import from: '+url+' with error '+error));

    if(fileContent == null){
        alert('No package found')
        return false;
    }
    //console.log(fileContent['filename'])
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(fileContent['filename'])){
        alert('Package name is invalid. '+fileContent['filename']+' Limit names to only alphanumerics, -, _, or spaces.')
        return false;
    }
    if(packages[fileContent['filename']] != null){
        if(onload && fileContent['filename'] == 'default'){
            fileContent['filename'] = 'default ('+ defaultNum++ +')'
        } else {
            alert('A package with this name already exists')
            return false;
        }
    }
    names[fileContent['filename']] = {}
    for (const [name, value] of Object.entries(fileContent['scenes'])) {
        const re = /^[a-zA-Z0-9-_ ]+( \([0-9]+\))?$/
        if(!re.test(name)){
            alert('Pattern name is invalid. '+name+' Limit names to only alphanumerics, -, _, or spaces.')
            delete names[fileContent['filename']]
            return false;
        }
        currName = name.split(' (')[0];
        if(names[fileContent['filename']][currName]){
            currName = currName + ' ('+names[fileContent['filename']][currName]+')'
            names[fileContent['filename']][name.split(' (')[0]] = names[fileContent['filename']][name.split(' (')[0]] + 1
        } else {
            names[fileContent['filename']][currName] = 1
        }
      }
    if(url.split("https://pastebin.run/").length > 1){
        let out = manageLocalStorage(fileContent['filename'] + " ("+url.split("https://pastebin.run/")[1].split(".txt")[0]+")")
        if(out == false){
            return false;
        }
        packages[fileContent['filename']] = url.split("https://pastebin.run/")[1].split(".txt")[0]
    } else {
        let out = manageLocalStorage(fileContent['filename'] + " ("+encodeURIComponent(url)+")")
        if(out == false){
            return false;
        }
        packages[fileContent['filename']] = url
    }
    console.log(localStorage)
    
    scenes[fileContent['filename']] = fileContent['scenes']
    


    textures = fileContent['textures']['textureValues']
    uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']

    let arr = Object.keys(scenes)
    let len = arr.length
    let i = 0;
    let len2 = texture.options.length;
    currTextures = []
    while(i < len2){
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
    i = 0;
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == fileContent['filename']){
            alert('A package with this name already exists');
            return false;
        }
        i++;
    }
    
    packageSelect.options.add(new Option(fileContent['filename'],fileContent['filename']))
    packageSelect.value = fileContent['filename']
    changePackage()
    return true;
}

// function to compress textures (unused)
function compressTextures(textures){
    textures.forEach( texture => {
        if(texture['val'].split("url(data:image/png;base64").length > 1){
            // compress texture and post it
            // save id as pastebin(<id>)
            //let compressed = LZString.compressToBase64(texture.val.split(',')[1].split(')')[0])
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
    textures = []
    // get all textures
    i = 0;
    while(i < texture.options.length){
        textures.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    let code = {filename: packageSelect.value, scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    
    //let compressedTextures = compressTextures(textures);
    if(useTextures){
        code['textures']['textureValues'] = textures
        code['textures']['uploadedTextureFormats'] = uploadedTextureFormat
    } else {
        for (const pattern of Object.keys(scenes[packageSelect.value])){
            for (const ent of Object.keys(scenes[packageSelect.value][pattern])){
                if(ent.includes('plane')){
                    scenes[packageSelect.value][pattern][ent].material = {shader: scenes[packageSelect.value][pattern][ent].material.shader, color: scenes[packageSelect.value][pattern][ent].material.color, src: ''}
                }
            }
        }
    }
    code['scenes'] = scenes[packageSelect.value]

    // add date
    code['date'] = new Date().toLocaleString();
    const size = new TextEncoder().encode(JSON.stringify(code)).length
    if(size >= 9995){
        alert('Package is too large, no link can be generated');
        return false
    }
    await fetch('https://pastebin.run/api/v1/pastes', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: "code="+JSON.stringify(code)
})
   .then(response => {return response.text()}).then( async function (text) {
    try {
        let thisPage = new URL(window.location);
        newUrl = thisPage.origin+thisPage.pathname+"?id="+text
        manageLocalStorage(packageSelect.value+" ("+text+")");
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
                console.log('test')
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
   }).catch((error) => alert('Failed to post with error '+error))
}

/* Adds packages to local storage.
   Returns true on success and throws an error on failure.
 */
function manageLocalStorage(key){
    //console.log(key)
    let i = localStorage.length < 11 ? localStorage.length : 10;
    while(i > 0){
        localStorage.setItem("key"+i,localStorage.getItem("key"+(i-1)))
        i--;
    }
    localStorage.setItem("key1",key)
    i = 2;
    while(i < localStorage.length){
        if(localStorage.getItem("key"+i) == key){
            // delete current entry and shift everything down
            while(i < localStorage.length-1){
                localStorage.setItem("key"+i,localStorage.getItem("key"+(i+1)))
                i++;
            }
            localStorage.removeItem("key"+(localStorage.length-1))
            break;
        }
        i++;
    }
    //console.log(localStorage)
    return true;
}

// Called when a package is selected from the local storage options
async function changeUrl(){
    if(recentPackages.value == "none"){
        return
    }
    if(packageSelect.options.length == 10){
        alert('There are already 10 packages.')
        return;
    }
    let url = recentPackages.value.split('(')[1].split(')')[0];
    if(decodeURIComponent(url) != url){
        url = decodeURIComponent(url)
    } else {
        url = 'https://pastebin.run/'+url+'.txt'
    }
    await pastebinFetch(url).then( res => {
        if(res){
            if(!window.location.href.includes('?')){
                let newURL = window.location.href + "?id=" +recentPackages.value.split('(')[1].split(')')[0]
                window.history.pushState('object', document.title, newURL);
            } else {
                let newURL = window.location.href + "," +recentPackages.value.split('(')[1].split(')')[0]
                window.history.pushState('object', document.title, newURL);
            }
        }
    })
    
}

