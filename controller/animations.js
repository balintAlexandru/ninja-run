import gameVariable from "../constants/constants.js";
import { createHealthBar, createZombie } from "./createGameElements.js";
import { zombieWalk } from "./move.js";
const { ninja } = gameVariable;
const shurikenOverlay = document.querySelector(".shuriken-overlay");
shurikenOverlay.style.height = "0%";

const jumpAnimation = (image) => {
  for (let a = 0; a < 10; a++) {
    if (a < 5) {
      setTimeout(() => {
        image.src = `./images/ninja/jump/Jump__00${a}.png`;
      }, a * 45);
    }
  }
};

const runAnimation = (pathway, start, image, character) => {
  if (
    (!gameVariable.triggerJump && character === "ninja") ||
    character === "zombie"
  ) {
    for (let i = start; i < 10 + start; i++) {
      setTimeout(() => {
        if (
          (!gameVariable.triggerJump && character === "ninja") ||
          character === "zombie"
        ) {
          image.src = `./images/${pathway}${i}.png`;
        }
      }, i * 52);
    }
    setTimeout(() => {
      runAnimation(pathway, start, image, character);
    }, 520);
  }
};

const ninjaJump = (image) => {
  for (let a = 0; a < 120; a++) {
    setTimeout(() => {
      image.style.bottom = parseInt(image.style.bottom) + 2 + "px";
    }, a * 2);
  }
  setTimeout(() => {
    for (let a = 0; a < 120; a++) {
      setTimeout(() => {
        image.style.bottom = parseInt(image.style.bottom) - 2 + "px";
        if (image.style.bottom === "130px") {
          gameVariable.triggerJump = false;
          runAnimation("ninja/run/Run__00", 0, ninja, "ninja");
          gameVariable.allowJump = true;
        }
      }, a * 2);
    }
  }, 500);
};

const shurikenSpin = (shuriken) => {
  let deg = 0;
  const shurikenSpinInterval = setInterval(() => {
    shuriken.style.transform = `rotate(${deg}deg)`;
    deg += 5;
    shuriken.style.right = parseInt(shuriken.style.right) - 4 + "px";
    if (
      parseInt(shuriken.style.right) >=
        parseInt(gameVariable.zombie.style.right) &&
      parseInt(shuriken.style.right) <=
        parseInt(gameVariable.zombie.style.right) + 50 &&
      parseInt(shuriken.style.bottom) >= 130 &&
      parseInt(shuriken.style.bottom) <= 260
    ) {
      clearInterval(shurikenSpinInterval);
      document.querySelector(".game-wrapper").removeChild(shuriken);
      gameVariable.currentZombieHealth -= gameVariable.hitDamage;
      document.querySelector(".health-bar").style.width =
        parseInt(document.querySelector(".health-bar").style.width) -
        gameVariable.hitDamage +
        "%";
    }
    if (parseInt(shuriken.style.right) === -100) {
      clearInterval(shurikenSpinInterval);
      document.querySelector(".game-wrapper").removeChild(shuriken);
    }
  }, 0.5);
};

const shurikenLoadingAnimation = () => {
  const loadingAnimation = setInterval(() => {
    shurikenOverlay.style.height =
      parseFloat(shurikenOverlay.style.height) + 0.5 + "%";
    if (parseFloat(shurikenOverlay.style.height) === 100) {
      gameVariable.shurikenCount++;
      document.querySelector(".shuriken-counter").innerHTML =
        gameVariable.shurikenCount;
      clearInterval(loadingAnimation);
      setTimeout(() => {
        shurikenOverlay.style.height = "0%";
        if (gameVariable.shurikenCount < 10) {
          shurikenLoadingAnimation();
        }
      }, 700);
    }
  }, 5);
};

export {
  runAnimation,
  shurikenSpin,
  ninjaJump,
  jumpAnimation,
  shurikenLoadingAnimation,
};
