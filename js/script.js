
    // Variabili in global scope

    const levelEl = document.getElementById("level");

    levelEl.addEventListener("change", play);
    let score = 0;
    const NUM_BOMBS = 16;
    let gameOver = false;


  function play() {
  const playgroundEl = document.getElementById('playground');
  playgroundEl.innerHTML = '';
  const messageEl = document.getElementById('result');
  messageEl.innerHTML = '';
  score = 0;
  gameOver = false;

  let cellsPerRow;
  let cellsNumber = setLevel();
  //eventuale controllo

  let bombList = generateBombs(cellsNumber);
  
  console.log(bombList);
  cellsPerRow  = Math.sqrt(cellsNumber);

  const max_attempt = cellsNumber - NUM_BOMBS;
  
  for(let i = 1; i <= cellsNumber; i++){
    const square = drawSquare(cellsPerRow, i, bombList, max_attempt);
    playgroundEl.appendChild(square);
  }

}

// Creo una funzione che assocerò al change del form

function setLevel(){
    const level = levelEl.value;    
    let cellsNumber;
    switch (level) {
        case "easy":
        // default:
          cellsNumber = 100;
          break;
        case "medium":
            cellsNumber = 81;
            break;
        case "crazy":
            cellsNumber = 49;
            break;
      }
      return cellsNumber;
}



/**
 * drawSquare
 * funzione che crea elemento html div (square) e lo ritorna
 * 
 * necessita di una classe per il qudrato di nome 'box'
 * @param {*} dim 
 * @param {*} content 
 * @returns 
 */

// Creo la funzione con cui 'disegnerò i quadrati'

function drawSquare(dim, content, bombs, maxscore){
    const newSquare = document.createElement('div');
    newSquare.classList.add('box');
    newSquare.style.setProperty('--ms-box-dim', `calc(500px / ${dim} )`);
    newSquare.innerHTML = `
    <span class="invisible">${content}</span>
    `;
    newSquare.addEventListener('click', function(){
        if(gameOver) return;
        if(bombs.includes(content)){
          newSquare.classList.add('unsafe'); 
          newSquare.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
          endGame(true, maxscore, bombs);
        } else {
          newSquare.classList.add('safe');
          endGame(false, maxscore, bombs);         
        } 
      
    },{ once: true });
    return newSquare;
}

  function generateBombs(numCells){
    let bomsArray = [];
    let counter = 0;
    while(bomsArray.length < NUM_BOMBS && counter < 100){
      let bomb = getRndInteger(1, numCells);
      if(!bomsArray.includes(bomb)) {
        bomsArray.push(bomb);
      }
      counter++;
    }  
    return bomsArray;
  }

  function endGame(end, maxscore,bombs){
    const messageEl = document.getElementById('result');
    let message = '';
    if(end) {
      gameOver = true;
      message += 'Hai perso ritenta !!!!';
    } else {
      score++;
      if (score === maxscore){
        message += 'Hai vinto !!!!';
        gameOver = true;
      }
    }
    if(gameOver){
      const boxes = document.querySelectorAll('.box');
      for(let i = 0; i < boxes.length; i++){
        if(bombs.includes(i + 1)){
          boxes[i].classList.add('unsafe'); 
          boxes[i].innerHTML = `<i class="fa-solid fa-bomb"></i>`;
        }
      }
    }
    message += `<h4>Il tuo punteggio è: ${score}</h4>`;
    messageEl.innerHTML = message;
  }





