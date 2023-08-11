Extra
===================

JSON Package Format
--------------------
| {  
| "scenes": { map of scenes },  
| "textures": {  
|  "uploadedTextureFormats":  { map of image sizes for uploaded textures },  
|  "textureValues":  [ list of textures present when package was saved],  }  
| "date": "<datetime of save>"  
| }  

Z-Fighting
-----------
Do not stack entities on the same Z axis. Stacking entities on the same plane will result in `z-fighting <https://en.wikipedia.org/wiki/Z-fighting>`_. Instead, provide a slight offset on the Z-axis when overlapping entities.

Easy Debugging
---------------
If you would like to inspect the HTML or JavaScript data of the selected entity:  
- Open the inspector with Ctrl + Shift + i
  - On headsets, a limited console can be opened with Ctrl+i. This console does not take inputs but will display errors.
- Enter "selectedEntity" into the command prompt, this will bring up all associated HTML code
- Enter "selectedEntity.getAttribute("\<desired component\>") to see the associated JavaScript data for the desired component
   - Ex: selectedEntity.getAttribute("position") to view position or selectedEntity.getAttribute("material") to view texture and color
- Enter "selectedEntity.setAttribute("\<desired component\>",\<desired value\>) to set the associated JavaScript data for the desired component
   - Ex: selectedEntity.setAttribute("position",{x: 0, y: 0, z: -125}) to set position to 0,0 on the cylindrical plane
   - Ex: selectedEntity.setAttribute("material",{color: "#0000FF", shader: "flat", src: ""}) to set the color to red and remove the texture
   - Make sure to include shader: "flat" to remove unnecessary lighting effects
