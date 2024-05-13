/* listens for entering vr and removes restrictions on clicking through patterns */
scene.addEventListener('enter-vr',function(){
    block = false;
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No scene is selected, please exit immersive mode and select a scene.')
    }
    controlsInterval = setInterval(findControls,10);
  });

/* listens for exiting vr and restricts clicking through patterns */
scene.addEventListener('exit-vr',function(){
    block = true;
    toggleAddEdit(false);
  });