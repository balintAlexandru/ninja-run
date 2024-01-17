const gameVariable = {
  ninja: document.querySelector(".ninja"),
  zombie: document.querySelector(".zombie"),
  triggerJump: false,
  zombieTouch: false,
  shurikenCount: 0,
  allowJump: true,
  hearts: 3,
  hitDamage: 20,
  currentZombieHealth: 100,
  ground: [
    {
      ground: "ground1",
      position: "0px",
      loopPosition: 900,
    },
    {
      ground: "ground2",
      position: "900px",
      loopPosition: 1800,
    },
  ],
};

gameVariable.zombie.style.right = "-150px";
gameVariable.ninja.style.bottom = "130px";
gameVariable.ninja.style.right = "670px";

export default gameVariable;
