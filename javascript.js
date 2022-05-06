let container = document.querySelector('.container');
let dimensionButton = document.querySelector('.dimension-button');
let rgbButton = document.querySelector('.rgb-button');
let darkenButton = document.querySelector('.darken-button');
let blueButton = document.querySelector('.blue-button');

let rgbSelected = false;
let darkenSelected = false;
let blueSelected = true;

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`


var lightenDarkenColor = function (col, amt) {
	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col, 16);
	var r = (num >> 16) + amt;
	if (r > 255) {
		r = 255;
	} else if (r < 0) {
		r = 0;
	}
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) {
		b = 255;
	} else if (b < 0) {
		b = 0;
	}
	var g = (num & 0x0000FF) + amt;
	if (g > 255) {
		g = 255;
	} else if (g < 0) {
		g = 0;
	}
	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function shadeColor1(color, percent) {	// deprecated. See below.
    var num = parseInt(color,16),
        amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
    return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

rgbButton.addEventListener('click', function() {
    rgbSelected = true;
    darkenSelected = false;
    blueSelected = false;
});

darkenButton.addEventListener('click', function(){
    darkenSelected = true;
    rgbSelected = false;
    blueSelected = false;
})

blueButton.addEventListener('click', function(){
    blueSelected = true;
    rgbSelected = false;
    darkenSelected = false;
})

dimensionButton.addEventListener('click', function(){

    let dimension = prompt("Enter the width of the Etch-A-Sketch: ");

    if (dimension > 100){
        alert("Too big");
    }

    else{
        
        var child = container.lastElementChild;
        while(child){
            container.removeChild(child);
            child = container.lastElementChild;
        }


        for(let i = 1; i <= dimension; i++){
            const row = document.createElement('div');
            row.classList.add('row');
            for(let j = 1; j <= dimension; j++){
                const box = document.createElement('div');
                box.classList.add('box');
                box.style.backgroundColor = '#808080';
                box.style.width = 750/dimension + "px";
                box.style.height = 750/dimension + "px";
                row.appendChild(box);

                box.addEventListener('mouseover', function(e) {
                    if (rgbSelected){
                        box.style.backgroundColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                    }
                    else if (blueSelected){
                        box.style.backgroundColor = "rgb(0, 0, 255)";
                    }
                    else if (darkenSelected){
                        console.log("Background color: " + rgba2hex(box.style.backgroundColor));
                        console.log("Lightened color: " + lightenDarkenColor(rgba2hex(box.style.backgroundColor), -10));
                        box.style.backgroundColor = lightenDarkenColor(rgba2hex(box.style.backgroundColor), -10);

                    }
                });
            }
            container.appendChild(row);
        }
    }
});