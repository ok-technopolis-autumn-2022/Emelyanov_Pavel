export function hide(element) {
    element.style.display = "none";
}

export function show(element) {
    element.style.display = '';
}

export function isShown(element) {
    return element.style.display === '';
}
