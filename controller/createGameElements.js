import gameVariable from "../constants/constants.js";
import { shurikenSpin } from "./animations.js";
const { hearts, ninja } = gameVariable;

const createHearts = () => {
  new Array(hearts).fill("").forEach((_, index) => {
    const image = document.createElement("img");
    image.src = "./images/heart.png";
    image.classList.add(`hearts${index}`);
    document.querySelector(".hearts-wrapper").appendChild(image);
  });
};

const createGround = (element) => {
  const image = document.createElement("img");
  image.src = "./images/ground.png";
  image.classList.add(element.ground);
  image.style.left = element.position;
  document.querySelector(".game-wrapper").appendChild(image);
  return image;
};

const createShuriken = () => {
  const shuriken = document.createElement("img");
  shuriken.style.bottom = parseInt(ninja.style.bottom) + 40 + "px";
  shuriken.style.right = "640px";
  shuriken.src = "./images/shuriken.png";
  shuriken.classList.add("shuriken");
  document.querySelector(".game-wrapper").appendChild(shuriken);
  shurikenSpin(shuriken);
};

const createHealthBar = (zombie) => {
  const healthBarWrapper = document.createElement("div");
  healthBarWrapper.classList.add("health-bar-wrapper");
  const healthBar = document.createElement("div");
  healthBar.classList.add("health-bar");
  healthBar.style.width = `${gameVariable.currentZombieHealth}%`;
  healthBarWrapper.style.bottom = "270px";
  healthBarWrapper.style.right = zombie.style.right;
  healthBarWrapper.appendChild(healthBar);
  setInterval(() => {
    healthBarWrapper.style.bottom = "270px";
    healthBarWrapper.style.right = zombie.style.right;
  }, 10);
  document.querySelector(".game-wrapper").appendChild(healthBarWrapper);
};

const createZombie = () => {
  const image = document.createElement("img");
  image.src = "./images/zombie/walk/Walk1.png";
  image.classList.add("zombie");
  image.style.right = "-150px";
  return image;
};

export {
  createHearts,
  createGround,
  createShuriken,
  createHealthBar,
  createZombie,
};
