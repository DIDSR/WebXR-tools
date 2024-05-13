/* Contains code related to texture input and change */

/* If the textbox for texture value is changed */
$("#texture").change(function() {
    if(texture.value == "none"){
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: ""});
        fillIn.style.display = "block";
        editEntity()
    } else {
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: "#"+texture.value});
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        if(typeof selectedEntity.getAttribute("material").src == "object"){
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(selectedEntity.getAttribute("material").src.naturalWidth/selectedEntity.getAttribute("material").src.naturalHeight)*250, height: .5*250});
        } else {
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(uploadedTextureFormat[texture.options[texture.selectedIndex].text].width/uploadedTextureFormat[texture.options[texture.selectedIndex].text].height)*250, height: .5*250});
        }
        if(selectedEntity.getAttribute("fill").isFull){
            if(selectedEntity.getAttribute("geometry").width > selectedEntity.getAttribute("geometry").height){
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").height, isFull: true});
            } else {
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").width, isFull: true});
            }
        }
        width.value = selectedEntity.getAttribute("geometry").width;
        height.value = selectedEntity.getAttribute("geometry").height;
        fill.value = selectedEntity.getAttribute("fill").val;
        fillIn.style.display = "none";
        updateJSON();
    }
    

  });
  

/* If the textbox for x value is changed */
$("#texture-input").change(function() {
    let i = 0;
    var j = 0;
    while(i < texture_input.files.length){
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploaded_image = reader.result;
        });
        
        var name = this.files[i].name;
        reader.readAsDataURL(this.files[i]);
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();
    
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            
            //Validate the File Height and Width.
            image.onload = function () {
                let k = 0;
                let skip = false;
                while(k < texture.options.length){
                    if(texture.options[k].text == texture_input.files[j].name){
                        skip = true;
                    }
                    k++;
                }
                if(!skip){
                    var height = this.height;
                    var width = this.width;
                    uploadedTextureFormat[texture_input.files[j].name] = {width: width, height: height};
                    var option = document.createElement("option"); 
                    option.text = texture_input.files[j++].name;
                    option.value = `url(${this.src})`;
                    texture.add(option);
                }
            };
        }
        i++;
    }

  });