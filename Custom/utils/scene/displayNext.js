/* used to click through current pattern */
function displayNext(direction){
    if(direction){
        // right
        if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            return
        }
        if(parseInt(patternList.getAttribute('selectedIndex')) == patternList.children.length-1){
            patternList.children[0].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        } else {
            patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        }        
        
    } else {
        // left
        if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            return
        }
        if(parseInt(patternList.getAttribute('selectedIndex')) == 0){
            patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        } else {
            patternList.children[parseInt(patternList.getAttribute('selectedIndex'))-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        }
        
    }
    
    $('#patternDisplay').trigger('change');
}