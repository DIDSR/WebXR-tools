/* switches between add or edit mode or refreshes current mode display */
function toggleDisplayEdit(swap){
    
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        stopAll()
        boolDisplayEdit = !boolDisplayEdit; /* change current mode */
    } 
    utility.checked = false;
    boolAddEdit = false;
    toggleAddEdit(null)
    /* check if current mode is add or edit */
    if(boolDisplayEdit){ /* if display */
    settingsButtonContainer.style.display = "inline-block"
    addEditContent.style.display = "none"
    packageLayout.style.display = "grid"
    swapContainer.style.width = ""
    animationListButtonContainer.style.display = "none"
    openAnimationList(true)

    } else { /* if add */
        
        if(!isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            if(coreLayout.style.gridTemplateColumns != "100% 0%"){
                openSettings()
            }
            settingsButtonContainer.style.display = "none"
            addEditContent.style.display = "block"
            packageLayout.style.display = "none"
            swapContainer.style.float = "left";
            swapContainer.style.paddingTop = "12px"
            swapContainer.style.paddingLeft = "18px"
            swapContainer.style.textAlign = ""

        } else {
            alert("You must select a pattern");
            displayUtility.checked = false;
            boolDisplayEdit = !boolDisplayEdit;
            swapContainer.style.float = "left";
            swapContainer.style.paddingTop = "12px"
            swapContainer.style.paddingLeft = "18px"
            swapContainer.style.textAlign = ""
            animationListButtonContainer.style.display = "none"
        }

    }
}

/* switches between add or edit mode or refreshes current mode display */
function toggleAddEdit(swap){
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        stopAll()
        if(numAdded == 0){
            alert("You must add an entity before editing the scene");
            utility.checked = false;
            return;
        }
        boolAddEdit = !boolAddEdit; /* change current mode */
        if(boolAddEdit){
            if(selectedEntity == null) {
                selectedEntity = els[0] /* set selected entity to be first entity created */
            }
            updateStats();
         } /* update stats */
    } else if(swap == false){
        utility.checked = false;
        boolAddEdit = false;
    }
    /* check if current mode is add or edit */
    if(boolAddEdit){ /* if edit */
        
        editContent.style.display = 'grid';
        addContent.style.display = 'none';
        background.style.display = "none";
        skyIn.style.display = "none";
        animationListButtonContainer.style.display = 'inline-block'
        

        /* check geometry of object */
        if (selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusive containers shown */
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            if(selectedEntity.components.material.attrValue.src == null || selectedEntity.components.material.attrValue.src == ""){
                area3.style.display = "block";
                fillIn.style.display = "flex";
            }
            area4.style.display = "block";
            textureIn.style.display = "flex";
            area5.style.display = "block";
            uploadTextureIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusive containers shown */
            specificSettings.style.gridTemplateRows = "17% 17% 0% 17% 16% 17%";
            area1.style.display = "block";
            radiusIn.style.display = "flex"; 
            area3.style.display = "block";
            fillIn.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("triangle")) { /* triangle exlcusive containers shown */
            area1.style.display = "block";
            vertices.style.display = "block";
            area2.style.display = "block";
            va.style.display = "flex";
            area3.style.display = "block";
            vb.style.display = "flex";
            area4.style.display = "block"
            vc.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("gradient") || selectedEntity.getAttribute("id").includes("grille")) { /* gradient exlcusive containers shown */
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            area3.style.display = "block";
            numBars.style.display = "flex";
            area4.style.display = "block";
            colIn2.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("checkerboard")) { /* checkerboard exlcusive containers shown */
            area1.style.display = "block";
            cols.style.display = "flex";
            area2.style.display = "block";
            rows.style.display = "flex";
            area3.style.display = "block";
            tileSize.style.display = "flex";
            area4.style.display = "block";
            colIn2.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("circularDotarray")){ /* circular dot array exlcusive containers shown */
            area1.style.display = "block";
            numDots.style.display = "flex";
            area2.style.display = "block";
            numCircles.style.display = "flex";
            area3.style.display = "block";
            circleSize.style.display = "flex";
            area4.style.display = "block";
            arraySpacing.style.display = "flex";
            area5.style.display = "block";
            toggleCenterDot.style.display = "flex"
        } else if (selectedEntity.getAttribute("id").includes("dotarray")){ /* dot array exlcusive containers shown */
            area1.style.display = "block";
            cols.style.display = "flex";
            area2.style.display = "block";
            rows.style.display = "flex";
            area3.style.display = "block";
            circleSize.style.display = "flex";
            area4.style.display = "block";
            spacing.style.display = "flex";
            area5.style.display = "block";
            toggleCenterDot.style.display = "flex"
        } else if (selectedEntity.getAttribute("id").includes("bullseye")){ /* bullseye exlcusive containers shown */
            area1.style.display = "block"; 
            numRings.style.display = "flex";
            area2.style.display = "block";
            ringPitch.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("text")){ /* text exlcusive containers shown */
            area1.style.display = "block";
            sizeIn.style.display = "flex";
            area2.style.display = "block";
            textIn.style.display = "flex";
        }  else if (selectedEntity.getAttribute("id").includes("timer")){
            area1.style.display = "block";
            sizeIn.style.display = "flex";
        }
        updateAnimationList(entity)
        if(animationList.childElementCount == 0){
            updateAnimationUI(entity,-1) 
        } else {
            updateAnimationUI(entity,0)
        }
        
    } else { /* if add */
        editContent.style.display = 'none'
        addContent.style.display = 'block'
        hideEditStats(); /* hide edit containers */
        background.style.display = 'block'
        entitySelectorText.style.display = 'flex'
        skyIn.style.display = 'block'
        animationListButtonContainer.style.display = 'none'
        openAnimationList(true)
    }
}