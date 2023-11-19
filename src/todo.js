export class Todo {
    static currentId = 1;

    constructor(name, description, due, priority, state) {
        this.id = Todo.currentId++;
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.state = state;
    }
    
    /**
     * Allows user to edit todo
     * @param {} name 
     * @param {*} description 
     * @param {*} due 
     * @param {*} priority 
     * @param {*} state 
     */
    editTodo(name, description, due, priority, state) {
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.state = state;
    }
}
