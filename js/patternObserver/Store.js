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

    deleteCompleted(completedTasksIndex) {
        let amountOfDeletion = 0;
        completedTasksIndex.forEach(index => {
            this.#tasks.splice(index - amountOfDeletion, 1);
            amountOfDeletion++;
        });
        this.notify(OBSERVABLE_ACTIONS.REMOVE_TASK);
    }

    selectAll(selectedTasksIndex, value) {
        if (selectedTasksIndex.length === 0) {
            return;
        }
        selectedTasksIndex.forEach( index => {
            this.#tasks[index].completed = value;
        });
        this.#tasks.forEach(task => task.isCompleted = true);
        this.notify(OBSERVABLE_ACTIONS.FILTER_TASKS);
    }

    changeTaskStatus(index) {
        this.#tasks[index].completed = !this.#tasks[index].completed;
        this.notify(OBSERVABLE_ACTIONS.FILTER_TASKS);
    }
}
