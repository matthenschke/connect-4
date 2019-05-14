let player1 = prompt('Player One: Enter Your Name, you will be blue');
let player1Color = 'rgb(86, 151, 255)';

let player2 = prompt('Player Two: Enter Your Name, you will be red');
let player2Color = 'rgb(237, 45, 73)';


let game_on = true;
let table = $('table tr');


function reportWin(rowNum, colNum){
    console.log('You won starting at this row, col');
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function getColor(rowIndex, colIndex){
    console.log(table.eq(rowIndex).find('td').eq(colIndex).find('button'));
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    let lastRowIndex = table.length - 1;
    for (let i = lastRowIndex; i > -1; i--){
        let color = getColor(i, colIndex);
        if (color === 'rgb(128, 128, 128)'){
            return i;
        }
    }
}

function colorMatchCheck(one,two,three,four){
    return one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined;
}

// win check functions

function horizontalWinCheck(){
    for (let row = 0; row < table.length; row++){
        for (let col = 0; col < 4; col++){
            if (colorMatchCheck(getColor(row,col), getColor(row,col+1), getColor(row,col + 2), getColor(row, col + 3))){
                console.log('horiz');
                reportWin(row,col);
                return true;
            }
        }
    }
}

function verticalWinCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(getColor(row, col), getColor(row + 1, col), getColor(row + 2, col), getColor(row + 3, col))){
                console.log('vertcal');
                reportWin(row,col);
                return true;
            }
        }
    }
}

function diagonalWinCheck(){
    for (let row = 0; row < 6; row++){
        for (let col = 0; col < 7; col++){
            if (colorMatchCheck(getColor(row, col), getColor(row + 1,col +1), getColor(row + 2,col + 2), getColor(row + 3, col + 3))){
                console.log('vertcal');
                reportWin(row,col);
                return true;
            }

            else if (colorMatchCheck(getColor(row, col), getColor(row - 1,col +1), getColor(row - 2,col + 2), getColor(row - 3, col + 3))){
                console.log('vertcal');
                reportWin(row,col);
                return true;
            }
        }
    }
}

// game logic

// start with player1

let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$('h3').text(`${currentName}: It is your turn, pick a column to drop in`);

$('.board button').on('click', function(){
    let col = $(this).closest('td').index();
    let rowAvailable = checkBottom(col);
    changeColor(rowAvailable, col, currentColor);
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName + " Wins!!. Refresh the browser if you want to play again");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        $('table').css('margin-top', '5%');
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1){
        currentName = player1;
        $('h3').text(currentName + " it is your turn. ");
        currentColor = player1Color;
    }
    else{
        currentName = player2;
        $('h3').text(currentName + "it is your turn");
        currentColor = player2Color;
    }
});

