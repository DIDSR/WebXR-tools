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