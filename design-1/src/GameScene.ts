import { createElement } from "./HtmlElement";

export const container = createElement()
container.id = 'game-container';
container.classList.add('container');

let gameScene = document.getElementById('game-scene');
gameScene?.append(container);