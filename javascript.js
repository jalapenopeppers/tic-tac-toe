const Gameboard = (() => {
  let gameboardArray = [
    '', '', '', 
    '', '', '', 
    '', '', ''
  ];
  const checkWinner = () => {
    if (
      //Check rows for a winner
      (gameboardArray[0] === gameboardArray[1]) && (gameboardArray[1] === gameboardArray[2]) && (gameboardArray[2] !== '') ||
      (gameboardArray[3] === gameboardArray[4]) && (gameboardArray[4] === gameboardArray[5]) && (gameboardArray[5] !== '') ||
      (gameboardArray[6] === gameboardArray[7]) && (gameboardArray[7] === gameboardArray[8]) && (gameboardArray[8] !== '') ||
      //Check columns for a winner
      (gameboardArray[0] === gameboardArray[3]) && (gameboardArray[3] === gameboardArray[6]) && (gameboardArray[6] !== '') ||
      (gameboardArray[1] === gameboardArray[4]) && (gameboardArray[4] === gameboardArray[7]) && (gameboardArray[7] !== '') ||
      (gameboardArray[2] === gameboardArray[5]) && (gameboardArray[5] === gameboardArray[8]) && (gameboardArray[8] !== '') ||
      //Check diagonals for a winner
      (gameboardArray[0] === gameboardArray[4]) && (gameboardArray[4] === gameboardArray[8]) && (gameboardArray[8] !== '') ||
      (gameboardArray[2] === gameboardArray[4]) && (gameboardArray[4] === gameboardArray[6]) && (gameboardArray[6] !== '')
    ) {
      return 'winner';
    } else {
      // Loop through all cells. If there are no empty cells on the last iteration, its a tie.
      let emptyCellsCount = 0;
      for (let i = 0; i < 9; i++) {
        if (gameboardArray[i] === '') {
          emptyCellsCount++;
        } else if (emptyCellsCount === 0 && i === 8) {
          return 'tie';
        }
      }
    }
    return '';
  }

  const reset = () => {
    gameboardArray = ['', '', '', '', '', '', '', '', ''];
    DisplayController.drawGameBoard();
  }
  const getGameboardArray = () => {
    return gameboardArray;
  }
  const placeMarker = (locationIndex) => {
    if (gameboardArray[locationIndex] === '') {
      gameboardArray[locationIndex] = Game.getCurrentPlayer().getMarker();
      DisplayController.drawGameBoard();
      let possibleWinner = checkWinner();
      console.log(possibleWinner);
      if (possibleWinner !== '') {
        Game.endGame(possibleWinner);
      } else {
        console.log('toggle player');
        Game.toggleCurrentPlayer();
      }
    }
    // potentially display 'pick another slot' message
  }

  return {
    reset,
    getGameboardArray,
    placeMarker,
  };
})();

const Player = (name, marker) => {
  let score = 0;

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
  const setScore = (newScore) => {
    score = newScore;
  };
  const getScore = () => {
    return score;
  };

  return {
    setName,
    getName,
    setMarker,
    getMarker,
    setScore,
    getScore,
  };
};

// console.log(Gameboard.getPlayer1().getName());
// Gameboard.getPlayer1().setName('ben');
// console.log(p1.getName());

const DisplayController = (() => {
  const gameboardElem = document.querySelector('.gameboard');
  let player1NameDisplay = document.querySelector('.player1-name-display');
  let player1NameInput = document.querySelector('.player1-name-input');
  let player2NameDisplay = document.querySelector('.player2-name-display');
  let player2NameInput = document.querySelector('.player2-name-input');

  const getPlayer1Name = () => {
    return player1NameInput.value;
  }
  const getPlayer2Name = () => {
    return player2NameInput.value;
  }
  const updatePlayer1Name = () => {
    let newName = player1NameInput.value;
    Game.getPlayer1().setName(newName);
    player1NameDisplay.textContent = newName;
  }
  const updatePlayer2Name = () => {
    let newName = player2NameInput.value;
    Game.getPlayer2().setName(newName);
    player2NameDisplay.textContent = newName;
  }
  const attachEventListeners = () => {
    // Attach listeners to grid cells
    let cells = document.querySelectorAll('.gameboard>.cell');
    for (let cell of cells) {
      cell.addEventListener('click', (e) => {
        Gameboard.placeMarker(Number(e.target.getAttribute('location-index')));
      });
    }
  }
  const drawGameBoard = () => {
    let gameboardArray = Gameboard.getGameboardArray();
    let cells = document.querySelectorAll('.gameboard>.cell');
    console.log(Gameboard.getGameboardArray());
    for (let i = 0; i < 9; i++) {
      cells[i].textContent = gameboardArray[i];
    }
  }
  const showWinner = (possibleWinner) => {
    //Update scores:
    let p1Score = document.querySelector('.player1-score');
    p1Score.textContent = Game.getPlayer1().getScore();
    let p2Score = document.querySelector('.player2-score');
    p2Score.textContent = Game.getPlayer2().getScore();

    let winnerDisplayText = document.querySelector('.winner-display-text');
    let winnerDisplay = document.querySelector('.winner-display-container');
    winnerDisplay.style.visibility = 'visible';
    if (possibleWinner === 'winner') {
      if (Game.getLastWinner().getName() === '') {
        winnerDisplayText.textContent = Game.getLastWinner().getMarker() + ' has won!';
      } else {
        winnerDisplayText.textContent = Game.getLastWinner().getName() + ' has won!';
      }
    } else {
      winnerDisplayText.textContent = `It's a tie!`;
    }
  }

  return {
    getPlayer1Name,
    getPlayer2Name,
    updatePlayer1Name,
    updatePlayer2Name,
    attachEventListeners,
    drawGameBoard,
    showWinner,
  };
})();

// console.log(DisplayController.player2NameDisplay.textContent);

const Game = (() => {
  let Player1 = {};
  let Player2 = {};
  let currentPlayer = {};
  let lastWinner = {};
  let gameOver = false; // Used to add to score only once

  const toggleCurrentPlayer = () => {
    if (currentPlayer === Player1) {
      currentPlayer = Player2;
    } else {
      currentPlayer = Player1;
    }
    console.log('Current Player: ' + currentPlayer.getName());
  };
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
  const getCurrentPlayer = () => {
    return currentPlayer;
  }
  const getLastWinner = () => {
    return lastWinner;
  }
  const startGame = () => {
    DisplayController.attachEventListeners();
    Player1 = Player(DisplayController.getPlayer1Name(), 'X');
    Player2 = Player(DisplayController.getPlayer2Name(), 'O');
    currentPlayer = Player1;
    lastWinner = {};
    gameOver = true;
    Gameboard.reset();
  };
  const restartGame = () => {
    // Player1 = Player(DisplayController.getPlayer1Name(), 'X');
    // Player2 = Player(DisplayController.getPlayer2Name(), 'O');
    // currentPlayer = lastWinner;
    console.log(`Current player after restart: ${currentPlayer.getName()}`);
    Gameboard.reset();

    let winnerDisplay = document.querySelector('.winner-display-container');
    winnerDisplay.style.visibility = 'hidden';
    gameOver = true;
  }
  const endGame = (possibleWinner) => {
    if (gameOver === true) {
      currentPlayer.setScore(currentPlayer.getScore() + 1);
      gameOver = false;
    }
    lastWinner = currentPlayer;
    DisplayController.showWinner(possibleWinner)
  }

  return {
    toggleCurrentPlayer,
    setPlayer1,
    getPlayer1,
    setPlayer2,
    getPlayer2,
    getCurrentPlayer,
    getLastWinner,
    startGame,
    restartGame,
    endGame,
  }
})();

//TEMP
Game.startGame();