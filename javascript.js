const Gameboard = (() => {
  let gameboardArray = [
    '', '', '', 
    '', '', '', 
    '', '', ''
  ];
  let Player1 = {};
  let Player2 = {};
  let currentPlayer = {};
  const toggleCurrentPlayer = () => {
    if (currentPlayer === Player1) {
      currentPlayer === Player2;
    } else {
      currentPlayer === Player1;
    }
  };
  const checkWinner = () => {
    // finish
  }

  const reset = () => {
    gameboardArray = ['', '', '', '', '', '', '', '', ''];
  }
  const setPlayer1 = (Player1Reference) => {
    Player1 = Player1Reference;
  }
  const getPlayer1 = () => {
    return Player1;
  }
  const setPlayer2 = (Player2Reference) => {
    Player2 = Player2Reference;
  }
  const getPlayer2 = () => {
    return Player2;
  }
  const getGameboardArray = () => {
    return gameboardArray;
  }
  const placeMarker = (locationIndex) => {
    // finish
  }
  const startGame = (Player1Reference, Player2Reference) => {
    Player1 = Player1Reference;
    Player2 = Player2Reference;
    currentPlayer = Player1;
    //DisplayController.drawGameBoard
  }
  const endGame = (PlayerWinner) => {
    // DisplayController.showWinner(PlayerWinner)
  }

  return {
    reset,
    setPlayer1,
    getPlayer1,
    setPlayer2,
    getPlayer2,
    getGameboardArray,
    placeMarker,
    startGame,
    endGame,
  };
})();

const Player = (name, marker) => {
  // let name = name;
  // let marker = marker;

  const setName = (nameStr) => {
    name = nameStr;
  };
  const getName = () => {
    return name;
  };
  const setMarker = (markerStr) => {
    marker = markerStr;
  };
  const getMarker = () => {
    return marker;
  };
  return {
    setName,
    getName,
    setMarker,
    getMarker,
  };
};

//TEMP
const p1 = Player('me', 'X');
const p2 = Player('you', 'O');
Gameboard.startGame(p1, p2);

// console.log(Gameboard.getPlayer1().getName());
// Gameboard.getPlayer1().setName('ben');
// console.log(p1.getName());

const DisplayController = (() => {
  const gameboardElem = document.querySelector('.gameboard');
  let player1NameDisplay = document.querySelector('.player1-name-display');
  let player1NameInput = document.querySelector('.player1-name-input');
  let player2NameDisplay = document.querySelector('.player2-name-display');
  let player2NameInput = document.querySelector('.player2-name-input');

  const updatePlayer1Name = () => {
    let newName = player1NameInput.value;
    Gameboard.getPlayer1().setName(newName);
    player1NameDisplay.textContent = newName;
  }

  //CONTINUE

  return {
    gameboardElem,
    player1NameDisplay,
    player1NameInput,
    player2NameDisplay,
    player2NameInput,
    updatePlayer1Name,
  };
})();

console.log(DisplayController.player2NameDisplay.textContent);

const Game = (() => {
  const startGame = () => {
    const Player1 = Player(DisplayController.getPlayer1Name(), 'X');
    const Player2 = Player(DisplayController.getPlayer2Name(), 'O');
    Gameboard.startGame(Player1, Player2);
  };

  return {
    startGame,
  }
})();