let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.getElementById('reset');
let modeButtons = document.querySelectorAll('.mode');
let header = document.getElementById('header');
let audioMiss = new Audio('./Assets/click.wav');
let audioWin = new Audio('./Assets/trumpets-fanfar-2.mp3');
let textIntro = document.getElementById('textIntro');


init();

function init() {
    setupModeMuttons();
    setupSquares();
    reset();
}

function onWin(){
    audioWin.play()
    squares.forEach((elem) => {
        elem.removeEventListener('click', onColorClick);
    })
};


function onColorClick () {
    // grab color of clicked square
    let clickedColor = this.style.backgroundColor;
    //compare color to pickedcolor
    if (clickedColor === pickedColor) {
        messageDisplay.textContent = "🏅 You made it!! 🏅";
        resetButton.textContent = "Play Again?"
        changeColor(clickedColor);
        header.style.backgroundColor = clickedColor;
        h1.classList.toggle('header-win-white');
        textIntro.classList.toggle('text-win-white');
        onWin();
        
    } else {
        this.style.backgroundColor = "white";
        messageDisplay.textContent = " Try again! 🤔";
        audioMiss.play()
    }

}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        //add click listener to squares
        squares[i].addEventListener("click", onColorClick);
    }
};


function setupModeMuttons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    //pick new random color from array
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    header.style.backgroundColor = 'white';
    resetButton.textContent = "Give me new Colors";
    messageDisplay.textContent = "";
    h1.classList.remove("header-win-white");
    textIntro.classList.remove('text-win-white');
    setupSquares()
}



resetButton.addEventListener('click', function () {
    reset();
});


function changeColor(color) {
    //loop tru all squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    //change each color to match given color
};

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];

}

function generateRandomColors(num) {
    //make an array
    let arr = [];
    //add num random color to array
    for (let i = 0; i < num; i++) {
        arr.push(randomColor())
        //get random color and push into arr
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a red from 0 - 255
    let r = Math.floor(Math.random() * 256);
    //pick a green fron 0 - 255
    let g = Math.floor(Math.random() * 256);
    //pick a blue from 0 - 255
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


