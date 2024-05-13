/* 
    Handles processes involved in saving scenes alone or in groups.

*/

/* saves single scene in JSON format */
function saveScene(){
    // get all of the current texture options
    let i = 0;
    let arr = [];
    let data = {scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    while(i < texture.options.length){
        arr.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    // add textures and uploaded textures
    data["textures"]['textureValues'] = arr;
    data["textures"]['uploadedTextureFormats'] = uploadedTextureFormat;
    // add single scene
    data['scenes'][patternDisplay.value] = scenes[[patternDisplay.value]]
    // add current date
    data['date'] = new Date().toLocaleString();
    download(data,patternDisplay.value+".JSON","text/plain;charset=utf-8")
}

/* saves package of scenes in JSON format */
function saveSelected(){
    let useTextures = confirm("Include textures?")
    let data = {scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    let i = 0;
    textures = []
    // get all textures
    while(i < texture.options.length){
        textures.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    // add textures
    if(useTextures){
        data['textures']['textureValues'] = textures
        data['textures']['uploadedTextureFormats'] = uploadedTextureFormat
    } else {
        for (const pattern of Object.keys(scenes[packageSelect.value])){
            for (const ent of Object.keys(scenes[packageSelect.value][pattern])){
                if(ent.includes('plane')){
                    scenes[packageSelect.value][pattern][ent].material = {shader: scenes[packageSelect.value][pattern][ent].material.shader, color: scenes[packageSelect.value][pattern][ent].material.color, src: ''}
                }
            }
        }
    }

    // get all scenes
    data['scenes'] = scenes[packageSelect.value]

    // add date
    data['date'] = new Date().toLocaleString();

    data['version'] = version;

    download(data,packageSelect.value+".JSON","text/plain;charset=utf-8");
    pastebinPost(useTextures)
}

// downloads a file
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content, null, '\t')], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}