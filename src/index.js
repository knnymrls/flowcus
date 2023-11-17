import _ from 'lodash';
import { todo } from './todo.js'; // Assuming you've renamed 'todo' to 'Todo' 
import { addTask, clearTasks, deleteTask, loadTasks, tasks } from './tasks.js';

loadTasks();

document.getElementById('button-add-todo').addEventListener('click', function () {
    addTask("me", "me", "me", "me", "me");
});

function addDeleteButtonEventListeners() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const taskId = parseInt(this.getAttribute('data-task-id'));
            deleteTask(taskId);
        });
    });
}

export { deleteTask, addDeleteButtonEventListeners }
