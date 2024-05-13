/* Contains code related to grille entity
   No draw function because only one entity
*/

// creates a text entity
// called when entity is added to the scene
function createText() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","text"+textNum++);
    el.setAttribute("text",{"value": "Default Text", "color": "#FFFFFF",  width: 65, height: 65, align:"center", "wrapCount": 12});

    return el;
}

// edits text entity
// called when text attribute is changed
function editText(ent) {
    if(isNaN(parseFloat($("#size").val()))){
        alert("Please enter a valid size");
        return false;
    }
    if(($("#text").val()) == ""){
        alert("Please enter a valid text option");
        return false;
    }
    if(parseFloat($("#size").val()) < 0){
        alert("Please enter a valid size ( >= 0 )");
        return false;
    }

    ent.setAttribute('text', {value: $("#text").val(), width: parseFloat($("#size").val()), height: parseFloat($("#size").val()), color: $("#color").val(), wrapCount: $("#text").val().length})

    return true;
}