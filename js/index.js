import { createTask } from "./module/task.js";
import { groupOfFilters, createLi, getCheckedFilter } from "./module/generateLi.js";
import { Store } from "./patternObserver/Store.js";
import { changeItemsLeft } from "./module/displayFunctions.js";
import { STATE } from "./module/states";
import { OBSERVABLE_ACTIONS } from "./patternObserver/actions.js";

const createNewForm = document.querySelector('.main-controls__create-new');
const ul = document.querySelector('.todos-page__tasks-list');
const selectAllButton = document.querySelector('.main-controls__select-all-button');
const footerBtnClear = document.querySelector('.footer__btn-clear');
const store = new Store();

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value);
    store.addNewTask(task);
    this.reset();
}

createNewForm.addEventListener('submit', addTask);

const selectAllTask = () => {
    let selectedTasksIndex = [];
    var shouldCheckboxesBeChecked = false;
    const tasks = store.getTasks();
    tasks.forEach((task, i) => {
        const currentLi = ul.querySelector(`li[id="${task.id}"]`);
        if (currentLi) {
            selectedTasksIndex.push(i);
            if (!task.completed) {
                shouldCheckboxesBeChecked = true;
            }
        }   
    });
    store.selectAll(selectedTasksIndex, shouldCheckboxesBeChecked);
}

selectAllButton.addEventListener('click', selectAllTask);

const deleteCompleted = () => {
    let completedTasksIndex = [];
    const tasks = store.getTasks();
    for(let i = 0; i < tasks.length; i++) {
        const currentLi = ul.querySelector(`li[id="${tasks[i].id}"]`);
        if (!currentLi) {
            continue;
        }
        const currentCheckbox = currentLi.querySelector(`input[id="${tasks[i].id}"]`);
        if (currentCheckbox.checked) {
            completedTasksIndex.push(i);  
        }
    }
    store.deleteCompleted(completedTasksIndex);
}

footerBtnClear.addEventListener('click', deleteCompleted);

ul.addEventListener('click', commonTasksForUl);

function commonTasksForUl(e) {
    const currentTarget = e.target;
    if (currentTarget.classList.contains('item-in-list__delete_btn')) {
        const li = currentTarget.closest('li');
        if (!li) {
            return;
        }
        let index = 0;
        const requiredId = Number(li.id);
        const tasks = store.getTasks();
        tasks.forEach((el, i) => {
            if (el.id === requiredId) {
                index = i;
            }
        });
        store.removeTask(index);
    } else if (currentTarget.classList.contains('item-in-list__checkbox')) {
        const li = currentTarget.closest('li')
        if (!li) {
            return;
        }
        let index = 0;
        const requiredId = Number(li.id);
        const tasks = store.getTasks();
        tasks.forEach((el, i) => {
            if (el.id === requiredId) {
                index = i;
            }
        });
        store.changeTaskStatus(index);
    }
}

groupOfFilters.addEventListener('click', render);

function render() {
    ul.innerHTML = '';
    const tasks = store.getTasks();
    tasks.forEach(task => {
        const currentValue = getCheckedFilter().value;
        const isChecked = task.completed;
        if (currentValue === STATE.ALL || (currentValue === STATE.ACTIVE && !isChecked) || (currentValue === STATE.COMPLETED && isChecked)) {
                const taskLi = createLi(task);
                ul.append(taskLi);
        }
    });
    updateText();
}

function updateText() {
    const tasks = store.getTasks();
    let counter = 0;
    tasks.forEach(task => {
        const currentLi = ul.querySelector(`li[id="${task.id}"]`);
        if (!currentLi) {
            return;
        }
        if (!task.completed) {
            counter++;
        }
    });
    changeItemsLeft(counter);
}

store.subscribe((event) => {
    switch (event) {
        case OBSERVABLE_ACTIONS.ADD_TASK:
        case OBSERVABLE_ACTIONS.REMOVE_TASK:
        case OBSERVABLE_ACTIONS.FILTER_TASKS:
            render();
    }
});