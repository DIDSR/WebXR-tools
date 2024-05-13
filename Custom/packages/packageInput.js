/* Contains code that loads in a package  */

finished = false
var ind = 0
var block = false
var fileName;
var myLoop;
var test;
/* if JSON is uploaded */
scene_display_input.addEventListener("change", function() {

    myLoop = slowLoop(scene_display_input.files, (itm, idx, cb)=>{
        test = itm;
        setTimeout(()=>{
            const reader = new FileReader();

            reader.onload = function() {

                fileContent = JSON.parse(reader.result);
                if(!validateJSON(fileContent)){
                    alert('Invalid package');
                    return
                }
                let currVer = fileContent['version'] ? fileContent['version'] : 1.0
                if(currVer < version){
                    alert('Package is out of date. You might need to remake it.')
                }
                names[fileName] = ""
                for (const [name, value] of Object.entries(fileContent['scenes'])) {
                    const re = /^[a-zA-Z0-9-_ ]+( \([0-9]+\))?$/
                    if(!re.test(name)){
                        alert('Pattern name is invalid. '+name+' Limit names to only alphanumerics, -, _, or spaces.')
                        delete names[fileName]
                        return
                    }
                    currName = name.split(' (')[0];
                    if(names[fileName][currName]){
                        currName = currName + ' ('+names[fileName][currName]+')'
                        names[fileName][name.split(' (')[0]] = names[fileName][name.split(' (')[0]] + 1
                    } else {
                        names[fileName][currName] = 1
                    }
                  }
                packageSelect.options.add(new Option(fileName,fileName))
                scenes[fileName] = fileContent['scenes']
                names[fileName] = {}
                textures = fileContent['textures']['textureValues']
                uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']
                cb();
            };

            reader.onabort = function() {
                console.log('aborted')
                return false;
            };
            reader.addEventListener("error", (event) => {
                console.log('error:')
                console.log(event.currentTarget.error)
            });

            if(itm.name.split(".")[1] != "JSON"){
                alert("Invalid file type");
                scene_display_input.value = ""
                return false;
            }
            if(Object.keys(scenes).indexOf(itm.name.split(".")[0]) != -1){
                itm.name = itm.name.split(".")[0]+"1"+itm.name.split(".")[1]
                fileName = itm.name;

            }
            fileName = itm.name.split(".")[0];
            const re = /^[a-zA-Z0-9-_ ]+$/
            if(!re.test(itm.name.split(".")[0])){
                alert('Package name is invalid. '+fileName+' Limit names to only alphanumerics, -, _, or spaces.')
                return false;
            }
            if(scenes[fileName] != null){
                alert('A package with this name already exists');
                return false;
            }
            reader.readAsText(itm);
            
            
            // call cb when finished
            
        }, 100);
        
    });
    
    myLoop.catch(() => {
        //console.log('error')
    })
    // when it's done....
    myLoop.then(()=>{

        packages[fileName] = ''
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
    
        
        packageSelect.value = fileName
        changePackage()
        manageLocalStorage(fileName+" (upload)",scenes[fileName])
        
    });

/**
 * Execute the loopBody function once for each item in the items array, 
 * waiting for the done function (which is passed into the loopBody function)
 * to be called before proceeding to the next item in the array.
 * @param {Array} items - The array of items to iterate through
 * @param {Function} loopBody - A function to execute on each item in the array.
 *		This function is passed 3 arguments - 
 *			1. The item in the current iteration,
 *			2. The index of the item in the array,
 *			3. A function to be called when the iteration may continue.
 * @returns {Promise} - A promise that is resolved when all the items in the 
 *		in the array have been iterated through.
 */

 // code taken from here https://stackoverflow.com/questions/48767979/javascript-how-to-wait-event-listener-end-to-next-iteration
function slowLoop(items, loopBody) {
	return new Promise(f => {
		done = arguments[2] || f;
		idx = arguments[3] || 0;
		let cb = items[idx + 1] ? () => slowLoop(items, loopBody, done, idx + 1) : done;
		loopBody(items[idx], idx, cb);
	});
}
    
});