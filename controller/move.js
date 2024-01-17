import gameVariable from "../constants/constants.js";
import { runAnimation } from "./animations.js";
import {
  createGround,
  createHealthBar,
  createZombie,
} from "./createGameElements.js";
const { ground, ninja } = gameVariable;

const groundMove = (steps, ground) => {
  for (let i = 0; i < steps; i++) {
    setTimeout(() => {
      ground.style.left = parseInt(ground.style.left) - 1 + "px";
      if (parseInt(ground.style.left) === -900) {
        document.querySelector(".game-wrapper").removeChild(ground);
        const image = createGround({ ground: "ground2", position: "900px" });
        groundMove(1800, image);
      }
    }, i * 4);
  }
};

ground.forEach((element) => {
  const image = createGround(element);
  groundMove(element.loopPosition, image);
});

const zombieWalk = (zombie) => {
  const walk = setInterval(() => {
    zombie.style.right = parseInt(zombie.style.right) + 3 + "px";

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
    }

    if (gameVariable.currentZombieHealth <= 0) {
      clearInterval(walk);
      gameVariable.currentZombieHealth = 100;
      const healthBar = document.querySelector(".health-bar-wrapper");
      const image = createZombie();

      document.querySelector(".game-wrapper").removeChild(zombie);
      document.querySelector(".game-wrapper").removeChild(healthBar);

      document.querySelector(".game-wrapper").appendChild(image);
      createHealthBar(image);
      runAnimation("zombie/walk/Walk", 1, image, "zombie");

      gameVariable.zombie = image;

      setTimeout(() => {
        zombieWalk(image);
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
