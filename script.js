// 요소 선택
const startButton = document.getElementById('start-button');
const introScreen = document.querySelector('.intro');
const gameScreen = document.querySelector('.gameBoard');
const computerHandList = document.querySelectorAll('.autoPick li');
const playerButtons = document.querySelectorAll('.selectPick .btn');

// 상태 변수
let attacker = null;
let isGameOver = false;
let animationInterval = null;
let currentHandIndex = 0;
let computerFinalChoice = 0;

// 게임 시작
startButton.addEventListener('click', () => {
  introScreen.classList.add('none');
  gameScreen.classList.remove('none');
  startComputerHandAnimation();
});

// 사용자 선택 처리
playerButtons.forEach((button, userChoice) => {
  button.addEventListener('click', () => {
    if (isGameOver) return;

    stopComputerHandAnimation();
    showComputerHand(computerFinalChoice);

    const computerChoice = computerFinalChoice;
    const result = determineWinner(userChoice, computerChoice);

    if (result === 'draw') {
      alert('비겼어요! 다시!');
      resetGame();
      return;
    }

    attacker = result;
    alert(`${attacker === 'user' ? '당신' : '컴퓨터'}이 승리했습니다!`);
    resetGame();
  });
});

// 컴퓨터 손 애니메이션 시작
function startComputerHandAnimation() {
  currentHandIndex = 0;
  animationInterval = setInterval(() => {
    showComputerHand(currentHandIndex);
    computerFinalChoice = currentHandIndex;
    currentHandIndex = (currentHandIndex + 1) % computerHandList.length;
  }, 100);
}

// 컴퓨터 손 애니메이션 멈춤
function stopComputerHandAnimation() {
  clearInterval(animationInterval);
}

// 컴퓨터 손 모양 표시
function showComputerHand(index) {
  computerHandList.forEach((el, i) => {
    el.classList.toggle('on', i === index);
  });
}

// 승자 판단
function determineWinner(user, computer) {
  if (user === computer) return 'draw';
  const winRules = [
    [0, 1], // 묵 > 찌
    [1, 2], // 찌 > 빠
    [2, 0]  // 빠 > 묵
  ];
  return winRules.some(([u, c]) => u === user && c === computer)
    ? 'user'
    : 'computer';
}

// 게임 리셋
function resetGame() {
  attacker = null;
  isGameOver = false;
  showComputerHand(0); // 초기화 시 '묵'
  startComputerHandAnimation();
}
