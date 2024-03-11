import gameVariable from "../constants/constants.js";
const { ninja, gameWinText, zombieKillTarget } = gameVariable;

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
    deg += 3;
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
      if (document.querySelector(".health-bar")) {
        document.querySelector(".health-bar").style.width =
          parseInt(document.querySelector(".health-bar").style.width) -
          gameVariable.hitDamage +
          "%";
      }
    }
    if (parseInt(shuriken.style.right) === -100) {
      clearInterval(shurikenSpinInterval);
    }
  }, 0.5);
};

const shurikenLoadingAnimation = () => {
  if (document.querySelector(".shuriken-counter")) {
    document.querySelector(".shuriken-counter").innerHTML =
      gameVariable.shurikenCount;
  }
  if (
    gameVariable.hearts !== 0 &&
    gameVariable.gameOn &&
    gameVariable.zombieCount !== zombieKillTarget
  ) {
    const shurikenOverlay = document.querySelector(".shuriken-overlay");
    shurikenOverlay.style.height = "0%";
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        shurikenOverlay.style.height =
          parseFloat(shurikenOverlay.style.height) + 0.5 + "%";
      }, i * 8);
    }
    setTimeout(() => {
      if (gameVariable.hearts !== 0) {
        gameVariable.shurikenCount++;
        if (document.querySelector(".shuriken-counter")) {
          document.querySelector(".shuriken-counter").innerHTML =
            gameVariable.shurikenCount;
        }
        setTimeout(() => {
          shurikenOverlay.style.height = "0%";
          if (gameVariable.shurikenCount < 5) {
            shurikenLoadingAnimation();
          }
        }, 500);
      }
    }, 1700);
  }
};

const winAnimation = () => {
  const castle = document.querySelector(".win-castle");
  castle.style.right = "-750px";
  for (let i = 0; i < 400; i++) {
    setTimeout(() => {
      castle.style.right = parseInt(castle.style.right) + 1 + "px";
    }, i * 4);
  }
  gameVariable.gameOn = false;
  setTimeout(() => {
    gameVariable.groundMoveCondition = false;
    ninja.style.visibility = "hidden";
    const standingNinja = document.createElement("img");
    standingNinja.src = "./images/ninja-win.png";
    standingNinja.classList.add("ninja");
    standingNinja.classList.add("standing-ninja");
    standingNinja.style.width = "150px";
    standingNinja.style.bottom = "120px";
    document.querySelector(".game-wrapper").appendChild(standingNinja);
    const speechBubble = document.querySelector(".bubble");
    speechBubble.style.display = "block";
    gameWinText.split(``).forEach((letter, index) => {
      setTimeout(() => {
        speechBubble.innerHTML += letter;
      }, 100 * index);
    });
  }, 1596);
};
export {
  runAnimation,
  shurikenSpin,
  ninjaJump,
  jumpAnimation,
  shurikenLoadingAnimation,
  winAnimation,
};
