export class todo {

    static currentId = 1;

    constructor(name, description, due, priority, state) {
        this.id = todo.currentId++;
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.state = state;
    }
}