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
