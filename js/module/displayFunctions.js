export function hide(element) {
    element.classList.add('hide-task');
    
}

export function show(element) {
    element.classList.remove('hide-task');
}

export function isShown(element) {
    return !element.classList.contains('hide-task');
}
