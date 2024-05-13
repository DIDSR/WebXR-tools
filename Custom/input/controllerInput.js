/* 
    Reads in controller input profiles and sets event listeners.
    Event listeners will fire and dispatch correctly encoded event to controller button listeners
    Controller schemes are windows, oculus touch, oculus go, vive, vive focus, and a catch all that contains all buttons
    
*/

//import data from '../Compatibility/controller_profiles.json' assert { type: "json" };
const windows = data[0]['windows']
const oc_touch = data[0]['oc_touch']
const oc_go = data[0]['oc_go']
const vive = data[0]['vive']
const vive_focus = data[0]['vive_focus']
const magic = data[0]['magic']
// contains all possible buttons and axes
const generic = data[0]['generic']

// function to determine current controller scheme
let isRight, isLeft, scheme;
function findControls(){
    isRight = !(conRight.getAttribute("position").x == 0 && conRight.getAttribute("position").y == 0 && conRight.getAttribute("position").z == 0);
    isLeft = !(conLeft.getAttribute("position").x == 0 && conLeft.getAttribute("position").y == 0 && conLeft.getAttribute("position").z == 0);
    if(isRight){
        
        if(conRight.components['tracked-controls'].attrValue.hasOwnProperty("id") && conRight.components['tracked-controls'].attrValue.id != ""){
            scheme = conRight.components['tracked-controls-webxr'].attrValue.id
            clearInterval(controlsInterval)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
            } else if(scheme.includes("magicleap")) {
                conLeft.removeAttribute("magicleap-controls")
                conRight.removeAttribute("magicleap-controls")
            }
        } else if(conRight.components['tracked-controls'].attrValue.hasOwnProperty("idPrefix") && conRight.components['tracked-controls'].attrValue.idPrefix != ""){
            scheme = conRight.getAttribute("tracked-controls").idPrefix;
            clearInterval(controlsInterval)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
            } else if(scheme.includes("magicleap")) {
                conLeft.removeAttribute("magicleap-controls")
                conRight.removeAttribute("magicleap-controls")
            }
        } else {
            scheme = null
        }
        
    } else if(isLeft) {
        if(conLeft.components['tracked-controls'].attrValue.hasOwnProperty("id") && conLeft.components['tracked-controls'].attrValue.id != ""){
            scheme = conLeft.components['tracked-controls-webxr'].attrValue.id
            clearInterval(controlsInterval)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
            } else if(scheme.includes("magicleap")) {
                conLeft.removeAttribute("magicleap-controls")
                conRight.removeAttribute("magicleap-controls")
            }
        } else if(conLeft.components['tracked-controls'].attrValue.hasOwnProperty("idPrefix") && conLeft.components['tracked-controls'].attrValue.idPrefix != ""){
            scheme = conLeft.getAttribute("tracked-controls").idPrefix;
            clearInterval(controlsInterval)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
            } else if(scheme.includes("magicleap")) {
                conLeft.removeAttribute("magicleap-controls")
                conRight.removeAttribute("magicleap-controls")
            }
            
        } else {
            scheme = null
        }
    }
    
}

// handles button presses and dispatches proper event type
conLeft.addEventListener('buttondown', function (evt) {
    console.log("left")
    console.log(JSON.stringify(evt.detail.id))
    if(scheme == 'windows-mixed-reality'){
        conLeft.dispatchEvent(new CustomEvent(windows['left'][evt.detail.id]+'down', {detail: true}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conLeft.dispatchEvent(new CustomEvent(oc_touch['left'][evt.detail.id]+'down', {detail: true}))
    } else if (scheme == 'oculus-go'){
        conLeft.dispatchEvent(new CustomEvent(oc_go['left'][evt.detail.id]+'down', {detail: true}))
    } else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conLeft.dispatchEvent(new CustomEvent(vive['left'][evt.detail.id]+'down', {detail: true}))
    } else if(scheme == 'htc-vive-focus') {
        conLeft.dispatchEvent(new CustomEvent(vive_focus['left'][evt.detail.id]+'down', {detail: true}))
    } else if(scheme == 'magicleap-one') {
        conLeft.dispatchEvent(new CustomEvent(magic['left'][evt.detail.id]+'down', {detail: true}))
    } else {
        conLeft.dispatchEvent(new CustomEvent(generic['left'][evt.detail.id]+'down', {detail: true}))
    }
});

conRight.addEventListener('buttondown', function (evt) {
    console.log("right")
    console.log(JSON.stringify(evt.detail.id))
    console.log(scheme)
    if(scheme == 'windows-mixed-reality'){
        conRight.dispatchEvent(new CustomEvent(windows['right'][evt.detail.id]+'down', {detail: true}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conRight.dispatchEvent(new CustomEvent(oc_touch['right'][evt.detail.id]+'down', {detail: true}))
    } else if (scheme == 'oculus-go'){
        conRight.dispatchEvent(new CustomEvent(oc_go['right'][evt.detail.id]+'down', {detail: true}))
    } else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conRight.dispatchEvent(new CustomEvent(vive['right'][evt.detail.id]+'down', {detail: true}))
    } else if(scheme == 'htc-vive-focus') {
        conRight.dispatchEvent(new CustomEvent(vive_focus['right'][evt.detail.id]+'down', {detail: true}))
    } else if(scheme == 'magicleap-one') {
        console.log(magic['right'][evt.detail.id]+'down')
        conRight.dispatchEvent(new CustomEvent(magic['right'][evt.detail.id]+'down', {detail: true}))
    } else {
        console.log(JSON.stringify(generic['right'][evt.detail.id]+'down'))
        conRight.dispatchEvent(new CustomEvent(generic['right'][evt.detail.id]+'down', {detail: true}))
    }
});

conLeft.addEventListener('buttonup', function (evt) {
    if(scheme == 'windows-mixed-reality'){
        conLeft.dispatchEvent(new CustomEvent(windows['left'][evt.detail.id]+'up', {detail: true}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conLeft.dispatchEvent(new CustomEvent(oc_touch['left'][evt.detail.id]+'up', {detail: true}))
    } else if (scheme == 'oculus-go'){
        conLeft.dispatchEvent(new CustomEvent(oc_go['left'][evt.detail.id]+'up', {detail: true}))
    }   else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conLeft.dispatchEvent(new CustomEvent(vive['left'][evt.detail.id]+'up', {detail: true}))
    } else if(scheme == 'htc-vive-focus') {
        conLeft.dispatchEvent(new CustomEvent(vive_focus['left'][evt.detail.id]+'up', {detail: true}))
    } else if(scheme == 'magicleap-one') {
        conLeft.dispatchEvent(new CustomEvent(magic['left'][evt.detail.id]+'up', {detail: true}))
    } else {
        conLeft.dispatchEvent(new CustomEvent(generic['left'][evt.detail.id]+'up', {detail: true}))
    }
});

conRight.addEventListener('buttonup', function (evt) {
    if(scheme == 'windows-mixed-reality'){
        conRight.dispatchEvent(new CustomEvent(windows['right'][evt.detail.id]+'up', {detail: true}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conRight.dispatchEvent(new CustomEvent(oc_touch['right'][evt.detail.id]+'up', {detail: true}))
    } else if (scheme == 'oculus-go'){
        conRight.dispatchEvent(new CustomEvent(oc_go['right'][evt.detail.id]+'up', {detail: true}))
    }   else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conRight.dispatchEvent(new CustomEvent(vive['right'][evt.detail.id]+'up', {detail: true}))
    } else if(scheme == 'htc-vive-focus') {
        conRight.dispatchEvent(new CustomEvent(vive_focus['right'][evt.detail.id]+'up', {detail: true}))
    } else if(scheme == 'magicleap-one') {
        conRight.dispatchEvent(new CustomEvent(magic['right'][evt.detail.id]+'up', {detail: true}))
    } else {
        conRight.dispatchEvent(new CustomEvent(generic['right'][evt.detail.id]+'up', {detail: true}))
    }
});

conLeft.addEventListener('axismove', function (evt) {
    if(scheme == "windows-mixed-reality"){
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conLeft.dispatchEvent(thumbstickmove)
    } else if(scheme == "oculus-touch" || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro'){
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conLeft.dispatchEvent(thumbstickmove)
    } else if (scheme == 'oculus-go'){
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
    }  else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus' || scheme == 'htc-vive-focus') {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
    } else if(scheme == "magicleap-one") {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
    } else {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conLeft.dispatchEvent(thumbstickmove)
    }
});

conRight.addEventListener('axismove', function (evt) {
    if(scheme == "windows-mixed-reality"){
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conRight.dispatchEvent(thumbstickmove)
    } else if(scheme == "oculus-touch" || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro'){
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conRight.dispatchEvent(thumbstickmove)
    } else if (scheme == 'oculus-go'){
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
    }  else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus' || scheme == 'htc-vive-focus') {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
    } else if(scheme == "magicleap-one") {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
    } else {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conRight.dispatchEvent(thumbstickmove)
    }
});