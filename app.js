import {
  runAnimation,
  jumpAnimation,
  ninjaJump,
  shurikenLoadingAnimation,
} from "./controller/animations.js";
import gameVariable from "./constants/constants.js";
import { groundMove, zombieWalk } from "./controller/move.js";
import {
  createHearts,
  createShuriken,
  createHealthBar,
} from "./controller/createGameElements.js";

const { ninja, zombie } = gameVariable;
let gate = true;

window.addEventListener("keypress", (event) => {
  if (event.key === "e" && gameVariable.shurikenCount && gate) {
    if (gameVariable.shurikenCount === 10) {
      shurikenLoadingAnimation();
    }
    gameVariable.shurikenCount--;
    document.querySelector(".shuriken-counter").innerHTML =
      gameVariable.shurikenCount;
    gate = false;
    if (gameVariable.shurikenCount > -1) {
      createShuriken();
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "e") {
    gate = true;
  }
});

window.addEventListener("keypress", (event) => {
  if (event.key === " " && gameVariable.allowJump) {
    gameVariable.allowJump = false;
    gameVariable.triggerJump = true;
    ninjaJump(ninja);
    setTimeout(() => {
      jumpAnimation(ninja);
    }, 100);
  }
});

groundMove();
runAnimation("ninja/run/Run__00", 0, ninja, "ninja");
runAnimation("zombie/walk/Walk", 1, zombie, "zombie");
zombieWalk(zombie);
createHearts();
shurikenLoadingAnimation();
createHealthBar(zombie);
