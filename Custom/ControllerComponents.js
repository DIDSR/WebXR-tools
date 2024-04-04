/*
    Listens for button inputs and handles them accordingly.
    Any button press on the left controller will move backwards one scene.
    Any button press on the right controller will move forward one scene.
    
*/

/* Code to register thumbstick behavior for left hand */
AFRAME.registerComponent('thumbstick-left',{
init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
},
    logThumbstick: function (evt) {
        if (evt.detail.y > 0.95) {

        }
        if (evt.detail.y < -0.95) { 

        }
        if (evt.detail.x < -0.95) { 

        }
        if (evt.detail.x > 0.95) {

        }
    }
});

/*  */
AFRAME.registerComponent('thumbstick-right',{
init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
},
    logThumbstick: function (evt) {
        if (evt.detail.y > 0.95) {
            
        }
        if (evt.detail.y < -0.95) { 
            
        }
        if (evt.detail.x < -0.95) { 

        }
        if (evt.detail.x > 0.95) {

            
        }

    }
});

AFRAME.registerComponent('trackpad-left',{
    init: function () {
        this.el.addEventListener('trackpadmoved', this.logTrackpad);
    },
        logTrackpad: function (evt) {
            if (evt.detail.y > 0.2) {

            }
            if (evt.detail.y < -0.2) { 

            }
            if (evt.detail.x < -0.2) { 

            }
            if (evt.detail.x > 0.2) {

            }

        }
    });
    
    /*  */
    AFRAME.registerComponent('trackpad-right',{
    init: function () {
        this.el.addEventListener('trackpadmoved', this.logTrackpad);
    },
        logTrackpad: function (evt) {
            trackpadDetail.x = evt.detail.x
            trackpadDetail.y = evt.detail.y
            if (evt.detail.y > 0.5) {

            }
            if (evt.detail.y < -0.5) { 

            }
            if (evt.detail.x < -0.2) { 

            }
            if (evt.detail.x > 0.2) {

            }

        }
    });

AFRAME.registerComponent('button-listener-r', {
init: function () {
    var el = this.el;

    el.addEventListener('gripdown', function (evt) {
        displayNext(true);
        buttonsDownR['grip'] = true;
    });
    
    el.addEventListener('gripup', function (evt) {
        buttonsDownR['grip'] = false;
    });

    el.addEventListener('triggerdown', function (evt) {
        buttonsDownR['trigger'] = true;
        if(buttonsDownR['trigger'] && ((buttonsDownR['trackpad'] && trackpadDetailR.y > .5) || (buttonsDownR['thumbstick'] && thumbstickDetailR.y > .5))){
            handleAll()
        } else if(buttonsDownR['trigger'] && ((buttonsDownR['trackpad'] && trackpadDetailR.y < -.5) || (buttonsDownR['thumbstick'] && thumbstickDetailR.y < -.5))){
            stopAll()
        }  else {
            displayNext(false);
        }
    });
    
    el.addEventListener('triggerup', function (evt) {
        buttonsDownR['grip'] = false;
    });

    el.addEventListener('abuttondown', function (evt) {
        displayNext(true);
        buttonsDownR['abutton'] = true;
    });
    el.addEventListener('abuttonup', function (evt) {
        buttonsDownR['abutton'] = false;
    });

    el.addEventListener('bbuttondown', function (evt) {
        displayNext(true);
        buttonsDownR['bbutton'] = true;
    });
    el.addEventListener('bbuttonup', function (evt) {
        buttonsDownR['bbutton'] = false;
    });

    /*el.addEventListener('menudown', function (evt) {
        menuRightPressed = true;
        rightMenu.setAttribute("value", "Right Menu: Yes"); rightMenu.setAttribute("color","green")
    });*/

    el.addEventListener('thumbstickdown', function (evt) {
        buttonsDownR['thumbstick'] = true;
        if(buttonsDownR['thumbstick'] && ((buttonsDownR['thumbstick'] && trackpadDetailR.y > .5) || (buttonsDownR['thumbstick'] && thumbstickDetailR.y > .5))){
            handleAll()
        } else if(buttonsDownR['thumbstick'] && ((buttonsDownR['thumbstick'] && trackpadDetailR.y < -.5) || (buttonsDownR['thumbstick'] && thumbstickDetailR.y < -.5))){
            stopAll()
        }  else {
            displayNext(false);
        }
    });
    el.addEventListener('thumbstickup', function (evt) {
        buttonsDownR['thumbstick'] = false;
    });

    el.addEventListener('trackpaddown', function (evt) {
        buttonsDownR['trackpad'] = true;
        if(buttonsDownR['trackpad'] && ((buttonsDownR['trackpad'] && trackpadDetailR.y > .5) || (buttonsDownR['trackpad'] && thumbstickDetailR.y > .5))){
            handleAll()
        } else if(buttonsDownR['trackpad'] && ((buttonsDownR['trackpad'] && trackpadDetailR.y < -.5) || (buttonsDownR['trackpad'] && thumbstickDetailR.y < -.5))){
            stopAll()
        }  else {
            displayNext(false);
        }
    });

    el.addEventListener('trackpadup', function (evt) {
        buttonsDownR['trackpad'] = false;
    });
    /*el.addEventListener('trackpadtouchstart', function (evt) {
        
    });

    el.addEventListener('trackpadtouchend', function (evt) {
        
    });*/
}
});

AFRAME.registerComponent('button-listener-l', {
init: function () {
    var el = this.el;

    el.addEventListener('gripdown', function (evt) {
        displayNext(false);
        buttonsDownL['grip'] = true;
    });
    
    el.addEventListener('gripup', function (evt) {
        buttonsDownL['grip'] = false;
    });

    el.addEventListener('triggerdown', function (evt) {
        buttonsDownL['trigger'] = true;
        if(buttonsDownL['trigger'] && ((buttonsDownL['trackpad'] && trackpadDetailL.y > .5) || (buttonsDownL['thumbstick'] && thumbstickDetailL.y > .5))){
            handleAll()
        } else if(buttonsDownL['trigger'] && ((buttonsDownL['trackpad'] && trackpadDetailL.y < -.5) || (buttonsDownL['thumbstick'] && thumbstickDetailL.y < -.5))){
            stopAll()
        }  else {
            displayNext(false);
        }
    });
    
    el.addEventListener('triggerup', function (evt) {
        buttonsDownL['grip'] = false;
    });

    el.addEventListener('xbuttondown', function (evt) {
        displayNext(false);
        //handleAll()
        buttonsDownL['xbutton'] = true;
    });
    
    el.addEventListener('xbuttonup', function (evt) {
        buttonsDownL['xbutton'] = false;
    });

    el.addEventListener('ybuttondown', function (evt) {
        displayNext(false);
        //stopAll()
        buttonsDownL['ybutton'] = true;
    });
    
    el.addEventListener('ybuttonup', function (evt) {
        buttonsDownL['ybutton'] = false;
    });

    /*el.addEventListener('menudown', function (evt) {
        menuLeftPressed = true;
        leftMenu.setAttribute("value", "Left Menu: Yes"); leftMenu.setAttribute("color","green")
    });*/

    el.addEventListener('thumbstickdown', function (evt) {
        buttonsDownL['thumbstick'] = true;
        if(buttonsDownL['thumbstick'] && ((buttonsDownL['thumbstick'] && trackpadDetailL.y > .5) || (buttonsDownL['thumbstick'] && thumbstickDetailL.y > .5))){
            handleAll()
        } else if(buttonsDownL['thumbstick'] && ((buttonsDownL['thumbstick'] && trackpadDetailL.y < -.5) || (buttonsDownL['thumbstick'] && thumbstickDetailL.y < -.5))){
            stopAll()
        }  else {
            displayNext(false);
        }
    });
    el.addEventListener('thumbstickup', function (evt) {
        buttonsDownL['thumbstick'] = false;
    });

    el.addEventListener('trackpaddown', function (evt) {
        buttonsDownL['trackpad'] = true;
        if(buttonsDownL['trackpad'] && ((buttonsDownL['trackpad'] && trackpadDetailL.y > .5) || (buttonsDownL['trackpad'] && thumbstickDetailL.y > .5))){
            handleAll()
        } else if(buttonsDownL['trackpad'] && ((buttonsDownL['trackpad'] && trackpadDetailL.y < -.5) || (buttonsDownL['trackpad'] && thumbstickDetailL.y < -.5))){
            stopAll()
        }  else {
            displayNext(false);
        }
    });

    el.addEventListener('trackpadup', function (evt) {
        buttonsDownL['trackpad'] = false;
    });
    /*
    el.addEventListener('trackpadtouchstart', function (evt) {

    });

    el.addEventListener('trackpadtouchend', function (evt) {

    });*/
}
});

thumbstickDetailL = {x: 0, y: 0}
trackpadDetailL = {x: 0, y: 0}
buttonsDownL = {trigger: false, grip: false, trackpad: false, thumbstick: false, abutton: false, bbutton: false}

thumbstickDetailR = {x: 0, y: 0}
trackpadDetailR = {x: 0, y: 0}
buttonsDownR = {trigger: false, grip: false, trackpad: false, thumbstick: false, xbutton: false, ybutton: false}