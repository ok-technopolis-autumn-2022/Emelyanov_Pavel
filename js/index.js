import { createTask } from "./module/task.js";
import { createLi } from "./module/generateLi.js";
import { ul, groupOfFilters, getCheckedFilter, getLiById } from "./module/extraFunctions.js";
import { Store } from "./patternObserver/Store.js";
import { changeItemsLeft } from "./module/updatingDataFunc.js";
import { STATE } from "./module/states";
import { OBSERVABLE_ACTIONS } from "./patternObserver/actions.js";

const createNewForm = document.querySelector('.main-controls__create-new');
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
    var selectedTasksIndex = [];
    var shouldCheckboxesBeChecked = false;
    const tasks = store.getTasks();
    tasks.forEach((task, i) => {
        if (getLiById(task.id)) {
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
    var completedTasksIndexes = [];
    const tasks = store.getTasks();
    tasks.forEach((task, i) => {
        if (getLiById(task.id) && task.completed) {
            completedTasksIndexes.push(i);  
        }
    })
    store.deleteCompleted(completedTasksIndexes);
}

footerBtnClear.addEventListener('click', deleteCompleted);

ul.addEventListener('click', commonTasksForUl);

function commonTasksForUl(e) {
    const currentTarget = e.target;
    const li = currentTarget.closest('li');
    if (!li) {
        return;
    }
    const requiredId = Number(li.id);
    const tasks = store.getTasks();
    var index = tasks.map(el => el.id).findIndex(id => id === requiredId);
    if (currentTarget.classList.contains('item-in-list__delete_btn')) {
        store.removeTask(index);
    } else if (currentTarget.classList.contains('item-in-list__checkbox')) {
        store.changeTaskState(index);
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
            ul.appendChild(createLi(task));
        }
    });
    updateText();
}

function updateText() {
    const tasks = store.getTasks();
    var counter = tasks.filter(task => getLiById(task.id) && !task.completed).length;
    changeItemsLeft(counter);
}

store.subscribe((event) => {
    switch (event) {
        case OBSERVABLE_ACTIONS.ADD_TASK:
        case OBSERVABLE_ACTIONS.REMOVE_TASK:
        case OBSERVABLE_ACTIONS.CHANGE_TASKS:
            render();
    }
});
