// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
if (isAndroid) {
  document.write('<meta name="viewport" content="width=device-width,height=' + window.innerHeight + ', initial-scale=1.0">');
}




//boards
const boardWelcome = document.querySelector('.board.welcome');
const boardUser = document.querySelector('.board.user');
const boardResult = document.querySelector('.board.result');
const boardWin = document.querySelector('.board.win');
const boardDraw = document.querySelector('.board.draw');
const boardLoss = document.querySelector('.board.loss');
const boardEnd = document.querySelector('.board.end')

//scoring
const scoring = {
  games: 0,
  wins: 0,
  draws: 0,
  losses: 0,
}

// ------- ADD USER NAME -------- //
let userName = '';

const addUserBtn = document.querySelector('.btn.welcome-form__btn').addEventListener('click', (e) => {
  let inputUserName = document.querySelector('.welcome-form__input')
  let nameError = document.querySelector('.welcome-form__error');
  e.preventDefault()

  //reset input error
  inputUserName.addEventListener('focus', () => {
    nameError.classList.toggle('active');
  })

  // User name is correct
  if (inputUserName.value.length) {
    userName = inputUserName.value;

    //add user name to all name-headings
    const nameHeadings = [...document.querySelectorAll('[data-option ="user-name"]')];
    nameHeadings.forEach((nameHeading) => {
      nameHeading.textContent = `${userName}`
    });

    //close welcome board 
    boardWelcome.classList.toggle('active');

    //on user board
    setTimeout(function () {
      boardUser.classList.toggle('active');

      //on result board 
      setTimeout(function () {
        boardResult.classList.toggle('active');
      }, 400);
    }, 600);


  }

  // User name is not correct
  else {
    nameError.classList.toggle('active');
  }
})



// ------- CHOICE USER / COMPUTER -------- //

//choice cards 
const choiceCards = {
  user: '',
  computer: '',
}

//choice cards in resault board
const resultCards = {
  user: '',
  computer: '',
}

//user cards
const userCards = [...document.querySelectorAll('.user-card__item')];

//green choiced card frame
const computerChoiceCardFrame = document.querySelector('.result-computer .result-card__pic');
const userChoiceCardFrame = document.querySelector('.result-card__pic');

// bottom cards - '?' symbol 
const userBottomCard = document.querySelector('.result-user .card-empty')
const computerBottomCard = document.querySelector('.result-computer .card-empty')

// FUNCTION - USER CHOICE //
function userChoice() {
  ++scoring.games
  document.querySelectorAll('[data-option="games-score"]').forEach((gamePoint) => gamePoint.textContent = scoring.games) //add number of game to resault
  choiceCards.user = this.dataset.option;
  userBottomCard.classList.toggle('active'); // '?' - animation on
  userChoiceCardFrame.classList.add('active'); //green frame - saturation frame color

  //blocking user cards after choice
  userCards.forEach((userCard) => userCard.classList.toggle('choiced'));

  //display user card on the results board
  setTimeout(function () {
    resultCards.user = document.querySelector(`.result-user [data-option=${choiceCards.user}]`)
    resultCards.user.classList.add('active');
  }, 300);
}

// FUNCTION - COMPUTER CHOICE //
function computerChoice() {
  const cardNumber = Math.floor(Math.random() * userCards.length);
  choiceCards.computer = userCards[cardNumber].dataset.option;

  setTimeout(function () {
    computerBottomCard.classList.toggle('active'); // '?' - animation on
    computerChoiceCardFrame.classList.toggle('active'); //green frame - saturation frame color
  }, 600);

  //display computer card on the results board
  setTimeout(function () {
    resultCards.computer = document.querySelector(`.result-computer [data-option=${choiceCards.computer}]`)
    resultCards.computer.classList.toggle('active');
  }, 1000);

  // check result function
  setTimeout(function () {
    checkResult(choiceCards.user, choiceCards.computer);
  }, 1200);
}


// ------- CHECK RESULT & ADD POINTS -------- //
function checkResult(user, computer) {

  //draw
  if (user === computer) {
    console.log("remis");
    setTimeout(function () {
      userChoiceCardFrame.classList.add('winer');
      computerChoiceCardFrame.classList.add('winer');
      ++scoring.draws;
      document.querySelectorAll('[data-option="draw-score"]').forEach((gamePoint) => gamePoint.textContent = scoring.draws);
      setTimeout(function () {
        boardUser.classList.toggle('active');
        setTimeout(function () {
          boardDraw.classList.toggle('active');
        }, 700);
      }, 600);
    }, 700);

    //user win
  } else if ((user === 'paper' && computer === 'stone') || (user === 'stone' && computer === 'scissors') || (user === 'scissors' && computer === 'paper')) {
    console.log('wygrał USER');
    setTimeout(function () {
      userChoiceCardFrame.classList.add('winer');
      ++scoring.wins
      document.querySelectorAll('[data-option="win-score"]').forEach((gamePoint) => gamePoint.textContent = scoring.wins);
      setTimeout(function () {
        boardUser.classList.toggle('active');
        setTimeout(function () {
          boardWin.classList.toggle('active');
        }, 700);
      }, 600);
    }, 700);

    //computer win
  } else {
    console.log(scoring.games);
    console.log('wygral komputer');
    setTimeout(function () {
      computerChoiceCardFrame.classList.add('winer');
      ++scoring.losses
      document.querySelectorAll('[data-option="loss-score"]').forEach((gamePoint) => gamePoint.textContent = scoring.losses);
      setTimeout(function () {
        boardUser.classList.toggle('active');
        setTimeout(function () {
          boardLoss.classList.toggle('active');
        }, 700);
      }, 600);
    }, 700);
  }
}


// ------- RESET -------- //
const btnsPlayAgain = [...document.querySelectorAll('[data-option="play-agine"]')];

function boardsGameReset() {

  //reset boards
  boardWin.classList.remove('active');
  boardDraw.classList.remove('active');
  boardLoss.classList.remove('active');

  //reset computer
  resultCards.computer.classList.toggle('active');
  computerBottomCard.classList.toggle('active'); // '?' - animation on
  computerChoiceCardFrame.classList.toggle('active'); //green frame - saturation frame color
  computerChoiceCardFrame.classList.remove('winer');

  //reset user
  resultCards.user.classList.toggle('active');
  userBottomCard.classList.toggle('active'); // '?' - animation on
  userChoiceCardFrame.classList.toggle('active'); //green frame - saturation frame color
  userChoiceCardFrame.classList.remove('winer');

  //unblocking user cards after choice
  userCards.forEach((userCard) => userCard.classList.toggle('choiced'));

  setTimeout(function () {
    boardUser.classList.toggle('active');
  }, 200);
}


// ------- END GAME -------- //
const btnsEndGame = [...document.querySelectorAll('[data-option="end-game"]')];
const endHeading = document.querySelector('.end .board__heading');
const endSubheading = document.querySelector('.end .board__subheading');

function endGame() {

  //reset boards
  boardWin.classList.remove('active');
  boardDraw.classList.remove('active');
  boardLoss.classList.remove('active');
  boardResult.classList.remove('active');

  //add active to end board and display result
  setTimeout(function () {
    boardEnd.classList.add('active');


    //comment - win / draw / lost
    if (scoring.wins > scoring.losses) {
      endHeading.textContent = 'You Win :)'
      endSubheading.textContent = 'You are master!'
    } else if (scoring.wins === scoring.losses) {
      endHeading.textContent = 'Draw :/'
      endSubheading.textContent = 'It was so close..'
    } else {
      endHeading.textContent = 'You lost :('
      endSubheading.textContent = 'Next time will be better..'
    }
  }, 400);

  //press quit - refresh page
  document.querySelector('[data-option ="quit"]').addEventListener('click', () => {
    window.location.reload();
  });

}

userCards.forEach((userCard) => userCard.addEventListener('click', userChoice));
userCards.forEach((userCard) => userCard.addEventListener('click', computerChoice));
btnsPlayAgain.forEach((btnPlayAgain) => btnPlayAgain.addEventListener('click', boardsGameReset));
btnsEndGame.forEach((btnEndGame) => btnEndGame.addEventListener('click', endGame));