import {createTask} from "./module/task.js"
import {hide, show, isShown} from "./module/displayFunctions.js"
import {createLi} from "./module/generateLi.js"

const createNewForm = document.querySelector('.main-controls__create-new');
const ul = document.querySelector('.todos-page__tasks-list');
const selectAllButton = document.querySelector('.main-controls__select-all-button');
const allDeleteButtons = document.querySelectorAll('.item-in-list__delete_btn');
let itemsInUl = document.querySelectorAll('.tasks-list__item-in-list');
const amountOfTasksRadioButtons = document.querySelectorAll('.footer__radio-button');

function hideIfBadFilter() {
    const currentFilterValue = document.querySelector('input[name="switcher"]:checked').value;
    const itemToRemove = document.querySelector(`li[id='${this.id}']`);
    if ((this.checked && currentFilterValue === "Active") || (!this.checked && currentFilterValue === "Completed")) {
        hide(itemToRemove);
    }
}

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value);
    const currentFilterOfTasks = document.querySelector('input[name="switcher"]:checked').value;
    const newLi = createLi(task);
    if (currentFilterOfTasks === "Completed") {
        hide(newLi);
    }
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
    const displayProperty = ((shouldCheckboxesBeChecked && currentFilterValue === "Active") || (!shouldCheckboxesBeChecked && currentFilterValue === "Completed")) ? "none" : "";
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
allDeleteButtons.forEach((btn) => {
    const deleteTask = () => {
        btn.removeEventListener('click', deleteTask);
        const itemToRemove = document.querySelector(`[id='${btn.id}']`);
        itemToRemove.remove();
    };
    btn.addEventListener('click', deleteTask);
})

function showTasks(filterButton) {
    if (filterButton.value === "Completed") {
        const showCompleted = () => itemsInUl.forEach(li => {
            const inputOfCurrentLi = li.querySelector('.item-in-list__checkbox');
            if (!inputOfCurrentLi.checked) {
                hide(li);
            }
            else {
                show(li);
            }
        });
        filterButton.addEventListener('click', showCompleted);
    }
    else if (filterButton.value === "Active") {
        const showActive = () => itemsInUl.forEach(li => {
            const inputOfCurrentLi = li.querySelector('.item-in-list__checkbox');
            if (inputOfCurrentLi.checked) {
                hide(li);
            }
            else {
                show(li);
            }
        });
        filterButton.addEventListener('click', showActive);
    }
    else if (filterButton.value === "All") {
        const showAll = () => itemsInUl.forEach(li => {
            show(li);
        });
        filterButton.addEventListener('click', showAll);
    }
}

amountOfTasksRadioButtons.forEach((item) => {    
    showTasks(item)
})

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
