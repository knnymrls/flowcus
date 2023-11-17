import { fromPairs, update } from "lodash";
import { todo } from "./todo";
import { updateDisplay } from "./ui";

// Array used to hold objects.
let tasks = [];

// Creates new task and pushes it to an array and saves it to local storage. 
function addTask(name, description, due, priority, state) {
    const task = new todo(name, description, due, priority, state);
    tasks.push(task);
    saveTasks();
    updateDisplay();
}

// Deletes a tasks using the taskId
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    updateDisplay();
}

// Saves tasks to local storage.
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    localStorage.removeItem('tasks');
    tasks = []; // Also clear the tasks array in your script
    todo.currentId = 1;
}
// Loads tasks from local storage. 
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    // Checks if savedTasks has items before loading
    if (savedTasks) {
        tasks = JSON.parse(savedTasks).map(taskData => new todo(taskData.name, taskData.description, taskData.dueDate, taskData.priority, taskData.status));
        updateDisplay();
    }
}

export { addTask, saveTasks, loadTasks, tasks, deleteTask, clearTasks }