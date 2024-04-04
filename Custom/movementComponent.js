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
        if(this.data.status == 1){
            if(this.data.timeElapsed < 0){
                this.data.timeElapsed = 0
                
            } else {
                this.data.timeElapsed = this.data.timeElapsed + timeDelta
                /*if(timerNum > 0){
                    console.log(this.data.timeElapsed)
                    let timer = document.getElementById('timer0')
                    let textVal = timer.getAttribute('text')
                    let time = Math.floor(this.data.timeElapsed)
                    let minutes = Math.floor(time/1000/60)
                    time -= minutes*1000*60
                    if(minutes < 10){
                        minutes = "0"+minutes
                    } else {
                        minutes = ""+minutes
                    }
                    
                    let seconds = Math.floor(time/1000)
                    time -= seconds*1000
                    if(seconds < 10){
                        seconds = "0"+seconds
                    } else {
                        seconds = ""+seconds
                    }
                    if(time < 10){
                        time = "00"+time
                    } else if(time < 100){
                        time = "0"+time
                    } else {
                        time = ""+time
                    }
                    //console.log(time)
                    //textVal.value = minutes+":"+seconds+":"+time
                    textVal.value = minutes+":"+seconds+":"+time[0]
                    timer.setAttribute('text',textVal)
                }*/
            }  
            this.updatePosition()  
            
        } else if(this.data.status == -1){
            this.data.timeElapsed = -1;

        }
        


    },

    updatePosition: function (time, timeDelta) {
        // this algorithm will ignore cylindical movement to start
        let data = this.data

        let startPoint = data.startPoints[data.index]

        // get endPoint
        let endPoint = data.endPoints[data.index]

        
        if(startPoint.x){
                            // get startPoint
            let startPoint = data.startPoints[data.index]

            // get endPoint
            let endPoint = data.endPoints[data.index]

            if(data.types[data.index] == 'Pause'){
                /*if(this.data.index != 0 && data.types[data.index-1] != 'Pause'){
                    this.el.setAttribute('position',data.endPoints[data.index-1])
                }*/
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                        //this.el.setAttribute('position',endPoint)
                        this.data.timeElapsed = 0
                        if(data.index < data.startPoints.length-1){
                            this.data.index = this.data.index + 1
                        } else {
                            this.data.index = 0;
                        }
                    }

            } else if(data.types[data.index] == 'Discontinuous'){
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                    this.el.setAttribute('position',endPoint)
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                }
            } else {
                // if the current type is start-to-finish or rubberband
                // these are handled the same
                // get total distance between points and amount of that distance covered
                xDelta = endPoint.x-startPoint.x
                yDelta = endPoint.y-startPoint.y
                zDelta = endPoint.z-startPoint.z
                d = Math.sqrt((xDelta)*(xDelta) + (yDelta)*(yDelta) + (zDelta)*(zDelta))
                distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)
                amtCovered = (distanceCovered/d)
                if(amtCovered > 1){
                    this.data.timeElapsed = 0
                    amtCovered = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                    
                }

                res = {x: startPoint.x+(xDelta*amtCovered), y: startPoint.y+(yDelta*amtCovered), z: startPoint.z+(zDelta*amtCovered)}
                this.el.setAttribute('position',{x: res.x, y: res.y, z: res.z})
            }
        } else {


            if(data.types[data.index] == 'Pause'){
                /*if(this.data.index != 0 && data.types[data.index-1] != 'Pause'){
                    this.el.setAttribute('position',{x: -data.endPoints[data.index-1].r*Math.sin((data.endPoints[data.index-1].theta*Math.PI)/180), y: data.endPoints[data.index-1].y, z: data.endPoints[data.index-1].r * Math.cos((data.endPoints[data.index-1].theta*Math.PI)/180)})
                }
                console.log(this.el.getAttribute('position'))*/
                if(data.timeElapsed >= data.initialVelocities[data.index]){
                        //this.el.setAttribute('position',endPoint)
                        this.data.timeElapsed = 0
                        if(data.index < data.startPoints.length-1){
                            this.data.index = this.data.index + 1
                        } else {
                            this.data.index = 0;
                        }
                    }

            } else if(data.types[data.index] == 'Discontinuous'){
                if(data.timeElapsed >= data.initialVelocities[data.index]){
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
                
                
                thetaDelta = Math.abs(endPoint.theta-startPoint.theta)
                arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(endPoint.r);
                yDelta = Math.abs(endPoint.y-startPoint.y)
                d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
                
                distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)

                amtCovered = d ? (distanceCovered/d) : 0
                //console.log(amtCovered)


                if(amtCovered > 1){
                    this.data.timeElapsed = 0
                    amtCovered = 0
                    if(data.index < data.startPoints.length-1){
                        this.data.index = this.data.index + 1
                    } else {
                        this.data.index = 0;
                    }
                    startPoint = data.startPoints[data.index]

                    // get endPoint
                    endPoint = data.endPoints[data.index]
                    thetaDelta = Math.abs(endPoint.theta-startPoint.theta)
                    arcLen = Math.abs(thetaDelta*Math.PI/180)*Math.abs(endPoint.r);
                    yDelta = Math.abs(endPoint.y-startPoint.y)
                    d = Math.sqrt((arcLen)*(arcLen) + (yDelta)*(yDelta))
                    distanceCovered = (data.initialVelocities[data.index])*(data.timeElapsed/1000) + 0.5*(data.accelerations[data.index])*((data.timeElapsed/1000)**2)
                    amtCovered = (distanceCovered/d)


                }
                if(this.data.types[this.data.index] != 'Pause'){
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