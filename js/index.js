import {createTask} from "./module/task.js"
import {hide, show, isShown} from "./module/displayFunctions.js"
import {createLi, tasks, groupOfFilters, getCheckedFilter, updateText} from "./module/generateLi.js"

const createNewForm = document.querySelector('.main-controls__create-new');
const ul = document.querySelector('.todos-page__tasks-list');
const selectAllButton = document.querySelector('.main-controls__select-all-button');
const footerBtnClear = document.querySelector('.footer__btn-clear');

const STATE = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETED: 'Completed'
};

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value);
    tasks.push(task);
    ul.appendChild(createLi(task));
    this.reset();
    getCheckedFilter().click();
    updateText();
}

createNewForm.addEventListener('submit', addTask);

const selectAllTask = () => {
    var shouldCheckboxesBeChecked = false;
    tasks.forEach(task => {
        const currentLi = ul.querySelector(`li[id="${task.id}"]`);
        if (isShown(currentLi)){
            const inputsWithMark = currentLi.querySelector('.item-in-list__checkbox');
            if (!inputsWithMark.checked) {
                shouldCheckboxesBeChecked = true;
            }
        }   
    });
    tasks.forEach(task => {
        const currentLi = ul.querySelector(`li[id="${task.id}"]`);
        if (isShown(currentLi)){
            const inputsWithMark = currentLi.querySelector('.item-in-list__checkbox');
            inputsWithMark.checked = shouldCheckboxesBeChecked;
        }   
    });
    getCheckedFilter().click();
    updateText();
}

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
        if (currentValue === STATE.ALL || (currentValue === STATE.ACTIVE && !isChecked) || (currentValue === STATE.COMPLETED && isChecked)) {
            show(li);
        } else {
            hide(li);
        }
    });
    updateText();
}

groupOfFilters.addEventListener('click', showTasks);

const deleteCompleted = () => {
    for(let i = 0; i < tasks.length; i++) {
        const currentLi = ul.querySelector(`li[id="${tasks[i].id}"]`);
        const currentCheckbox = currentLi.querySelector(`input[id="${tasks[i].id}"]`);
        if (currentCheckbox.checked && isShown(currentLi)) {
            currentLi.remove();
            tasks.splice(i--, 1);
        }
    }
    updateText();
}

footerBtnClear.addEventListener('click', deleteCompleted);
