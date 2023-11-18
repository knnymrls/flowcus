export class Todo {
    static currentId = 1;

    constructor(name, description, dueDate, priority, state) {
        this.id = Todo.currentId++;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.state = state;
    }
}
