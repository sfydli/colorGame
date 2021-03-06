var numOfSquares = 6;
var colors = [];
var pickedColor;
var correctAnswer = "./sounds/correctAnswer.mp3";
var wrongAnswer = "./sounds/wrongAnswer.mp3";
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.toggle("selected");
			modeButtons[1].classList.toggle("selected");
			this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add click listener to squares
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				this.style.backgroundColor = "#232323";
				new Audio(correctAnswer).play();
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				new Audio(wrongAnswer).play();
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	resetButton.textContent = "New Colors";
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var result = [];
	for (var i = 0; i < num; i++) {
		result.push(randomColor());
	}
	return result;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}