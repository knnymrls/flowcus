import { Todo } from "./todo";
import { updateDisplay } from "./ui";

// Array used to hold objects.
let tasks = [];

// Creates new task and pushes it to an array and saves it to local storage. 
function addTask(name, description, due, priority, state) {
    const task = new Todo(name, description, due, priority, state);

    tasks.push(task);
    saveTasks();
    updateDisplay();
}

/**
 * Edits task using taskId
 * @param {} taskId 
 * @param {*} name 
 * @param {*} description 
 * @param {*} due 
 * @param {*} priority 
 * @param {*} state 
 */
function editTask(taskId, name, description, due, priority, state) {
    const task = tasks.find(task => task.id == taskId);

    task.editTodo(name, description, due, priority, state);
    saveTasks();
    updateDisplay();
}

/**
 * Deletes a tasks using the taskId.
 * @param {String} taskId 
 */
function deleteTask(taskId) {
    // filters array by removing item based on task id
    tasks = tasks.filter(task => task.id !== taskId);

    saveTasks();
    updateDisplay();
}

/**
 * Saves tasks to local storage.
 */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Clears all the task items and resets the currentId.
 */
function clearTasks() {
    localStorage.removeItem('tasks');
    tasks = []; // Also clear the tasks array in your script
    Todo.currentId = 1;
}

/**
 * Loads tasks from local storage. 
 */
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    // Checks if savedTasks has items before loading
    if (savedTasks) {
        tasks = JSON.parse(savedTasks).map(taskData => new Todo(taskData.name, taskData.description, taskData.due, taskData.priority, taskData.status));
        updateDisplay();
    }
}

export { addTask, saveTasks, loadTasks, tasks, deleteTask, clearTasks, editTask }