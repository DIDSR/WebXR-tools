/* 
    Handles user input

*/

/* If the textbox for sky color is changed */
$('#skyCol').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        sky.setAttribute("material",{color: $("#skyCol").val()});
        if(colorChange){
            updateJSON();
        }
        colorChange = true
    },
});

/* If the textbox for x value is changed */
$("#x").change(function() {
    editEntity();
  });

/* If the textbox for y value is changed */
$("#y").change(function() {
    editEntity();
  });

/* If the textbox for z value is changed */
$("#z").change(function() {
    editEntity();
  });

/* If the textbox for endX value is changed */
$("#startX").change(function() {
    editEntity();
  });

/* If the textbox for endY value is changed */
$("#startY").change(function() {
    editEntity();
  });

/* If the textbox for endZ value is changed */
$("#startZ").change(function() {
    editEntity();
  });

/* If the textbox for endX value is changed */
$("#endX").change(function() {
    editEntity();
  });

/* If the textbox for endY value is changed */
$("#endY").change(function() {
    editEntity();
  });

/* If the textbox for endZ value is changed */
$("#endZ").change(function() {
    editEntity();
  });

  /* If the textbox for endX value is changed */
$("#speedIn").change(function() {
    editEntity();
  });

/* If the textbox for endY value is changed */
$("#accelerationIn").change(function() {
    editEntity();
  });

/* If the textbox for endZ value is changed */
$("#movementTypeIn").change(function() {
    editEntity();
  });

/* If the textbox for color value is changed */
$('#color').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

/* If the textbox for secondary color value is changed */
$('#color2').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

/* If the textbox for fill value is changed */
$("#fill").change(function() {
    if(selectedEntity.id.includes("plane")){
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) <= parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
            alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else if(parseFloat($("#fill").val()) == parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    } else {
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if(parseFloat($("#radius").val()) < parseFloat($("#fill").val())){
            alert("Border too large, will change size of entity (0 < border <= radius)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#radius").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    }
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationZ").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationY").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationX").change(function() {
    editEntity();
  });

/* If the textbox for radius value is changed */
$("#radius").change(function() {
    if(parseFloat($("#fill").val()) > parseFloat($("#radius").val()) || selectedEntity.getAttribute("fill").isFull){
        fill.value = parseFloat($("#radius").val());
        selectedEntity.setAttribute("fill",{val: parseFloat($("#radius").val()), isFull: true});
    }
    editEntity();
  });

/* If the textbox for width value is changed */
$("#width").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())) || (parseFloat($("#height").val()) > parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#width").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#width").val()), isFull: true});
        }
    }
    
    
    editEntity();
  });

/* If the textbox for height value is changed */
$("#height").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())) || (parseFloat($("#height").val()) < parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#height").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#height").val()), isFull: true});
        }
    }
    editEntity();
  });

/* If the textbox for vax value is changed */
$("#vax").change(function() {
    editEntity();
  });

  /* If the textbox for vax value is changed */
$("#size").change(function() {
    editEntity();
  });

/* If the textbox for vay value is changed */
$("#vay").change(function() {
    editEntity();
  });

/* If the textbox for vbx value is changed */
$("#vbx").change(function() {
    editEntity();
  });

/* If the textbox for vby value is changed */
$("#vby").change(function() {
    editEntity();
  });

/* If the textbox for vcx value is changed */
$("#vcx").change(function() {
    editEntity();
  });

/* If the textbox for vcy value is changed */
$("#vcy").change(function() {
    editEntity();
  });

/* If the textbox for numbers of bars value is changed */
$("#numBarsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of rows is changed */
$("#rowsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of cols is changed */
$("#colsIn").change(function() {
    editEntity();
  });

/* If the textbox for size of tiles is changed */
$("#tileSizeIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#circleSizeIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#spacingIn").change(function() {
    editEntity();
  });

/* If the textbox for size of tiles is changed */
$("#numDotsIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#numCirclesIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#arraySpacingIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#numRingsIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#ringSpacingIn").change(function() {
    editEntity();
  });

  /* If the textbox for size of tiles is changed */
$("#ringThicknessIn").change(function() {
    editEntity();
  });

$("#toggleCenterDotIn").change(function() {
    editEntity();
});

$("#ringPitchIn").change(function() {
    editEntity();
});

$("#text").change(function() {
    editEntity();
});