// Create all squares in game area
function createSquares(gameArea){
	const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	
	// Numbers in game area
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	for(let i = 0; i < 11; i++){
		for(let j = 0; j < 11; j++){
			let square = createElement("div", gameArea);
			setAttribute(square, "class", "square");

			// Add id to appropriate squares (actual game area)
			if(i != 0 && j != 0){
				setAttribute(square, "id", "square" + letters[i - 1] + numbers[j - 1]);
			}
			else{
				// Add letters horizontally
				if(i == 0 && j != 0)
					square.innerHTML = letters[j - 1];

				// Add numbers vertically
				else if(j == 0 && i != 0)
					square.innerHTML = numbers[i - 1];
				
				else if(i == 0 && j == 0){
					square.innerHTML = "*";
					square.style.color = "transparent";
				}

				square.style.borderColor = "transparent";
			}
		}
	}
}

// Create element knowing their type and parent
function createElement(type, parent){

	let elem = document.createElement(type);

	if(parent == "body") 
		document.body.appendChild(elem);
	else 
		parent.appendChild(elem);

	return elem;

}

// Give attrubutes to element
function setAttribute(elem){

	for(let i = 1; i < arguments.length; i += 2){
		elem.setAttribute(arguments[i], arguments[i + 1]);
	}

	return elem;
}

// Get nose coordinates of the ship
function noseCoordinates(ship){
	let image = ship.getAttribute("src")[10];
	let coordX, coordY;
	if(image != "R"){
		coordY = ship.offsetTop + ship.clientHeight / 2;
		coordX = ship.offsetLeft;
	}
	else{
		coordY = ship.offsetTop + 50;
		coordX = ship.offsetLeft + ship.clientWidth / 2;
	}
	return {X : coordX, Y : coordY};
}

// Make appropriate squares transparent, when "delete" button clicked
function makeSquaresTransparent(square, index, realShipColor){
	// Verification for all squares
	for(let i = -12; i <= 10; i += 11){
		for(let j = 0; j < 3; j++){
			if(square[index + i + j] != undefined){
				let isRecolorizable = true;

				// Verification for one square
				for(let k = -12 + i; k <= 10 + i ; k += 11){
					for(let g = j; g < 3 + j; g++){				
						if(square[index + g + k] != undefined && square[index + g + k].style.backgroundColor == realShipColor){
							isRecolorizable = false;
							break;
						}
					}
					if(!isRecolorizable) break;
				}
				if(isRecolorizable) square[index + i + j].style.backgroundColor = "transparent";

			}
		}
	}
}

// Colorize squares with appropriate color depend on conditions when ship crosses on game area 
function colorizeSquare(square, color, conditionalColor1, conditionalColor2){
	if(square != undefined){
		if(square.style.backgroundColor != conditionalColor1 && square.style.backgroundColor != conditionalColor2){
			if(square.innerHTML == ""){
				square.style.backgroundColor = color;
			}
		}
	}
}


