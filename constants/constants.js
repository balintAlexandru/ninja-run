const gameVariable = {
  ninja: document.querySelector(".ninja"),
  zombie: document.querySelector(".zombie"),
  gameOverScreen: document.querySelector(".game-over-screen"),
  gameWinText: "Finally I'm home !",
  triggerJump: false,
  zombieTouch: false,
  shurikenCount: 0,
  zombieCount: 0,
  allowJump: true,
  hearts: 3,
  hitDamage: 10,
  currentZombieHealth: 100,
  gameOn: true,
  zombieKillTarget: 10,
  groundMoveCondition: true,
};

gameVariable.zombie.style.right = "-150px";

gameVariable.ninja.style.bottom = "130px";
gameVariable.ninja.style.right = "670px";

export default gameVariable;
