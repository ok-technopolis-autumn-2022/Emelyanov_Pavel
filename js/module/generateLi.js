/**
 * @param {id: string | number, desc: string, completed: boolean} task 
 * @returns {string}
 */
 export function createLi(task) {
    const itemInList = document.createElement('li');
    itemInList.id = task.id;
    itemInList.className = 'tasks-list__item-in-list item-in-list';

    const taskItem = document.createElement('div');
    taskItem.className = 'item-in-list__task-item';

    const inputWithMark  = document.createElement('input');
    inputWithMark.id = task.id;
    inputWithMark.type = 'checkbox';
    inputWithMark.className = 'item-in-list__checkbox';
    inputWithMark.ariaLabel = 'Item in your tasks';
    inputWithMark.role = 'checkbox';
    inputWithMark.checked = task.completed;

    const mainListText  = document.createElement('span');
    mainListText.className = 'item-in-list__main-list-text';
    mainListText.textContent = task.desc;

    const customCheckbox  = document.createElement('label');
    customCheckbox.className = 'item-in-list__custom-checkbox';

    const checkboxReplica  = document.createElement('span');
    checkboxReplica.className = 'item-in-list__checkbox-replica';

    const deleteBtn  = document.createElement('button');
    deleteBtn.className = 'item-in-list__delete_btn';
    deleteBtn.role = 'button';
    deleteBtn.ariaLabel = 'Delete this task';

    const editDiv  = document.createElement('div');
    editDiv.className = 'item-in-list__edit';

    const editInput  = document.createElement('input');
    editInput.id = task.id;
    editInput.type = 'text';
    editInput.className = 'task-item__input';
    editInput.ariaLabel = 'Edit task';
    editInput.value = task.desc;

    customCheckbox.append(inputWithMark, checkboxReplica);
    taskItem.append(customCheckbox, mainListText, deleteBtn);
    editDiv.appendChild(editInput);
    itemInList.append(taskItem, editDiv);
    return itemInList;
}
