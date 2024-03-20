
    // Variabili in global scope

    const levelEl = document.getElementById("level");

    levelEl.addEventListener("change", play);
    let score = 0;
    const NUM_BOMBS = 16;
    let gameOver = false;

// Creo la variabile principale di gioco

  function play() {
    // Prendo il campo da gioco e gli scrivo content vuoto
  const playgroundEl = document.getElementById('playground');
  playgroundEl.innerHTML = '';
  // Prendo il div risultato e gli scrivo content vuoto per ora
  const messageEl = document.getElementById('result');
  messageEl.innerHTML = '';

  // Inserisco le mie variabili risultato e flag
  score = 0;
  gameOver = false;

  // Do le variabili interne allo scope function play
  let cellsPerRow;
  let cellsNumber = setLevel();
  //eventuale controllo

  // vado di variabili per generare le bombe

  let bombList = generateBombs(cellsNumber);
  
  console.log(bombList);
  // Con il console log mi stamperà il numero randomico di bombe in console ogni volta
  cellsPerRow  = Math.sqrt(cellsNumber);

  const max_attempt = cellsNumber - NUM_BOMBS;
  
  // con il ciclo for vado a creare le celle dove andranno disegnati i quadrati contenenti bombe e numeri
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
// Assegno come argomento alla funzione i parametri che ho ricavato sopra
function drawSquare(dim, content, bombs, maxscore){
  // Vado a selezionare il quadrato che mi sevirà per l'aggiunta della classe box
    const newSquare = document.createElement('div');
    newSquare.classList.add('box');
    newSquare.style.setProperty('--ms-box-dim', `calc(500px / ${dim} )`);
    newSquare.innerHTML = `
    <span class="invisible">${content}</span>
    `;
  // Creo l'evento click che farà scaturire la funzione game-over
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
// Funzione che genera le mie 16 bombe randomiche

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

  // Funzione che determina la fine del gioco
  // Se clicco sulla bomba avrò perso, se clicco su tutte le caselle 'libere' avrò vinto
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





