const labelWithCounter = document.querySelector('.footer__items-counter');

export function changeItemsLeft(value) {
    labelWithCounter.textContent = value.toString() + ' items left';
}
