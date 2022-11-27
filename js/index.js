import {createTask} from "./module/task.js"
import {hide, show, isShown} from "./module/displayFunctions.js"
import {createLi, tasks} from "./module/generateLi.js"

const createNewForm = document.querySelector('.main-controls__create-new');
const ul = document.querySelector('.todos-page__tasks-list');
const selectAllButton = document.querySelector('.main-controls__select-all-button');
const allDeleteButtons = document.querySelectorAll('.item-in-list__delete_btn');
let itemsInUl = document.querySelectorAll('.tasks-list__item-in-list');
const amountOfTasksRadioButtons = document.querySelectorAll('.footer__radio-button');
const groupOfFilters = document.querySelector('.footer__amount-size');

const STATE = {ALL: 'All', ACTIVE: 'Active', COMPLETED: 'Completed' };

function hideIfBadFilter() {
    const currentFilterValue = document.querySelector('input[name="switcher"]:checked').value;
    if ((this.checked && currentFilterValue === STATE.ACTIVE) || (!this.checked && currentFilterValue === STATE.COMPLETED)) {
        const itemToRemove = document.querySelector(`li[id='${this.id}']`);
        hide(itemToRemove);
    }
}

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value);
    const currentFilterOfTasks = document.querySelector('input[name="switcher"]:checked').value;
    const newLi = createLi(task);
    if (currentFilterOfTasks === STATE.COMPLETED) {
        hide(newLi);
    }
    tasks.push(task);
    ul.appendChild(newLi);
    this.reset();
    const newCheckBox = newLi.querySelector('.item-in-list__checkbox');
    newCheckBox.addEventListener('click', hideIfBadFilter);
    itemsInUl = document.querySelectorAll('.tasks-list__item-in-list');
}

const selectAllTask = () => {
    var shouldCheckboxesBeChecked = false;
    for(let i = 0; i < itemsInUl.length; i++) {
        if (isShown(itemsInUl[i])){
            const inputsWithMark = itemsInUl[i].querySelector('.item-in-list__checkbox');
            if (!inputsWithMark.checked) {
                shouldCheckboxesBeChecked = true;
            }
        }   
    }
    const currentFilterValue = document.querySelector('input[name="switcher"]:checked').value;
    const displayProperty = ((shouldCheckboxesBeChecked && currentFilterValue === STATE.ACTIVE) || (!shouldCheckboxesBeChecked && currentFilterValue === STATE.COMPLETED)) ? "none" : "";
    for(let i = 0; i < itemsInUl.length; i++) {
        if (isShown(itemsInUl[i])) {
            const inputsWithMark = itemsInUl[i].querySelector('.item-in-list__checkbox');
            inputsWithMark.checked = shouldCheckboxesBeChecked;
            itemsInUl[i].style.display = displayProperty;
        }
    }
}

createNewForm.addEventListener('submit', addTask);
selectAllButton.addEventListener('click', selectAllTask);

function showTasks(e) {
    const radioButton = e.target;
    if (radioButton.className !== 'footer__radio-button') {
        return;
    }
    tasks.forEach(task => {
        const li = ul.querySelector(`li[id="${task.id}"]`);
        const inputOfCurrentLi = li.querySelector('.item-in-list__checkbox');
        const currentValue = radioButton.value;
        const isChecked = inputOfCurrentLi.checked;
        if (currentValue === STATE.ALL || (currentValue === STATE.ACTIVE && !isChecked)
            || (currentValue === STATE.COMPLETED && isChecked)) {
            show(li);
        } else {
            hide(li);
        }
    });
}

groupOfFilters.addEventListener('click', showTasks);

let allCheckboxes = document.querySelectorAll('.item-in-list__checkbox');
allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', hideIfBadFilter);
})

const deleteCompleted = () => {
    const checkboxes = document.querySelectorAll('.item-in-list__checkbox');
    checkboxes.forEach((checkbox) => {
        const currentItemInUl = document.querySelector(`li[id='${checkbox.id}']`);
        if (checkbox.checked && isShown(currentItemInUl)) {
            checkbox.removeEventListener('click', hideIfBadFilter);
            currentItemInUl.remove();
        }
    })
}

const footerBtnClear = document.querySelector('.footer__btn-clear');
footerBtnClear.addEventListener('click', deleteCompleted);
