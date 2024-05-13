AFRAME.registerComponent('movement', {
    schema: {
        origin: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
        rotationOrigin: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
        startPoints: {type: 'array', default: []},
        endPoints: {type: 'array', default: []},
        initialVelocities: {type: 'array', default: []},
        accelerations: {type: 'array', default: []},
        status: {type: 'float', default: -1},
        types: {type: 'array', default: []},
        index: {type: 'float', default: 0},
        currentVelocity: {type: 'float', default: 0},
        timeElapsed: {type: 'float', default: 0},
    },

    init: function () {
    // Do something when component first attached.
    
    },

    update: function (oldData) {
    // Do something when component's data is updated.
        // if status has been changed to stop
        if(oldData.status != -1 && this.data.status == -1){
            // then we have been moved to the stopped status
            // restore position to origin and rotation to rotationOrigin
            this.el.setAttribute('position',this.data.origin)
            this.el.setAttribute('rotation',this.data.rotationOrigin)
        }

    },

    remove: function () {
    // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
        // if playing
        if(this.data.status == 1){
            // time elapsed below 0 indicates that no movement is underway
            if(this.data.timeElapsed < 0){ // set time elapsed to 0
                this.data.timeElapsed = 0
                
            } else { // update time elapsed
                this.data.timeElapsed = this.data.timeElapsed + timeDelta
            }  
            this.updatePosition()  // call movement function
            
        } else if(this.data.status == -1){ // if stopped
            this.data.timeElapsed = -1; // reset time

        }
        


    },

    // does calculation of new position
    updatePosition: function (time, timeDelta) {
        let data = this.data

        let startPoint = data.startPoints[data.index]

        let endPoint = data.endPoints[data.index]

        // if in advanced mode
        if(startPoint.x){
            // if pause
            if(data.types[data.index] == 'Pause'){
                // if pause has reached duration
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                    // move on to next movement
                    this.data.timeElapsed = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                }

            // if Discontinuous
            } else if(data.types[data.index] == 'Discontinuous'){
                // if time has reached duration
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                    // teleport then move to next animation
                    this.el.setAttribute('position',endPoint)
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                }
            } else {
                // if the current type is start-to-finish or rubberband or rebound
                // these are handled the same
                // get total distance between points and amount of that distance covered
                xDelta = endPoint.x-startPoint.x
                yDelta = endPoint.y-startPoint.y
                zDelta = endPoint.z-startPoint.z
                d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
                distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)
                amtCovered = (distanceCovered/d)
                amtCovered = d ? (distanceCovered/d) : 0

                if(amtCovered > 1){  // if amount covered has exceeded that of the animation
                    // move to next animation
                    this.data.timeElapsed = 0
                    amtCovered = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                    // recalculate total distance and amt covered with new points
                    startPoint = data.startPoints[data.index]
                    endPoint = data.endPoints[data.index]
                    xDelta = endPoint.x-startPoint.x
                    yDelta = endPoint.y-startPoint.y
                    zDelta = endPoint.z-startPoint.z
                    d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
                    distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)
                    amtCovered = (distanceCovered/d)
                    amtCovered = d ? (distanceCovered/d) : 0


                }
                
                // if new animation is not a pause
                if(this.data.types[this.data.index] != 'Pause'){
                    // set position
                    xDelta = endPoint.x-startPoint.x
                    yDelta = endPoint.y-startPoint.y
                    zDelta = endPoint.z-startPoint.z
                    res = {x: startPoint.x+(xDelta*amtCovered), y: startPoint.y+(yDelta*amtCovered), z: startPoint.z+(zDelta*amtCovered)}
                    this.el.setAttribute('position',{x: res.x, y: res.y, z: res.z})
                }


            }
        } else { // if not in advanced mode
            // if pause
            if(data.types[data.index] == 'Pause'){
                // if pause has reached duration
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                    // move on to next movement
                    this.data.timeElapsed = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                }
            // if Discontinuous
            } else if(data.types[data.index] == 'Discontinuous'){
                // if time has reached duration
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                    // teleport then move to next animation
                    this.el.setAttribute('position',{x: -endPoint.r*Math.sin((endPoint.theta*Math.PI)/180), y: endPoint.y, z: endPoint.r * Math.cos((endPoint.theta*Math.PI)/180)})
                    this.el.setAttribute('rotation',{x: 0, y: -endPoint.theta, z: 0})
                    this.data.timeElapsed = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }

                }
            } else {        
                // if the current type is start-to-finish or rubberband or rebound
                // these are handled the same
                // get total distance between points and amount of that distance covered
                thetaDelta = Math.abs(endPoint.theta-startPoint.theta)
                arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(endPoint.r);
                yDelta = Math.abs(endPoint.y-startPoint.y)
                d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
                
                distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)

                amtCovered = d ? (distanceCovered/d) : 0

                if(amtCovered > 1){ // if amount covered has exceeded that of the animation
                    // move to next animation
                    this.data.timeElapsed = 0
                    amtCovered = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                    
                    // recalculate total distance and amt covered with new points
                    startPoint = data.startPoints[data.index]
                    endPoint = data.endPoints[data.index]
                    thetaDelta = Math.abs(endPoint.theta-startPoint.theta)
                    arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(endPoint.r);
                    yDelta = Math.abs(endPoint.y-startPoint.y)
                    d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
                    distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)
                    amtCovered = (distanceCovered/d)


                }

                // if new animation is not a pause
                if(this.data.types[this.data.index] != 'Pause'){
                    // set new position
                    thetaDelta = endPoint.theta-startPoint.theta
                    yDelta = endPoint.y-startPoint.y
                    res = {theta: startPoint.theta+(thetaDelta*amtCovered), y: startPoint.y+(yDelta*amtCovered), r: startPoint.r}
                    
                    this.el.setAttribute('position',{x: -res.r*Math.sin((res.theta*Math.PI)/180), y: res.y, z: res.r * Math.cos((res.theta*Math.PI)/180)})
                    this.el.setAttribute("rotation", {x: 0, y: -res.theta, z: 0}); // set rotation to be 0
                }

            }
        }

    }
});