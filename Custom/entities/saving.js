/* updates the current json object for the active scene */
function updateJSON(){
    const jsonData = {};
    jsonData["sky"] = {skyColor: sky.getAttribute("material").color}; // grab sky color
    els.forEach(element => { // go through each entity in the current scene
        // stop the movement animation
        mov = JSON.parse(JSON.stringify(element.components.movement.attrValue))
        mov.status = -1;

        // check type of element and save relevant data
        if(element.id.includes("gradient") || element.id.includes("grille")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, numBars: element.children.length, color2: element.components.color2.attrValue, childGeometry: element.children[0].components.geometry.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("checkerboard")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, rows: element.children.length, cols: element.children[0].children.length, tileSize: element.children[0].children[0].components.geometry.attrValue.width,  color2: element.components.color2.attrValue, position: {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("plane")){
            let mat = JSON.parse(JSON.stringify(element.components.material.attrValue));
            for(let i = 0; i < texture.options.length; i++){
                if("#"+texture.options[i].value == mat.src){
                    mat.src = texture.options[i].text;
                    break;
                }
            }
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, widthReal: (element.children.length == 0 ? element.components.geometry.attrValue.width : element.children[2].components.geometry.attrValue.width),fill: element.components.fill.attrValue, geometry: element.components.geometry.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: mat, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("circle")){
            jsonData[element.id]={advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, geometry: element.components.geometry.attrValue, fill: element.components.fill.attrValue, position: {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("triangle")){
            jsonData[element.id]={advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, geometry: element.components.geometry.attrValue, position: {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("circularDotarray")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, toggleCenterDot: element.components.toggleCenterDot.attrValue, circles: element.children.length-1, dots: element.children[1].children.length, arraySpacing: element.components.arraySpacing.attrValue, circleSize: element.children[0].components.geometry.attrValue.radiusOuter, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("dotarray")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, toggleCenterDot: element.components.toggleCenterDot.attrValue, rows: element.children.length, cols: element.children[0].children.length, circleSize: element.children[0].children[0].components.geometry.attrValue.radiusOuter, spacing: element.components.arraySpacing.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("bullseye")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, numRings: element.children.length-1, ringPitch: element.children[0].components.geometry.attrValue.radiusOuter*2, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, material: element.components.material.attrValue, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        } else if(element.id.includes("text")){
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, text: element.components.text.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        }  else if(element.id.includes("timer")){
            let text = JSON.parse(JSON.stringify(element.components.text.attrValue))
            text.value = "00:00.000"
            jsonData[element.id] = {advanced: element.components.advanced.attrValue, angle: element.components.angle.attrValue, text: element.components.text.attrValue, position:  {x: element.components.position.attrValue.x, y: element.components.position.attrValue.y, z: element.components.position.attrValue.z}, rotation: {x: element.components.rotation.attrValue.x, y: element.components.rotation.attrValue.y, z: element.components.rotation.attrValue.z}, movement: mov};
        }});

        scenes[packageSelect.value][patternList.children[parseFloat(patternList.getAttribute('selectedIndex'))].id] = jsonData;
}