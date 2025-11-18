artimus.tools.jumble = {
    icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36.51093" height="36.51093" viewBox="0,0,36.51093,36.51093"><g transform="translate(-221.74453,-161.74453)"><g stroke-miterlimit="10"><path d="M227.16521,186.83448c1.47201,-2.88916 8.06591,-15.8312 10.77023,-21.13904c0.7023,-1.37842 2.49531,-1.8217 3.84242,-1.13535c1.66161,0.84658 6.79208,3.46053 9.69748,4.94081c1.72103,0.87686 1.87542,2.56066 1.19576,3.89464c-2.66871,5.23796 -9.17135,18.00088 -10.77023,21.13904c-0.69377,1.36168 -1.93838,1.51307 -3.30225,0.81819c-3.2313,-1.64633 -8.91549,-4.54239 -10.53742,-5.36876c-0.8249,-0.42028 -1.45418,-2.05397 -0.896,-3.14953z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M237.93543,165.69544c0.7023,-1.37842 2.49531,-1.8217 3.84242,-1.13535c1.66161,0.84658 6.79208,3.46053 9.69748,4.94081c1.72103,0.87686 1.87542,2.56066 1.19576,3.89464c-2.66871,5.23796 -5.43602,10.10312 -5.43602,10.10312l-14.35532,-7.31396c0,0 2.35136,-5.18142 5.05568,-10.48926z" fill="currentColor" stroke="none" stroke-width="none"/><path d="M221.74453,198.25547v-36.51093h36.51093v36.51093z" fill="none" stroke="none" stroke-width="none"/></g></g></svg>',
    
    jumblePixelsAt: (gl, x, y, { jumbleSize, jumbleWholeSquare, mix }) => {
        //Calculations
        const halfSize = Math.floor(jumbleSize / 2);
        const rx = x - halfSize;
        const ry = y - halfSize;

        const imageData = gl.getImageData(rx, ry, jumbleSize, jumbleSize);
        const data = imageData.data;

        //For my jumble, whole square
        if (jumbleWholeSquare) {
            const jumbled = [];
            //Randomize
            for (let i = 0; i < data.length; i+=4) { if (Math.random() > 0.5) jumbled.push(i); else jumbled.splice(0, 0, i) }

            //console.log(jumbled, data);
            for (let wy = 0; wy < jumbleSize; wy++) { for (let wx = 0; wx < jumbleSize; wx++) {
                const i1 = jumbled.pop();
                const i2 = ((wy * jumbleSize) + wx) * 4;

                const r1 = data[i1];
                const g1 = data[i1 + 1];
                const b1 = data[i1 + 2];
                const a1 = data[i1 + 3];

                const r2 = data[i2];
                const g2 = data[i2 + 1];
                const b2 = data[i2 + 2];
                const a2 = data[i2 + 3];
                
                imageData.data[i1]     += (r2 - r1) * mix;
                imageData.data[i1 + 1] += (g2 - g1) * mix;
                imageData.data[i1 + 2] += (b2 - b1) * mix;
                imageData.data[i1 + 3] += (a2 - a1) * mix;
                
                imageData.data[i2]     += (r1 - r2) * mix;
                imageData.data[i2 + 1] += (g1 - g2) * mix;
                imageData.data[i2 + 2] += (b1 - b2) * mix;
                imageData.data[i2 + 3] += (a1 - a2) * mix;
            }}
        }
        //For Chiragon's jumble, little bits.
        //We may or may not have argued for 30 minutes on this... I'm sorry for getting so heated
        //I decided to make a happy little compromise between our ideas.
        else {
            for (let i = 0; i < jumbleSize * 2; i++) {
                const x1 = artimus.iRandRange(0, jumbleSize);
                const x2 = artimus.iRandRange(0, jumbleSize);
                const y1 = artimus.iRandRange(0, jumbleSize);
                const y2 = artimus.iRandRange(0, jumbleSize);

                const i1 = (((y1) * jumbleSize) + x1) * 4;
                const i2 = (((y2) * jumbleSize) + x2) * 4;


                const r1 = data[i1];
                const g1 = data[i1 + 1];
                const b1 = data[i1 + 2];
                const a1 = data[i1 + 3];

                const r2 = data[i2];
                const g2 = data[i2 + 1];
                const b2 = data[i2 + 2];
                const a2 = data[i2 + 3];

                imageData.data[i1]     += (r2 - r1) * mix;
                imageData.data[i1 + 1] += (g2 - g1) * mix;
                imageData.data[i1 + 2] += (b2 - b1) * mix;
                imageData.data[i1 + 3] += (a2 - a1) * mix;

                imageData.data[i2]     += (r1 - r2) * mix;
                imageData.data[i2 + 1] += (g1 - g2) * mix;
                imageData.data[i2 + 2] += (b1 - b2) * mix;
                imageData.data[i2 + 3] += (a1 - a2) * mix;
            }
        }

        gl.putImageData(imageData, rx, ry);
    },

    mouseDown: (gl, x, y, toolProperties) => { artimus.tools.jumble.jumblePixelsAt(gl, x, y, toolProperties); },
    mouseMove: (gl, x, y, vx, vy, toolProperties) => { artimus.tools.jumble.jumblePixelsAt(gl, x, y, toolProperties); },

    preview: (gl, x, y, toolProperties) => {
        //Calculations
        const halfSize = Math.floor(toolProperties.jumbleSize / 2);
        const rx = x - halfSize;
        const ry = y - halfSize;

        gl.fillStyle = getComputedStyle(document.body).getPropertyValue("--artimus-eraser-outline");
        gl.fillRect(rx,ry,toolProperties.jumbleSize,toolProperties.jumbleSize);

        if (toolProperties.jumbleSize >= 3) {
            gl.fillStyle = getComputedStyle(document.body).getPropertyValue("--artimus-eraser-inline");
            gl.fillRect(rx + 1,ry + 1,toolProperties.jumbleSize - 2,toolProperties.jumbleSize - 2);
        }
    },

    CUGI:(artEditor) => { return [
        { target: artEditor.toolProperties, key: "jumbleSize", type: "int" },
        { target: artEditor.toolProperties, key: "jumbleWholeSquare", type: "boolean" },
        { target: artEditor.toolProperties, key: "mix", type: "slider", min: 0, max: 1, step: 0.05 },
    ]},

    properties: {
        jumbleSize: 10,
        jumbleWholeSquare: false,
        mix: 1,
    }
}