artimus.tools.selectionCircle = class extends artimus.tool {
    get icon() { return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43.78882" height="43.78882" viewBox="0,0,43.78882,43.78882"><g transform="translate(-218.10559,-158.10559)"><g fill="none" stroke-miterlimit="10"><path d="M224.72126,195.60047l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M225.38759,188.40561l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M226.05565,181.19199l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M226.72197,173.99712l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M249.09768,193.24798l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M242.05076,193.9283l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M234.98549,194.61038l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M227.93858,195.2907l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M255.26475,164.41328l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M248.21784,165.0936l-3.21652,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M241.15258,165.77568l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M234.10566,166.456l-3.21653,0.31053" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M252.97389,189.28619l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M253.64021,182.09132l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M254.30827,174.87771l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M254.9746,167.68284l0.30414,-3.28406" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M218.10559,201.89441v-43.78882h43.78882v43.78882z" stroke="none" stroke-width="0" stroke-linecap="butt"/></g></g></svg><!--rotationCenter:21.894410590842682:21.894410590842682-->'; }
    
    mouseDown(gl, x, y, toolProperties) {
        toolProperties.start = [x, y];
    }

    mouseUp(gl, x, y, toolProperties) {
        if (toolProperties.start) {
            if (toolProperties.start[0] == x && toolProperties.start[1] == y) this.workspace.clearSelection();
            else {
                const [sx, sy] = toolProperties.start;
                let cx = (x + sx) / 2;
                let cy = (y + sy) / 2;

                let rx = (x - sx) / 2;
                let ry = (y - sy) / 2;

                const points = [];

                //This is probably good enough.
                //! Shown above is sloth
                for (let i = 0; i < 360; i++) {
                    let rad = artimus.degreeToRad(i);
                    points.push(
                        (Math.sin(rad) * rx) + cx,
                        (Math.cos(rad) * ry) + cy
                    )
                }

                this.workspace.setSelection(points);
            }
        }

        toolProperties.start = null;
    }

    preview(gl, x, y, toolProperties) {
        if (toolProperties.start) {
            let [sx, sy] = toolProperties.start;
            const hx = (x + sx) / 2;
            const hy = (y + sy) / 2;

            //Flip due to canvas context 2d not supporting ellipses of negative proportions
            if (x < sx) {
                let t = sx;
                sx = x;
                x = t;
            }

            if (y < sy) {
                let t = sy;
                sy = y;
                y = t;
            }

            gl.setLineDash([4, 2]);
            gl.strokeStyle = getComputedStyle(document.body).getPropertyValue("--artimus-selection-outline");
            gl.lineWidth = 1;

            gl.beginPath();
            gl.ellipse(hx, hy, (x - sx) / 2, (y - sy) / 2, 0, 0, 2 * Math.PI);
            gl.stroke();
            gl.setLineDash([]);
        }
        else {
            gl.fillStyle = getComputedStyle(document.body).getPropertyValue("--artimus-selection-outline");
            gl.fillRect(x, y, 1, 1);
        }
    }
}