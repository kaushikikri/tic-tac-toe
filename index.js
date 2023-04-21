document.addEventListener('DOMContentLoaded', () => {
    let score = document.getElementById('winner');
    let btn = document.querySelector('.btn');
    let x_score = document.getElementById('X');
    let o_score = document.getElementById('O');
    let grid = Array.from(document.querySelectorAll('.boxes'));  //converting grid's div to array

    let count = 0;      //to make game over when nobody wins

    const O_txt = "O";
    const X_txt = "X";

    let X = 0; //x scores
    let O = 0; //o scores

    let current = X_txt; //current player

    let spaces = Array(9).fill(null); // to make clicked box disable

    //all wining grids position
    const winTarget = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    btn.addEventListener('click', reset);

    function reset() {     //to reset whole thing
        X = 0;
        O = 0;
        x_score.innerHTML = 0;
        o_score.innerHTML = 0;
        restart();
    }

    function restart() {     //to restart the game when over or won
        count = 0;
        current = X_txt;
        spaces.fill(null);
        grid.forEach((e) => {
            e.innerHTML = " ";
        })
        score.innerHTML = "Tic tac toe";
    }


    //check either won or not
    function playerWon() {
        for (const i of winTarget) {
            let [a, b, c] = i;
            if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
                return [a, b, c];
            }
        }
        return false;
    }


    //check for clicked boxes
    function clickedBox(e) {
        const id = e.target.id;

        if (!spaces[id]) {   //check if already not clicked
            e.target.innerHTML = current;
            spaces[id] = current;

            if (playerWon() != false) {  //go to chek if clicked boxes won
                if (current == X_txt) {
                    X++
                    x_score.innerHTML = X;
                }
                else {
                    O++;
                    o_score.innerHTML = O;
                }
                score.innerHTML = `'${current}' has won`;
                let blocks = playerWon();
                blocks.forEach((e) => {
                    grid[e].classList.add('win-box');

                    //to reset everything
                    setTimeout(() => {
                        blocks.forEach((e) => {
                            grid[e].classList.remove('win-box');
                        })
                        restart();
                    }, 2000);
                })
                return;
            }

            count++;
            if (count == 9) {   //check for game over condition
                score.innerHTML = "Game over !!!";
                setTimeout(() => {
                    restart();
                }, 4000);
                return;
            }

            current = (current === X_txt) ? O_txt : X_txt;  //toggle current players
        }
    }


    //to start the game
    function start() {
        grid.forEach((box) => {
            box.addEventListener('click', clickedBox);
        })
    }

    start();

})