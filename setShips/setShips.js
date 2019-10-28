// Disable menu opening when mouse right button clicked
document.addEventListener("contextmenu", function(e){
	e.preventDefault();
}, false);

// The whole board
const board = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Letters in gane area
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// Numbers in game area
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Colors that will be used to colorize squares around and under ship
const phantomShipColor = "rgb(0, 255, 0)"; // green
const phantomShipAroundColor = "rgb(236, 236, 236)"; // #ececec
const realShipColor = "rgb(255, 0, 0)"; // red
const realShipAroundColor = "rgb(0, 0, 255)"; // blue

// All ships that will be setted in the game area
let lastShip = [];

// Create squares
document.addEventListener("DOMContentLoaded", () => {

	let gameArea = document.getElementById("gameArea");
	createSquares(gameArea)

	const squares = document.getElementsByClassName("square");

	// Situate div that show ships and its' count
	document.getElementById("chooseShip").style.top = gameArea.offsetTop + gameArea.clientHeight + "px";
	document.getElementById("chooseShip").style.left = gameArea.offsetLeft + "px";

	// Situate divs that shows count of ships
	document.getElementsByClassName("countOf1x1")[0].style.width = document.getElementsByClassName("choose1x1")[0].clientWidth + "px";
	document.getElementsByClassName("countOf2x1")[0].style.width = document.getElementsByClassName("choose2x1")[0].clientWidth + "px";
	document.getElementsByClassName("countOf3x1")[0].style.width = document.getElementsByClassName("choose3x1")[0].clientWidth + "px";
	document.getElementsByClassName("countOf4x1")[0].style.width = document.getElementsByClassName("choose4x1")[0].clientWidth + "px";

	// Situate button that will remove last setted ship
	let removeShip = document.getElementsByClassName("removeLastShip")[0];
	removeShip.style.left = gameArea.offsetLeft + gameArea.clientWidth + 50 + "px";

	////////////////////////////////////////////////////// REMOVE button clicked /////////////////////////////////////
	removeShip.addEventListener("click", function(){
		if(lastShip.length != 0){

			// Last situated ship
			let ship = lastShip[lastShip.length - 1];
		
			let shipLength = parseInt(ship.getAttribute("src")[7]);
			let image = ship.getAttribute("src")[10];

			let noseCoords = noseCoordinates(ship);
			let coordX = noseCoords.X;
			let coordY;

			if(image == "R")
				coordY = noseCoords.Y - 50;
			else
				coordY = noseCoords.Y;

			// Recolorize squares to transparent
			for(let k = 0; k < squares.length; k++){
				if(coordY >= squares[k].offsetTop + gameArea.offsetTop && coordY <= squares[k].offsetTop + squares[k].clientHeight + gameArea.offsetTop &&
				coordX >= squares[k].offsetLeft + gameArea.offsetLeft && coordX <= squares[k].offsetLeft + squares[k].clientWidth + gameArea.offsetLeft){
					if(image != "R"){
						for(let j = k; j < k + shipLength; j++){
							squares[j].style.backgroundColor = "transparent";
							board[parseInt(j / 11) - 1][j % 11 - 1] = 0;
						}
						makeSquaresTransparent(squares, k + shipLength - 1, realShipColor);
					}
					else{
						for(let j = k; j < k + 11 * shipLength; j += 11){
							squares[j].style.backgroundColor = "transparent";
							board[parseInt((j - 11) / 11)][(j - 11) % 11 - 1] = 0;
						}
						makeSquaresTransparent(squares, k + 11 * shipLength - 11, realShipColor);
						
					}
					makeSquaresTransparent(squares, k, realShipColor);
					console.log(board)
					break;
				}
			}
			// Add by 1 last situated ship's count
			document.getElementsByClassName("countOf" + ship.getAttribute("src")[7] + "x1")[0].innerHTML = parseInt(document.getElementsByClassName("countOf" + ship.getAttribute("src")[7] + "x1")[0].innerHTML) + 1;
			// Remove last situated ship
			lastShip[lastShip.length - 1].remove();
			lastShip.length--;
		}
	})

	const chooseShip = document.getElementsByClassName("chooseShip");
	

	for(let i = 0; i < chooseShip.length; i++){
		chooseShip[i].addEventListener("click", (e) => {

			// Find out count of choosen ship
			let currentShipCount;
			switch (i) {
				case 0:
					currentShipCount = parseInt(document.getElementsByClassName("countOf1x1")[0].innerHTML);
					break;
				case 1:
					currentShipCount = parseInt(document.getElementsByClassName("countOf2x1")[0].innerHTML);
					break;
				case 2:
					currentShipCount = parseInt(document.getElementsByClassName("countOf3x1")[0].innerHTML);
					break;
				case 3:
					currentShipCount = parseInt(document.getElementsByClassName("countOf4x1")[0].innerHTML);
					break;
			}
			
			if(currentShipCount != 0){
				currentShipCount--;
				
				document.getElementsByClassName("countOf" + (i + 1) + "x1")[0].innerHTML = currentShipCount;


				let shipLength = parseInt(chooseShip[i].getAttribute("src")[7]);

				
				// Phantom ship creating
				let phantomShip = createElement("img", "body");
				setAttribute(phantomShip, "class", chooseShip[i].getAttribute("class") + " phantomShip", "src", chooseShip[i].getAttribute("src"));

				if(shipLength == "1"){
					phantomShip.style.height = "30px"
				}

				// Phantom ship initial positions
				phantomShip.style.left = e.clientX - chooseShip[i].clientWidth / 2 + "px";
				phantomShip.style.top = e.clientY - chooseShip[i].clientHeight / 2 + "px";

				// Phantom ship following to mouse
				document.addEventListener("mousemove", followMouse);

				// Rotate phantom ship if mouse right button clicked
				document.addEventListener("mousedown", rotatePhantom);

				// Set ship if mouse left button clicked
				document.addEventListener("mousedown", setShip);
				
////////////////////////////////////////////////////////// Callback function to FOLLOW //////////////////////////////////////////////////////////
				function followMouse(e) {

					// Make all squares transparent which was colorized by phantom ship which was deleted
					for(let k = 0; k < squares.length; k++){
						if(squares[k].style.backgroundColor != realShipAroundColor && squares[k].style.backgroundColor != realShipColor)
							squares[k].style.backgroundColor = "transparent";
					}

					// Change ship left and top positions depend on mouse left and top positions
					if(e.clientX + phantomShip.clientWidth / 2 <= document.body.clientWidth && e.clientY + phantomShip.clientHeight / 2 <= document.body.clientHeight){
						phantomShip.style.left = e.clientX - phantomShip.offsetWidth / 2 + "px";
						phantomShip.style.top = e.clientY - phantomShip.offsetHeight / 2 + "px";
					}
					// Ship's nose coordinates
					let noseCoords = noseCoordinates(phantomShip);
					let coordX = noseCoords.X;
					let coordY = noseCoords.Y;
				
					for(let k = 0; k < squares.length; k++){
						// if()
						// In which square ship nose is
						if(coordY >= squares[k].offsetTop + gameArea.offsetTop && coordY <= squares[k].offsetTop + squares[k].clientHeight + gameArea.offsetTop && coordX >= squares[k].offsetLeft + gameArea.offsetLeft && coordX <= squares[k].offsetLeft + squares[k].clientWidth + gameArea.offsetLeft){							
							
							// Is phantom ship in game area
							if(phantomShip.offsetLeft + phantomShip.clientWidth <= gameArea.clientWidth + gameArea.offsetLeft && phantomShip.offsetLeft >= gameArea.offsetLeft + squares[0].clientWidth + 3 && phantomShip.offsetTop + phantomShip.clientHeight <= gameArea.clientHeight + gameArea.offsetTop && phantomShip.offsetTop >= gameArea.offsetTop + squares[0].clientHeight + 3){	
															
									let image = phantomShip.getAttribute("src")[10];
									// Colorize squares around phantom ship depend on it's rotation
									if(image != "R"){
										if(squares[k + shipLength - 1] != undefined && squares[k + shipLength - 1].style.backgroundColor != realShipColor && squares[k + shipLength - 1].style.backgroundColor != realShipAroundColor){
											if(squares[k].style.backgroundColor != realShipColor && squares[k].style.backgroundColor != realShipAroundColor){
												for(let j = k; j < k + shipLength; j++){														
													colorizeSquare(squares[j], phantomShipColor, realShipAroundColor, realShipColor);
													colorizeSquare(squares[j - 11], phantomShipAroundColor, realShipAroundColor, realShipColor);
													colorizeSquare(squares[j + 11], phantomShipAroundColor, realShipAroundColor, realShipColor);

													if(j == k){
														colorizeSquare(squares[j - 12], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j - 1], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j + 10], phantomShipAroundColor, realShipAroundColor, realShipColor);
													}
													if(j == k + shipLength - 1){
														colorizeSquare(squares[j - 10], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j + 1], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j + 12], phantomShipAroundColor, realShipAroundColor, realShipColor);
													}		
												}
											}
										}	
									}				
									else{
										
										if(squares[k + 11 * shipLength - 22] != undefined && squares[k + 11 * shipLength - 22].style.backgroundColor != realShipColor && squares[k + 11 * shipLength - 22].style.backgroundColor != realShipAroundColor){
											
											if(squares[k - 11].style.backgroundColor != realShipColor && squares[k - 11].style.backgroundColor != realShipAroundColor){
												for(let j = k; j < k + 11 * shipLength; j += 11){
													colorizeSquare(squares[j - 11], phantomShipColor, realShipAroundColor, realShipColor);
													colorizeSquare(squares[j - 10], phantomShipAroundColor, realShipAroundColor, realShipColor);
													colorizeSquare(squares[j - 12], phantomShipAroundColor, realShipAroundColor, realShipColor);

													if(j == k){
														colorizeSquare(squares[j - 23], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j - 21], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j - 22], phantomShipAroundColor, realShipAroundColor, realShipColor);
													}
													if(j >= k + 11* shipLength - 11){
														colorizeSquare(squares[j - 1], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j], phantomShipAroundColor, realShipAroundColor, realShipColor);
														colorizeSquare(squares[j + 1], phantomShipAroundColor, realShipAroundColor, realShipColor);
													}												
												}
											}
										}
									}
								//}
							}
							break;
						}
					}
				}

//////////////////////////////////////////////////////////// Callback function to ROTATE ////////////////////////////////////////////////////////
				function rotatePhantom(e){

					// If right mouse button clicked
					if(e.button == 2){
						let image = phantomShip.getAttribute("src")[10];

						// Change current image to appropriate
						if(image != "R")
							setAttribute(phantomShip, "src", "images/" + shipLength + "x1Rotate.png");
						else
							setAttribute(phantomShip, "src", "images/" + shipLength + "x1.png");

						// Change width and height with each other
						let width = phantomShip.clientWidth;
						let height = phantomShip.clientHeight;

						phantomShip.style.width = height + "px";
						phantomShip.style.height = width + "px";

						phantomShip.style.left = e.clientX - phantomShip.clientWidth / 2 + "px";
						phantomShip.style.top = e.clientY - phantomShip.clientHeight / 2 + "px";
						followMouse(e);
						
					}
				}

//////////////////////////////////////////////////////////////// Callback function to SET ////////////////////////////////////////////////////
				function setShip(e){
					if(e.button == 0){
						if(document.getElementsByClassName("phantomShip").length != 0){
							let isTransparent = true;
							let isAroundOtherShip = false;
							for(let j = 0; j < squares.length; j++){
								if(squares[j].style.backgroundColor == phantomShipColor){
									isTransparent = false;
									break;
								}
							}

							// If ship is setted incorrect (e.g. it isn't situated in the game area)
							if((phantomShip.offsetLeft + phantomShip.clientWidth >= gameArea.clientWidth + gameArea.offsetLeft || phantomShip.offsetLeft - squares[0].clientWidth <= gameArea.offsetLeft || phantomShip.offsetTop + phantomShip.clientHeight >= gameArea.clientHeight + gameArea.offsetTop || phantomShip.offsetTop - squares[0].clientWidth <= gameArea.offsetTop) || isTransparent){		
								
									// Remove ship
									phantomShip.remove();

									// Add counter by 1
									currentShipCount++;
									document.getElementsByClassName("countOf" + (i + 1) + "x1")[0].innerHTML = currentShipCount;

									// Make colorized squares' color transparent
									for(let k = 0; k < squares.length; k++){
										if(squares[k].style.backgroundColor != realShipAroundColor && squares[k].style.backgroundColor != realShipColor)
											squares[k].style.backgroundColor = "transparent";
									}

							}
							// If ship is setted correct
							else{

								// Change ship styles
								phantomShip.style.opacity = "1";
								phantomShip.style.zIndex = "1";

								// Coordinates of the dot that is situated at the nose of the ship
								let noseCoords = noseCoordinates(phantomShip);
								let coordX = noseCoords.X;
								let coordY = noseCoords.Y;

								for(let k = 0; k < squares.length; k++){

									// Determine in which square ship's nose is
									if(coordY >= squares[k].offsetTop + gameArea.offsetTop && coordY <= squares[k].offsetTop + squares[k].clientHeight + gameArea.offsetTop && coordX >= squares[k].offsetLeft + gameArea.offsetLeft && coordX <= squares[k].offsetLeft + squares[k].clientWidth + gameArea.offsetLeft){

										// Set ship's left position
										phantomShip.style.left = squares[k].offsetLeft + gameArea.offsetLeft + 1 + "px";
										
										// Set ships top position
										let image = phantomShip.getAttribute("src")[10];
										if(image != "R"){
											if(shipLength != 1)
												phantomShip.style.top = squares[k].offsetTop + gameArea.offsetTop + "px";
											else
												phantomShip.style.top = squares[k].offsetTop + gameArea.offsetTop - 10 + "px";

											for(let j = k; j < k + shipLength; j++){
												board[parseInt(j / 11) - 1][j % 11 - 1] = shipLength;
											}
										}	
										else{
											if(shipLength != 1)
												phantomShip.style.top = squares[k].offsetTop + gameArea.offsetTop - squares[0].clientHeight + "px";
											else{
												phantomShip.style.top = squares[k].offsetTop + gameArea.offsetTop - squares[0].clientHeight * 1.5 + 4  + "px";
												phantomShip.style.left = squares[k].offsetLeft + gameArea.offsetLeft + 11 + "px";
											}
											for(let j = k; j <= k + 11 * shipLength - 11; j += 11){
												board[parseInt((j - 11) / 11) - 1][(j - 11) % 11 - 1] = shipLength;
											}
										}
										console.log(board)
										// Remember last situated ship for deleting
										lastShip.push(phantomShip);
																	
									}

									// Colorize squares around of the ship
									if(squares[k].style.backgroundColor == phantomShipAroundColor){
										squares[k].style.backgroundColor = realShipAroundColor;
									}
									else if(squares[k].style.backgroundColor == phantomShipColor){
										squares[k].style.backgroundColor = realShipColor;
									}

								}					
							}

							// Clear all event listeners
							document.removeEventListener("mousemove", followMouse);
							document.removeEventListener("mousedown", rotatePhantom);
							document.removeEventListener("mousedown", setShip);
						}
					}
				}
			}
		});
	}
})