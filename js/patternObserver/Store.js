import { OBSERVABLE_ACTIONS } from "./actions"

export class Store {
    #observers = [];
    #tasks = [];

    subscribe(observer) {
        this.#observers.push(observer);
        observer(this);
    }

    notify(code) {
        this.#observers.forEach(observer => observer(code))
    }

    addNewTask(task) {
        this.#tasks.push(task);
        this.notify(OBSERVABLE_ACTIONS.ADD_TASK);
    }

    getTasks() {
        return this.#tasks;
    }

    removeTask(index) {
        this.#tasks.splice(index, 1);
        this.notify(OBSERVABLE_ACTIONS.REMOVE_TASK);
    }

    deleteCompleted(completedTasksIndexes) {
        let amountOfDeletion = 0;
        completedTasksIndexes.forEach(index => {
            this.#tasks.splice(index - amountOfDeletion, 1);
            amountOfDeletion++;
        });
        this.notify(OBSERVABLE_ACTIONS.REMOVE_TASK);
    }

    selectAll(selectedTasksIndexes, value) {
        selectedTasksIndexes.forEach( index => this.#tasks[index].completed = value);
        this.notify(OBSERVABLE_ACTIONS.FILTER_TASKS);
    }

    changeTaskState(index) {
        this.#tasks[index].completed = !this.#tasks[index].completed;
        this.notify(OBSERVABLE_ACTIONS.FILTER_TASKS);
    }
}
