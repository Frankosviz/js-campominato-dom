    // Variabili in global scope

    const levelEl = document.getElementById("level");
    levelEl.addEventListener("change", play);
    let score = 0;
    const NUM_BOMBS = 16;
    let gameOver = false;


function play() {
    // Creo variabile playground e associo a html
    const playgroundEl = document.getElementById('playground');
    // Gli scrivo dentro testo vuoto...
    playgroundEl.innerHTML = '';
    // Creo variabile per messaggio del risultato
    const messageEl = document.getElementById('result');
    // Gli do content vuoto...
    messageEl.innerHTML = '';
    // Utilizzo le variabili flag create in precedenza
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
    // La variabile serve a determinare il valore di levelEl e associarlo al livello di difficoltà che sceglierà l\utente
    switch (level) {
        // usiamo lo switch
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
      return cellsNumber;{}
}
console.log(setLevel);

// Creo la funzione con cui 'disegnerò i quadrati'

function drawSquare(div, content, bombs, maxscore){
    // Creo newSquare grazie alla quale aggiungerò i quadrati
    const newSquare = document.getElementById('div');
    // Prendendo il div...
    newSquare.classList.add('box');
    // Assegnandogli classe box creata nel css...
    newSquare.style.setProperty('--ms-box-dim', `calc(500px / ${dim} )`);
    // La dimensione gia data in CSS...
    newSquare.innerHTML = `<span class="invisible"> ${content} </span>`;
    // Ed il contenuto inizialmente invisibile.
    return newSquare;
    newSquare.addEventListener('click', function(){
      if(gameOver) return;
    })
    }





