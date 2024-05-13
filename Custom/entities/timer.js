/* Contains code related to grille entity
   No draw function because only one entity
*/

// creates a timer entity
// called when entity is added to the scene
function createTimer() {
    let el = document.createElement('a-entity'); /* creates entity */

    /* get random colors */
    let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
    let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');

    el.setAttribute("id","timer"+timerNum++);
    el.setAttribute("text",{"value": "00:00.00 ", "color": "#FFFFFF",  width: 65, height: 65, align:"center", "wrapCount": 9});

    return el;
}

// edits timer entity
// called when timer attribute is changed
function editTimer(ent) {
    if(isNaN(parseFloat($("#size").val()))){
        alert("Please enter a valid size");
        return false;
    }
    if(parseFloat($("#size").val()) < 0){
        alert("Please enter a valid size ( >= 0 )");
        return false;
    }

    ent.setAttribute('text', {value: ent.getAttribute('text').value, width: parseFloat($("#size").val()), height: parseFloat($("#size").val()), color: $("#color").val(), wrapCount: ent.getAttribute('text').value.length})

    return true;
}

// starts the timer and updates its value
var time;
var timeElapsed = 0;
function startTimer(){
    time = setInterval(() => {
        timeElapsed += 10;
        let timer = document.getElementById('timer0')
        let textVal = timer.getAttribute('text')
        let time = Math.floor(timeElapsed)
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

        textVal.value = minutes+":"+seconds+":"+time[0]+time[1]+" "
        timer.setAttribute('text',textVal)

    },10)
}