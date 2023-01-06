const selectionButtons = document.querySelectorAll('.game-btn');
const finalColumn = document.getElementById('final-column')
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '🫱',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌️',
    beats: 'paper'
  }
]

selectionButtons.forEach(button => {
  button.addEventListener('click', e => {
    const selectionName = e.target.id;
    const selectedObj = SELECTIONS.find(element => element.name === selectionName);
    makeSelection(selectedObj);
  })
});


function makeSelection(selected) {
  const computerSelection = randomSelection();
  const youWin = isWinner(selected, computerSelection);
  const computerWin = isWinner(computerSelection, selected);
  
  addResult(computerSelection, computerWin);
  addResult(selected, youWin);
  if(youWin) countingScore(userScoreSpan);
  if(computerWin) countingScore(computerScoreSpan);
}

function countingScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addResult(selection, winner) {
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('selection');
  if (winner) div.classList.add('winner');
  finalColumn.after(div)
}

function isWinner(yourSelection, opponentSelection) {
  return yourSelection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random()* SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

