const namePlayer1 = document.getElementById('player1');
namePlayer1.addEventListener("input", () => {
  const players = document.querySelector(".player1");
  players.innerText = namePlayer1.value.length === 0 ? "Player 1" : namePlayer1.value;
});

const namePlayer2 = document.getElementById("player2");
namePlayer2.addEventListener("input", () => {
  const players2 = document.querySelector(".player2");
  players2.innerText =
    namePlayer2.value.length === 0 ? "Player 2" : namePlayer2.value;
});

const boardRegions = document.querySelectorAll('#gameBoard td')
let vBoard = []
let turnPlayer = ''


function updateTitle() {
  if (turnPlayer == 'player1'){
    document.getElementById("p1").style.color = "white";
    document.getElementById("p2").style.color = "black";
    document.getElementById("p2").style.background = "white";
    document.getElementById("p1").style.background = "#84a5e4";

  } else {
    document.getElementById("p1").style.color = "black";
    document.getElementById("p2").style.color = "white";
    document.getElementById("p1").style.background = "white";
    document.getElementById("p2").style.background = "#84a5e4";
  }
}

function initializeGame() {
  // Inicializa as variáveis globais 
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1'
  // Ajusta o título da página (caso seja necessário)
  document.querySelector(".game h2").innerHTML =
    '<span id="turnPlayer"></span>';
  updateTitle()
  // Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
  })
}
// Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
  const winRegions = []
  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}
// Desabilita uma região do tabuleiro para que não seja mais clicável
function disableRegion(element) {
  element.classList.remove('cursor-pointer')
  element.removeEventListener('click', handleBoardClick)
}
// Pinta as regiões onde o jogador venceu e mostra seu nome na tela
function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('.game h2').innerHTML = playerName + ' venceu!'
}

function handleBoardClick(ev) {
  // Obtém os índices da região clicada
  const td = ev.currentTarget
  const region = td.dataset.region // N.N
  const rowColumnPair = region.split('.') // ["N", "N"]
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  // Marca a região clicada com o símbolo do jogador
  if (turnPlayer === 'player1') {
    td.innerText = 'X'
    vBoard[row][column] = 'X'
  } else {
    td.innerText = 'O'
    vBoard[row][column] = 'O'
  }
  // Limpa o console e exibe nosso tabuleiro virtual
  console.clear()
  console.table(vBoard)
  // Desabilita a região clicada
  disableRegion(td)

  function disableAllRegions() {
    boardRegions.forEach(function (region) {
      console.log(region);
      region.classList.remove("cursor-pointer");
      region.removeEventListener("click", handleBoardClick);
    });
  }
  
  // Verifica se alguém venceu
  const winRegions = getWinRegions()
  if (winRegions.length > 0) {
    handleWin(winRegions)
    disableAllRegions();
  } else if (vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    document.querySelector(".game h2").innerHTML = "Empate!";
  }
}
// Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)