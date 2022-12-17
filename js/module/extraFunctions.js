export const ul = document.querySelector('.todos-page__tasks-list');
export const groupOfFilters = document.querySelector('.footer__amount-size');

export function getCheckedFilter() {
    return groupOfFilters.querySelector('input[name="switcher"]:checked')
}

export function getLiById(id) {
    return ul.querySelector(`li[id="${id}"]`);
}
