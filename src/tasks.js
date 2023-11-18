import { Todo } from "./todo";
import { updateDisplay } from "./ui";

// Array used to hold objects.
let tasks = [];

// Creates new task and pushes it to an array and saves it to local storage. 
function addTask(name, description, dueDate, priority, state) {
    const task = new Todo(name, description, dueDate, priority, state);

    tasks.push(task);
    saveTasks();
    updateDisplay();
}

// Deletes a tasks using the taskId
function deleteTask(taskId) {
    // filters array by removing item based on task id
    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks();
    updateDisplay();
}

// Saves tasks to local storage.
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clears all the task items and resets the currentId
function clearTasks() {
    localStorage.removeItem('tasks');
    tasks = []; // Also clear the tasks array in your script
    Todo.currentId = 1;
}

// Loads tasks from local storage. 
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    // Checks if savedTasks has items before loading
    if (savedTasks) {
        tasks = JSON.parse(savedTasks).map(taskData => new Todo(taskData.name, taskData.description, taskData.dueDate, taskData.priority, taskData.status));
        updateDisplay();
    }
}

export { addTask, saveTasks, loadTasks, tasks, deleteTask, clearTasks }