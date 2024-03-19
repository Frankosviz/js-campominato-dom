// Inizio creando una funzione che assocerò al change del form

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
}




