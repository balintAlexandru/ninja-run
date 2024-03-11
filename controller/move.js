import gameVariable from "../constants/constants.js";
import { runAnimation } from "./animations.js";
import {
  createGround,
  createHealthBar,
  createZombie,
} from "./createGameElements.js";
const { ninja, gameOverScreen, zombieKillTarget } = gameVariable;

const groundMove = (ground) => {
  setInterval(() => {
    if (gameVariable.groundMoveCondition) {
      ground.style.left = parseInt(ground.style.left) - 1 + "px";
      if (parseInt(ground.style.left) === -900) {
        ground.style.left = "900px";
      }
    }
  }, 4);
};

new Array(2).fill("").forEach((_, index) => {
  const image = createGround(`ground${index + 1}`, 900 * index);
  groundMove(image);
});

const zombieWalk = (zombie) => {
  const walk = setInterval(() => {
    zombie.style.right = parseInt(zombie.style.right) + 3 + "px";
    if (gameVariable.zombieCount === zombieKillTarget) {
      clearInterval(walk);
      return;
    }
    if (
      parseInt(zombie.style.right) > 570 &&
      parseInt(zombie.style.right) < 670 &&
      parseInt(ninja.style.bottom) < 260 &&
      !gameVariable.zombieTouch
    ) {
      gameVariable.zombieTouch = true;
      document
        .querySelector(".hearts-wrapper")
        .removeChild(document.querySelector(`.hearts${--gameVariable.hearts}`));
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          ninja.style.filter =
            "brightness(100%) hue-rotate(0deg) saturate(600%)";
          setTimeout(() => {
            ninja.style.filter = "none";
          }, 200);
        }, i * 300);
      }
      if (gameVariable.hearts === 0) {
        const healthBar = document.querySelector(".health-bar-wrapper");
        const shurikenIcon = document.querySelector(".shuriken-count-wrapper");
        const zombieIcon = document.querySelector(".zombie-count-wrapper");
        ninja.style.visibility = "hidden";
        document.querySelector(".game-wrapper").removeChild(zombie);
        document.querySelector(".game-wrapper").removeChild(healthBar);
        document.querySelector(".game-wrapper").removeChild(shurikenIcon);
        document.querySelector(".game-wrapper").removeChild(zombieIcon);
        clearInterval(walk);
        setTimeout(() => {
          gameOverScreen.style.display = "inherit";
          setTimeout(() => {
            gameOverScreen.querySelector(
              ".play-again-button"
            ).style.visibility = "visible";
          }, 500);
        }, 10);
        return;
      }
    }

    if (gameVariable.currentZombieHealth <= 0) {
      clearInterval(walk);
      gameVariable.zombieCount++;
      gameVariable.currentZombieHealth = 100;
      document.querySelector(".zombie-counter").innerHTML =
        gameVariable.zombieCount;
      const healthBar = document.querySelector(".health-bar-wrapper");
      const image = createZombie();

      document.querySelector(".game-wrapper").removeChild(zombie);
      document.querySelector(".game-wrapper").removeChild(healthBar);

      document.querySelector(".game-wrapper").appendChild(image);
      createHealthBar(image);
      runAnimation("zombie/walk/Walk", 1, image, "zombie");

      gameVariable.zombie = image;

      setTimeout(() => {
        gameVariable.zombieCount !== zombieKillTarget && zombieWalk(image);
      }, 500);
    }

    if (
      zombie.style.right === "951px" &&
      gameVariable.currentZombieHealth > 0
    ) {
      clearInterval(walk);
      document
        .querySelector(".game-wrapper")
        .removeChild(document.querySelector(".health-bar-wrapper"));
      document.querySelector(".game-wrapper").removeChild(zombie);
      const image = createZombie();
      document.querySelector(".game-wrapper").appendChild(image);
      zombieWalk(image);
      createHealthBar(image);
      runAnimation("zombie/walk/Walk", 1, image, "zombie");
      gameVariable.zombieTouch = false;
      gameVariable.zombie = image;
    }
  }, 7);
};

export { groundMove, zombieWalk };
