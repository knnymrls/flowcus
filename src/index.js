import { addTask, deleteTask, loadTasks } from './tasks.js';
import { closeModal, openModal } from './ui.js';
import { formatDueDate } from './format.js';

loadTasks();

document.getElementById('button-add-todo').addEventListener('click', function () {
    openModal();
});

document.getElementById('modal-add-todo-close').addEventListener('click', function () {
    closeModal();
});

document.addEventListener('click', function (event) {
    var modal = document.getElementById('modal-add-todo');

    // Check if the click is outside the modal
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById('form-add-todo').addEventListener('submit', function () {
    event.preventDefault();

    // Gathers information form user input
    const name = document.getElementById('add-todo-name').value;
    const description = document.getElementById('add-todo-description')?.value || "";
    const dueDate = formatDueDate(document.getElementById('add-todo-dueDate')?.value);
    const priority = document.querySelector('input[name="priority"]:checked')?.value || "None";
    const state = document.querySelector('input[name="state"]:checked')?.value || "Todo";

    // Adds a task based on that information
    addTask(name, description, dueDate, priority, state);

    // Closes the modal
    closeModal();

    // Resets the form inputs
    this.reset();
});