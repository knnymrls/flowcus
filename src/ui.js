import { tasks } from "./tasks"
import { deleteTask } from "./tasks";

function updateDisplay() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <p>State: ${task.state}</p>
            <button class="delete-button" data-task-id="${task.id}">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);

        addDeleteButtonEventListeners();
    });
}

function openModal() {
    document.getElementById("modal-add-todo").style.display = 'block';
}

function closeModal() {
    document.getElementById("modal-add-todo").style.display = 'none';
}

function addDeleteButtonEventListeners() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const taskId = parseInt(this.getAttribute('data-task-id'));
            deleteTask(taskId);
        });
    });
}

export { updateDisplay, openModal, closeModal }