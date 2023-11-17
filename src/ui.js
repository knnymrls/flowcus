import { addDeleteButtonEventListeners } from ".";
import { tasks } from "./tasks"

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
            <button class="delete-button" data-task-id="${task.id}">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);

        addDeleteButtonEventListeners();
    });
}

export { updateDisplay }