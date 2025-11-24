artimus.tools.selectionLasso = class extends artimus.tool {
    get icon() { return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43.78882" height="43.78882" viewBox="0,0,43.78882,43.78882"><g transform="translate(-218.10559,-158.10559)"><g fill="none" stroke-miterlimit="10"><path d="M224.72126,195.60047l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M225.38759,188.40561l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M226.05565,181.19199l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M226.72197,173.99712l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M249.09768,193.24798l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M242.05076,193.9283l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M234.98549,194.61038l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M227.93858,195.2907l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M255.26475,164.41328l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M248.21784,165.0936l-3.21652,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M241.15258,165.77568l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M234.10566,166.456l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M252.97389,189.28619l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M253.64021,182.09132l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M254.30827,174.87771l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M254.9746,167.68284l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M218.10559,201.89441v-43.78882h43.78882v43.78882z" stroke="none" stroke-width="0" stroke-linecap="butt"/></g></g></svg><!--rotationCenter:21.894410590842682:21.894410590842682-->'; }
    
    mouseDown(gl, x, y, toolProperties) {
        toolProperties.path = [x, y];
        toolProperties.drawing = true;
    }

    mouseMove(gl, x, y, vx, vy, toolProperties) {
        if (toolProperties.drawing) {
            const last = toolProperties.path.length - 2;
            const ex = [toolProperties.path[last]];
            const ey = [toolProperties.path[last + 1]];

            //Make sure that we are only adding more path when the pixel is moved.
            if (Math.sqrt((Math.pow(ex - x, 2)) + Math.pow(ey - y, 2)) >= 1) toolProperties.path.push(x, y);
        }
    }

    mouseUp(gl, x, y, toolProperties) {
        if (toolProperties.path) {
            toolProperties.path.push(x, y);
            if (toolProperties.path.length == 0) this.workspace.clearSelection();
            else this.workspace.setSelection(toolProperties.path);
        }

        toolProperties.path = null;
        toolProperties.drawing = false;
    }

    preview(gl, x, y, toolProperties) {
        if (toolProperties.drawing) {
            gl.setLineDash([4, 2]);
            gl.strokeStyle = getComputedStyle(document.body).getPropertyValue("--artimus-selection-outline");
            gl.lineWidth = 1;

            //Set line
            gl.beginPath();

            //Define the path
            for (let i = 0; i<toolProperties.path.length; i+=2) {
                if (i == 0) gl.moveTo(toolProperties.path[i] + 0.5, toolProperties.path[i + 1] + 0.5);
                else gl.lineTo(toolProperties.path[i] + 0.5, toolProperties.path[i + 1] + 0.5);
                gl.moveTo(toolProperties.path[i] + 0.5, toolProperties.path[i + 1] + 0.5)
            }
            gl.lineTo(toolProperties.path[0] + 0.5, toolProperties.path[1] + 0.5);
            
            //Then draw and reset
            gl.stroke();
            gl.closePath();
            gl.setLineDash([]);
        }
        else {
            gl.fillStyle = getComputedStyle(document.body).getPropertyValue("--artimus-selection-outline");
            gl.fillRect(x, y, 1, 1);
        }
    }
}