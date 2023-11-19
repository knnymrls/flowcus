import { formatdue } from "./format";
import { editTask, tasks, addTask } from "./tasks";
import { deleteTask } from "./tasks";

// Function to update the display with tasks
function updateDisplay() {
    const tasksContainer = document.querySelector('.main-tasks-container');
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        tasksContainer.appendChild(createTaskElement(task));
    });

    tasksContainer.innerHTML += '<button id="add-todo-button">ADD TODO</button>';
    document.getElementById('add-todo-button').addEventListener('click', openAddTodoModal);

    addAllButtonEventListeners();
}

// Create individual task element
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
    <div class="card ${task.id}">

    <div class="card-main-info">
        <p class="card-name">${task.name}</h3>
        <p class="card-date">${formatdue(task.due)}</p>
    </div>
    <div class="card-sup-info">
        <p>${task.priority}</p>
        <div class="card-accessors">
            <button class="delete-button" data-task-id="${task.id}">Delete</button>
            <button class="edit-button" data-task-id="${task.id}">Edit</button>
        </div>
    </div>
    </div>
    `;
    return taskElement;
}

// Add event listeners for all buttons
function addAllButtonEventListeners() {
    addDeleteButtonEventListeners();
    addEditButtonEventListeners();
    // Add any other button event listeners here
}

// Function to add delete button event listeners
function addDeleteButtonEventListeners() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            deleteTask(parseInt(this.getAttribute('data-task-id')));
        });
    });
}

// Function to add edit button event listeners
function addEditButtonEventListeners() {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            openEditModal(parseInt(this.getAttribute('data-task-id')));
        });
    });
}

// Open and populate the edit modal
function openEditModal(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        populateEditModal(task);
        document.getElementById('edit-modal').style.display = 'block';
    }
}

// Populate edit modal with task data
function populateEditModal(task) {
    document.getElementById('edit-taskId').value = task.id;
    document.getElementById('edit-name').value = task.name;
    document.getElementById('edit-description').value = task.description;
    document.getElementById('edit-due').value = task.due;
    
    // Set the correct radio button for priority
    document.querySelectorAll(`input[name="edit-priority"][value="${task.priority}"]`).forEach(radio => {
        radio.checked = true;
    });

    // Set the correct radio button for state
    document.querySelectorAll(`input[name="edit-state"][value="${task.state}"]`).forEach(radio => {
        radio.checked = true;
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Add todo button event listener
    document.getElementById('add-todo-button').addEventListener('click', openAddTodoModal);

    // Close modal events
    document.getElementById('close-add-modal').addEventListener('click', closeAddTodoModal);
    document.getElementById('close-edit-modal').addEventListener('click', closeEditModal);

    // Form submit event listeners
    document.getElementById('add-form').addEventListener('submit', handleAddTodoSubmit);
    document.getElementById('edit-form').addEventListener('submit', handleEditTodoSubmit);

    // Event listener for clicking outside the form modal
    document.addEventListener('click', event => {
        if (event.target === document.getElementById('add-modal')) {
            closeAddTodoModal();
        }
        if (event.target === document.getElementById('edit-modal')) {
            closeEditModal();
        }
    });
}

// Open add todo modal
function openAddTodoModal() {
    document.getElementById("add-modal").style.display = 'block';
}

// Close add todo modal
function closeAddTodoModal() {
    document.getElementById("add-modal").style.display = 'none';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Handle add todo form submission
function handleAddTodoSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('add-name').value;
    const description = document.getElementById('add-description')?.value || "";
    const due = document.getElementById('add-due').value;
    const priority = document.querySelector('input[name="priority"]:checked')?.value || "None";
    const state = document.querySelector('input[name="state"]:checked')?.value || "None";

    addTask(name, description, due, priority, state);
    closeAddTodoModal();
    this.reset();
}

// Handle edit todo form submission
function handleEditTodoSubmit(event) {
    event.preventDefault();

    const taskId = parseInt(document.getElementById('edit-taskId').value);
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description')?.value;
    const due = document.getElementById('edit-due').value;
    const priority = document.querySelector('input[name="priority"]:checked')?.value;
    const state = document.querySelector('input[name="state"]:checked')?.value;

    editTask(taskId, name, description, due, priority, state);
    closeEditModal();
}

// Call to initialize event listeners
initializeEventListeners();

export { updateDisplay };
