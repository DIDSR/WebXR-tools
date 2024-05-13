function validateJSON(file){
    let properties = Object.keys(file);
    for(let i = 0; i < properties.length; i++){
        let currProperty = properties[i];
        if(currProperty == 'filename'){
            const re = /^[a-zA-Z0-9-_ ]+$/
            if(!re.test(file[currProperty])){
                // if filename
                    // check that filename is valid
                alert('error: invalid package name')
                return false;
            }

        } else if(currProperty == 'date'){
            // if date
            if(Number.isNaN(Date.parse(file[currProperty]))){
                    // check for valid date
                alert('error: invalid file date')
                return false;
            }
        } else if(currProperty == 'version'){
            // if date
            if(typeof file[currProperty] != 'number'){
                    // check for valid date
                alert('error: invalid version')
                return false;
            }
        }else if(currProperty == 'scenes'){
            continue;
                        // check if entity contents are valid for given type

        } else if(currProperty == 'textures'){
            let textureProperties = Object.keys(file[currProperty]);
            if(textureProperties.length != 2 || !file[currProperty].hasOwnProperty('uploadedTextureFormats') || !file[currProperty].hasOwnProperty('textureValues')){
                console.log('error: invalid texture list')
                return false;
            }

            let uploadedTextureFormats = Object.keys(file[currProperty]['uploadedTextureFormats']);
            for(let j = 0; j < uploadedTextureFormats.length; j++){
                let currTexture = uploadedTextureFormats[j];
                if(Object.keys(file[currProperty]['uploadedTextureFormats'][currTexture]).length != 2 || !file[currProperty]['uploadedTextureFormats'][currTexture].hasOwnProperty('width') || !file[currProperty]['uploadedTextureFormats'][currTexture].hasOwnProperty('width')
                 || typeof file[currProperty]['uploadedTextureFormats'][currTexture]['width'] != 'number' || typeof file[currProperty]['uploadedTextureFormats'][currTexture]['height'] != 'number'
                ){
                    console.log('error: invalid texture format')
                    return false;

                }
            }

            let textureValues = file[currProperty]['textureValues'];
            for(let j = 0; j < textureValues.length; j++){
                let currTexture = textureValues[j]
                if(Object.keys(currTexture).length != 2 || !currTexture.hasOwnProperty('val') || typeof currTexture['val'] != 'string' || !currTexture.hasOwnProperty('text') || typeof currTexture['text'] != 'string'){
                    console.log('error: invalid texture list')
                    return false
                }

                if(currTexture['val'] == "none"){
                    if(currTexture['text'] != "none"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "QC"){
                    if(currTexture['text'] != "TG18-QC.2k_12b"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "CH"){
                    if(currTexture['text'] != "TG18-CH.2k"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "MM1"){
                    if(currTexture['text'] != "TG18-MM1.2k"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "MM2"){
                    if(currTexture['text'] != "TG18-MM2.2k"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "sQC"){
                    if(currTexture['text'] != "TG270sQC"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "PQC"){
                    if(currTexture['text'] != "TG18-PQC.2k_12b"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else if(currTexture['val'] == "BR"){
                    if(currTexture['text'] != "TG18-BR.2k_12b"){
                        console.log('error: invalid texture')
                        return false
                    }
                } else {
                    let checkForBase64 = currTexture['val'].split(',')
                    if(checkForBase64.length != 2 || checkForBase64[0] != 'url(data:image/png;base64' || (checkForBase64[1].split(')').length != 2 && checkForBase64[1].split(')').length != '')){
                        console.log('error: invalid texture')
                        return false
                    }
                }
            }


        } else {
            console.log('error: invalid property encountered')
            return false;
        }
    }


    // go through each scene
    let currScenes = Object.keys(file['scenes']);
    for(let j = 0; j < currScenes.length; j++){
        if(!validateScene(file['scenes'][currScenes[j]], currScenes[j], file['textures']['textureValues'])){
            console.log('error: scene validation failed')
            return false
        }
    }



    return true;
}



function validateScene(scene, name, textures){
    // check valid scene name
    const re = /^[a-zA-Z0-9-_ ]+( \([0-9]+\))?$/ // regex to check for a name like test_one-2 (1)

    if(!re.test(name)){
        // failed regex validation indicating the file may have been tampered with
        console.log('error: invalid pattern name')
        return false;
    }
    let skyEntCount = 0; // check that sky element is there exactly once
    let timerEntCount = 0; // check at most one timer
    
    

    // for each entity in scene
        // check if entity is of a valid type and id
            // given type, check valid for valid inputs


    let colorRe = /^\#[a-fA-F0-9]{6}$/


    let properties = Object.keys(scene)
    for(let i = 0; i < properties.length; i++) {

        let key = properties[i];

        // handle adding entity similar to drawing entity

        let skyRe = /^sky$/;

        if(key.includes("sky")){
            skyEntCount++;
            if(skyEntCount > 1){
                console.log('error: too many sky entities')
                return false
            }

            // for each property, check if it is valid for this entity
            let attributes = Object.keys(scene[key]);

            if(attributes.length != 1 || attributes[0] != 'skyColor' || !colorRe.test(scene[key]['skyColor'] || !skyRe.test(key))){
                console.log('error: sky attributes invalid')
                return false
            }
            

        } else if(key.includes("circle")){ /* validate circle */
            let attributes = Object.keys(scene[key]);
            let circleRe = /^circle[0-9]+$/;
            if(attributes.length != 8 || !circleRe.test(key)){
                console.log('error: circle1')
                return false
            }

            if(!scene[key].hasOwnProperty('geometry') || !scene[key].hasOwnProperty('fill')){
                console.log('error: circle2')
                return false
            }

            let fill = Object.keys(scene[key]['fill'])
            if(fill.length != 2 || !scene[key]['fill'].hasOwnProperty('val') || !scene[key]['fill'].hasOwnProperty('isFull') || typeof scene[key]['fill']['val'] != 'number' || typeof scene[key]['fill']['isFull'] != 'boolean'){
                console.log('error: circle3')
                return false
            }

            let geom = Object.keys(scene[key]['geometry'])
            if(geom.length != 4 || !scene[key]['geometry'].hasOwnProperty('primitive') || !scene[key]['geometry'].hasOwnProperty('radiusOuter') || !scene[key]['geometry'].hasOwnProperty('radiusInner') || !scene[key]['geometry'].hasOwnProperty('segmentsTheta') || scene[key]['geometry']['primitive'] != 'ring' || typeof scene[key]['geometry']['radiusOuter'] != 'number' || typeof scene[key]['geometry']['radiusInner'] != 'number' || typeof scene[key]['geometry']['segmentsTheta'] != 'number'){
                console.log('error: circle4')
                return false
            }
                
            if(!validateUniversal(scene, key, attributes)){  
                console.log('error: circle5')
                return false
            }
            
                
            
        } else if(key.includes("plane")){ /* validate plane */

            let attributes = Object.keys(scene[key]);
            let planeRe = /^plane[0-9]+$/;
            if(attributes.length != 9 || !planeRe.test(key)){
                console.log('error: plane1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('geometry')){
                console.log('error: plane2')
                return false
            } else {
                let geom = Object.keys(scene[key]['geometry'])
                if(geom.length != 3 || !scene[key]['geometry'].hasOwnProperty('primitive') || !scene[key]['geometry'].hasOwnProperty('width') || !scene[key]['geometry'].hasOwnProperty('height') || scene[key]['geometry']['primitive'] != 'plane' || typeof scene[key]['geometry']['width'] != 'number' || typeof scene[key]['geometry']['height'] != 'number'){
                    console.log('error: plane3')
                    return false
                } 
            } 

            if(!scene[key].hasOwnProperty('widthReal') || typeof scene[key]['widthReal'] != 'number'){
                console.log('error: plane4')
                return false
            }

            if(!scene[key].hasOwnProperty('fill')){
                console.log('error: plane5')
                return false
            }

            let fill = Object.keys(scene[key]['fill'])
            if(fill.length != 2 || !scene[key]['fill'].hasOwnProperty('val') || !scene[key]['fill'].hasOwnProperty('isFull') || typeof scene[key]['fill']['val'] != 'number' || typeof scene[key]['fill']['isFull'] != 'boolean'){
                console.log('error: plane6')
                return false
            }

            if(!scene[key].hasOwnProperty('material')){
                console.log('error: plane7')
                return false
            } else {
                let mat = Object.keys(scene[key]['material'])
                if(mat.length == 3){
                    if(!scene[key]['material'].hasOwnProperty('shader') || !scene[key]['material'].hasOwnProperty('color') || !scene[key]['material'].hasOwnProperty('src') || scene[key]['material']['shader'] != 'flat' || !colorRe.test(scene[key]['material']['color']) || typeof scene[key]['material']['src'] != 'string'){
                        console.log('error: plane8')
                        return false
                    }
                    if(scene[key]['material']['src'] != ''){
                        let test = false
                        for(let j = 0; j < textures.length; j++){
                            if(textures[j]['text'] == scene[key]['material']['src']){
                                test = true;
                                break
                            }
                        }
                        if(!test){
                            console.log('error: plane9')
                            return false;
                        }
                    }

                }

            }

            if(!validateUniversal(scene, key, attributes, true)){
                console.log('error: plane10')
                return false
            }
            
        } else if(key.includes("triangle")){ /* validate triangle */
            let attributes = Object.keys(scene[key]);
            let triangleRe = /^triangle[0-9]+$/;
            if(attributes.length != 7 || !triangleRe.test(key)){
                console.log('error: triangle1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('geometry')){
                console.log('error: triangle2')
                return false
            }

            let geom = Object.keys(scene[key]['geometry'])
            if(geom.length != 4 || !scene[key]['geometry'].hasOwnProperty('primitive') || !scene[key]['geometry'].hasOwnProperty('vertexA') || !scene[key]['geometry'].hasOwnProperty('vertexB') || !scene[key]['geometry'].hasOwnProperty('vertexC') || scene[key]['geometry']['primitive'] != 'triangle' || typeof scene[key]['geometry']['vertexA'] != 'object' || typeof scene[key]['geometry']['vertexB'] != 'object' || typeof scene[key]['geometry']['vertexC'] != 'object'){
                console.log('error: triangle3') 
                return false
            } else {

                let vA = scene[key]['geometry']['vertexA'];
                if(Object.keys(vA).length != 3 || !vA.hasOwnProperty('x') || !vA.hasOwnProperty('y') || !vA.hasOwnProperty('z') || typeof vA.x != 'number' || typeof vA.y != 'number' || typeof vA.z != 'number'){
                    console.log('error: triangle4')
                    return false
                }

                let vB = scene[key]['geometry']['vertexB'];
                if(Object.keys(vB).length != 3 || !vB.hasOwnProperty('x') || !vB.hasOwnProperty('y') || !vB.hasOwnProperty('z') || typeof vB.x != 'number' || typeof vB.y != 'number' || typeof vB.z != 'number'){
                    console.log('error: triangle5')
                    return false
                }

                let vC = scene[key]['geometry']['vertexC'];
                if(Object.keys(vC).length != 3 || !vC.hasOwnProperty('x') || !vC.hasOwnProperty('y') || !vC.hasOwnProperty('z') || typeof vC.x != 'number' || typeof vC.y != 'number' || typeof vC.z != 'number'){
                    console.log('error: triangle6')
                    return false
                }

                if(!validateUniversal(scene, key, attributes)){
                    console.log('error: triangle7')
                    return false
                }
            }



        } else if (key.includes("gradient") || key.includes("grille")){
            let attributes = Object.keys(scene[key]);
            if(key.includes("gradient")){
                
                let gradientRe = /^gradient[0-9]+$/;
                if(attributes.length !=  9 || !gradientRe.test(key)){
                    console.log('error: gradient1')
                    return false
                }
            } else {
                let grilleRe = /^grille[0-9]+$/;
                if(attributes.length !=  9 || !grilleRe.test(key)){
                    console.log('error: grille1')
                    return false
                }
            }

            
            
            if(!scene[key].hasOwnProperty('childGeometry')){
                console.log('error: g2')
                return false
            }

            let geom = Object.keys(scene[key]['childGeometry'])
            if(geom.length != 3 || !scene[key]['childGeometry'].hasOwnProperty('primitive') || !scene[key]['childGeometry'].hasOwnProperty('width') || !scene[key]['childGeometry'].hasOwnProperty('height') || scene[key]['childGeometry']['primitive'] != 'plane' || typeof scene[key]['childGeometry']['width'] != 'number' || typeof scene[key]['childGeometry']['height'] != 'number'){
                console.log('error: g3')
                return false
            } 

            if(!scene[key].hasOwnProperty('numBars') || typeof scene[key]['numBars'] != 'number'){
                console.log('error: g4')
                return false
            }

            if(!scene[key].hasOwnProperty('color2') || Object.keys(scene[key]['color2']).length != 1 || !scene[key]['color2'].hasOwnProperty('val') || typeof scene[key]['color2']['val'] != 'string' || !colorRe.test(scene[key]['color2']['val'])){
                console.log('error: g5')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: g6')
                return false
            }

        } else if (key.includes("checkerboard")){
            let attributes = Object.keys(scene[key]);
            let checkerboardRe = /^checkerboard[0-9]+$/;
            if(attributes.length !=  10 || !checkerboardRe.test(key)){
                console.log('error: checker1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('rows') || typeof scene[key]['rows'] != 'number'){
                console.log('error: checker2')
                return false
            }

            if(!scene[key].hasOwnProperty('cols') || typeof scene[key]['cols'] != 'number'){
                console.log('error: checker3')
                return false
            }

            if(!scene[key].hasOwnProperty('tileSize') || typeof scene[key]['tileSize'] != 'number'){
                console.log('error: checker4')
                return false
            }

            if(!scene[key].hasOwnProperty('color2') || Object.keys(scene[key]['color2']).length != 1 || !scene[key]['color2'].hasOwnProperty('val') || typeof scene[key]['color2']['val'] != 'string' || !colorRe.test(scene[key]['color2']['val'])){
                console.log('error: checker5')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: checker6')
                return false
            }


        } else if (key.includes("circularDotarray")){
            let attributes = Object.keys(scene[key]);
            let circularDotArrayRe = /^circularDotarray[0-9]+$/;
            if(attributes.length !=  11 || !circularDotArrayRe.test(key)){
                console.log('error: circular1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('circles') || typeof scene[key]['circles'] != 'number'){
                console.log('error: circular2')
                return false
            }

            if(!scene[key].hasOwnProperty('dots') || typeof scene[key]['dots'] != 'number'){
                console.log('error: circular3')
                return false
            }

            if(!scene[key].hasOwnProperty('circleSize') || typeof scene[key]['circleSize'] != 'number'){
                console.log('error: circular4')
                return false
            }

            if(!scene[key].hasOwnProperty('toggleCenterDot') || Object.keys(scene[key]['toggleCenterDot']).length != 1 || !scene[key]['toggleCenterDot'].hasOwnProperty('val') || typeof scene[key]['toggleCenterDot']['val'] != 'boolean'){
                console.log('error: circular5')
                return false
            }

            if(!scene[key].hasOwnProperty('arraySpacing') || Object.keys(scene[key]['arraySpacing']).length != 1 || !scene[key]['arraySpacing'].hasOwnProperty('val') || typeof scene[key]['arraySpacing']['val'] != 'number'){
                console.log('error: circular6')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: circular7')
                return false
            }



        } else if (key.includes("dotarray")){
            let attributes = Object.keys(scene[key]);
            let dotArrayRe = /^dotarray[0-9]+$/;
            if(attributes.length !=  11 || !dotArrayRe.test(key)){
                console.log('error: dot1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('rows') || typeof scene[key]['rows'] != 'number'){
                console.log('error: dot2')
                return false
            }

            if(!scene[key].hasOwnProperty('cols') || typeof scene[key]['cols'] != 'number'){
                console.log('error: dot3')
                return false
            }

            if(!scene[key].hasOwnProperty('circleSize') || typeof scene[key]['circleSize'] != 'number'){
                console.log('error: dot4')
                return false
            }

            if(!scene[key].hasOwnProperty('toggleCenterDot') || Object.keys(scene[key]['toggleCenterDot']).length != 1 || !scene[key]['toggleCenterDot'].hasOwnProperty('val') || typeof scene[key]['toggleCenterDot']['val'] != 'boolean'){
                console.log('error: dot5')
                return false
            }

            if(!scene[key].hasOwnProperty('spacing') || Object.keys(scene[key]['spacing']).length != 1 || !scene[key]['spacing'].hasOwnProperty('val') || typeof scene[key]['spacing']['val'] != 'number'){
                console.log('error: dot6')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: dot7')
                return false
            }


        }  else if (key.includes("bullseye")){
            let attributes = Object.keys(scene[key]);
            let bullseyeRe = /^bullseye[0-9]+$/;
            if(attributes.length !=  8 || !bullseyeRe.test(key)){
                console.log('error: bullseye1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('numRings') || typeof scene[key]['numRings'] != 'number'){
                console.log('error: bullseye2')
                return false
            }

            if(!scene[key].hasOwnProperty('ringPitch') || typeof scene[key]['ringPitch'] != 'number'){
                console.log('error: bullseye3')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: bullseye4')
                return false
            }
        
        
        } else if (key.includes("text")){

            let attributes = Object.keys(scene[key]);
            let textRe = /^text[0-9]+$/;
            if(attributes.length !=  6 || !textRe.test(key)){
                console.log('error: text1')
                return false
            }
            
            if(!scene[key].hasOwnProperty('text') || Object.keys(scene[key]['text']).length != 6 || !scene[key]['text'].hasOwnProperty('value') || !scene[key]['text'].hasOwnProperty('color') || !scene[key]['text'].hasOwnProperty('width') || !scene[key]['text'].hasOwnProperty('height') || !scene[key]['text'].hasOwnProperty('align') || !scene[key]['text'].hasOwnProperty('wrapCount')
            || typeof scene[key]['text']['value'] != 'string' || !colorRe.test(scene[key]['text']['color']) || typeof scene[key]['text']['width'] != 'number' || typeof scene[key]['text']['height'] != 'number' || scene[key]['text']['align'] != 'center' || typeof scene[key]['text']['wrapCount'] != 'number'
            ){
                console.log('error: text2')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: text3')
                return false
            }


        } else if (key.includes("timer")){
            timerEntCount++;
            if(timerEntCount > 1){
                console.log('error: timer1')
                return false
            }

            let attributes = Object.keys(scene[key]);
            let timerRe = /^timer[0-9]+$/;
            if(attributes.length !=  6 || !timerRe.test(key)){
                console.log('error: timer2')
                return false
            }
            
            if(!scene[key].hasOwnProperty('text') || Object.keys(scene[key]['text']).length != 24 
            || !scene[key]['text'].hasOwnProperty('value') || !scene[key]['text'].hasOwnProperty('color') || !scene[key]['text'].hasOwnProperty('width') || !scene[key]['text'].hasOwnProperty('height') || !scene[key]['text'].hasOwnProperty('align') || !scene[key]['text'].hasOwnProperty('wrapCount')
            || !scene[key]['text'].hasOwnProperty('alphaTest') || !scene[key]['text'].hasOwnProperty('anchor') || !scene[key]['text'].hasOwnProperty('baseline') || !scene[key]['text'].hasOwnProperty('font') || !scene[key]['text'].hasOwnProperty('fontImage') || !scene[key]['text'].hasOwnProperty('letterSpacing')
            || !scene[key]['text'].hasOwnProperty('lineHeight') || !scene[key]['text'].hasOwnProperty('negate') || !scene[key]['text'].hasOwnProperty('opacity') || !scene[key]['text'].hasOwnProperty('shader') || !scene[key]['text'].hasOwnProperty('side') || !scene[key]['text'].hasOwnProperty('tabSize')
            || typeof scene[key]['text']['value'] != 'string' || !colorRe.test(scene[key]['text']['color']) || typeof scene[key]['text']['width'] != 'number' || typeof scene[key]['text']['height'] != 'number' || scene[key]['text']['align'] != 'center' || typeof scene[key]['text']['wrapCount'] != 'number'
            || scene[key]['text']['alphaTest'] != 0.5 || scene[key]['text']['anchor'] != 'center' || scene[key]['text']['baseline'] != 'center' || scene[key]['text']['font'] != 'roboto' || scene[key]['text']['fontImage'] != '' || scene[key]['text']['letterSpacing'] != 0
            || scene[key]['text']['lineHeight'] != 0 || scene[key]['text']['negate'] != true || scene[key]['text']['opacity'] != 1 || scene[key]['text']['shader'] != 'sdf' || scene[key]['text']['side'] != 'front' || scene[key]['text']['tabSize'] != 4
            || scene[key]['text']['transparent'] != true || scene[key]['text']['whiteSpace'] != 'normal' || scene[key]['text']['wrapPixels'] != 0 || scene[key]['text']['xOffset'] != 0 || scene[key]['text']['yOffset'] != 0 || scene[key]['text']['zOffset'] != 0.001
            ){
                console.log('error: timer3')
                return false
            }

            if(!validateUniversal(scene, key, attributes)){
                console.log('error: timer4')
                return false
            }
        
        
        
        } else {
            return false;
        }
    }





    return true;
}




function validateUniversal(scene, key, attributes, skipMat){
    let colorRe = /^\#[a-fA-F0-9]{6}$/;
    let uniqueAttrs = ['geometry', 'widthReal','fill', 'childGeometry', 'numBars', 'color2', 'rows', 'cols', 'tileSize', 'circles', 'dots', 'circleSize', 'arraySpacing','toggleCenterDot', 'spacing', 'numRings', 'ringPitch', 'text']
    for(let j = 0; j < attributes.length; j++) {
        let attr = attributes[j];

        if(attr == "advanced"){
            let advanced = Object.keys(scene[key][attr])
            if(advanced.length != 1 || !scene[key][attr].hasOwnProperty('val') || typeof scene[key][attr]['val'] != 'boolean'){
                console.log('test1 hello')
                return false
            }
        } else if(attr == "angle"){
            let angle = Object.keys(scene[key][attr])
            if(angle.length != 2 || !scene[key][attr].hasOwnProperty('x') || !scene[key][attr].hasOwnProperty('z') || typeof scene[key][attr]['x'] != 'number' || typeof scene[key][attr]['z'] != 'number'){
                console.log('test2')
                return false
            }
        } else if(attr == "position"){
            let pos = Object.keys(scene[key][attr])
            if(pos.length != 3 || !scene[key][attr].hasOwnProperty('x') || !scene[key][attr].hasOwnProperty('y') || !scene[key][attr].hasOwnProperty('z') || typeof scene[key][attr]['x'] != 'number' || typeof scene[key][attr]['y'] != 'number' || typeof scene[key][attr]['z'] != 'number'){
                console.log('test4')
                return false
            } 
            
        } else if(attr == "material"){
            if(skipMat){
                continue;
            }
            let mat = Object.keys(scene[key][attr])
            if((mat.length != 2 || !scene[key][attr].hasOwnProperty('shader') || !scene[key][attr].hasOwnProperty('color') || scene[key][attr]['shader'] != 'flat' || !colorRe.test(scene[key][attr]['color'])) && (mat.length != 3 || !scene[key][attr].hasOwnProperty('shader') || !scene[key][attr].hasOwnProperty('color') || !scene[key][attr].hasOwnProperty('src') || scene[key][attr]['shader'] != 'flat' || !colorRe.test(scene[key][attr]['color']) || scene[key][attr]['src'] != '')){
                console.log('test5')
                return false
            }
        } else if(attr == "rotation"){
            let rot = Object.keys(scene[key][attr])
            if(rot.length != 3 || !scene[key][attr].hasOwnProperty('x') || !scene[key][attr].hasOwnProperty('y') || !scene[key][attr].hasOwnProperty('z') || typeof scene[key][attr]['x'] != 'number' || typeof scene[key][attr]['y'] != 'number' || typeof scene[key][attr]['z'] != 'number'){
                console.log('test6')
                return false
            } 
        } else if(attr == "movement"){
            let mov = Object.keys(scene[key][attr])
            if(mov.length != 11 || !scene[key][attr].hasOwnProperty('startPoints') || !scene[key][attr].hasOwnProperty('endPoints') || !scene[key][attr].hasOwnProperty('initialVelocities') || !scene[key][attr].hasOwnProperty('accelerations') || !scene[key][attr].hasOwnProperty('types') || !scene[key][attr].hasOwnProperty('origin') || !scene[key][attr].hasOwnProperty('rotationOrigin') || !scene[key][attr].hasOwnProperty('status') || !scene[key][attr].hasOwnProperty('index') || !scene[key][attr].hasOwnProperty('currentVelocity') || !scene[key][attr].hasOwnProperty('timeElapsed')
             || !(scene[key][attr]['startPoints'].length == scene[key][attr]['endPoints'].length && scene[key][attr]['initialVelocities'].length == scene[key][attr]['accelerations'].length && scene[key][attr]['types'].length == scene[key][attr]['startPoints'].length && scene[key][attr]['startPoints'].length == scene[key][attr]['accelerations'].length
             || typeof scene[key][attr]['status'] != 'number' || scene[key][attr]['status'] != -1 
             || typeof scene[key][attr]['origin'] != 'object'
             || typeof scene[key][attr]['rotationOrigin'] != 'object'
             || typeof scene[key][attr]['index'] != 'number' || scene[key][attr]['index'] != 0 
             || typeof scene[key][attr]['currentVelocity'] != 'number' || scene[key][attr]['currentVelocity'] != 0 
             || typeof scene[key][attr]['timeElapsed'] != 'number' || scene[key][attr]['timeElapsed'] != 0 
             )){
                console.log('test7')
                return false;
                
            } else {
                // need to validate each object stored in movement
               
                for(let k = 0; k < scene[key][attr]['startPoints'].length; k++){
                    if(scene[key][attr]['startPoints'][k].hasOwnProperty('x') && scene[key][attr]['startPoints'][k].hasOwnProperty('y') && scene[key][attr]['startPoints'][k].hasOwnProperty('z')){
                        if(typeof scene[key][attr]['startPoints'][k].x != 'number' && typeof scene[key][attr]['startPoints'][k].y != 'number' && typeof scene[key][attr]['startPoints'][k].z != 'number'){
                            console.log('test8')
                            return false;
                        }
                    } else if(scene[key][attr]['startPoints'][k].hasOwnProperty('r') && scene[key][attr]['startPoints'][k].hasOwnProperty('y') && scene[key][attr]['startPoints'][k].hasOwnProperty('theta')){
                        if(typeof scene[key][attr]['startPoints'][k].r != 'number' && typeof scene[key][attr]['startPoints'][k].theta != 'number' && typeof scene[key][attr]['startPoints'][k].y != 'number'){
                            console.log('test9')
                            return false
                        }
                    } else {
                        console.log('test10')
                        return false;
                    }
                }

                
                for(let k = 0; k < scene[key][attr]['endPoints'].length; k++){
                    if(scene[key][attr]['endPoints'][k].hasOwnProperty('x') && scene[key][attr]['endPoints'][k].hasOwnProperty('y') && scene[key][attr]['endPoints'][k].hasOwnProperty('z')){
                        if(typeof scene[key][attr]['endPoints'][k].x != 'number' && typeof scene[key][attr]['endPoints'][k].y != 'number' && typeof scene[key][attr]['endPoints'][k].z != 'number'){
                            console.log('test11')
                            return false;
                        }
                    } else if(scene[key][attr]['endPoints'][k].hasOwnProperty('r') && scene[key][attr]['endPoints'][k].hasOwnProperty('y') && scene[key][attr]['endPoints'][k].hasOwnProperty('theta')){
                        if(typeof scene[key][attr]['endPoints'][k].r != 'number' && typeof scene[key][attr]['endPoints'][k].theta != 'number' && typeof scene[key][attr]['endPoints'][k].y != 'number'){
                            console.log('test12')
                            return false
                        }
                    } else {
                        console.log('test13')
                        return false;
                    }
                }

                
                for(let k = 0; k < scene[key][attr]['initialVelocities'].length; k++){
                    if(typeof scene[key][attr]['initialVelocities'][k] != 'number'){
                        console.log('test14')
                       return false
                    }
                }
                
                for(let k = 0; k < scene[key][attr]['accelerations'].length; k++){
                    if(typeof scene[key][attr]['accelerations'][k] != 'number'){
                        console.log('test15')
                       return false
                    }
                }
                
                for(let k = 0; k < scene[key][attr]['types'].length; k++){
                    if(typeof scene[key][attr]['types'][k] != 'string' || (scene[key][attr]['types'][k] != 'Discontinous' && scene[key][attr]['types'][k] != 'Pause' && scene[key][attr]['types'][k] != 'Start' && scene[key][attr]['types'][k] != 'Rubberband' && scene[key][attr]['types'][k] != 'Rebound')){
                        console.log('test16')
                        return false
                    }
                }
                
            }
        } else if(uniqueAttrs.includes(attr)) {
            continue;
        } else {
            console.log('test17')
            return false;
        }

    }
    return true;
}
