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

    code['version'] = 1.0

    // check size of package to ensure it can be posted
    const size = new TextEncoder().encode(JSON.stringify(code)).length;

    // attempt to post package
    let response = await fetch('https://didsr.pythonanywhere.com/webxrtools/share', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(code)
    }).catch((error) => alert('Failed to post with error:\n '+error));

    if(!response.ok){
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
            window.history.pushState('object', document.title, newURL);
        }
      } catch (err) {
        console.error('Failed to copy: ', err);
        return false
      }
   }