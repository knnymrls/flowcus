export class todo {
    constructor(name, description, due, priority, state) {
        this.name = name;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.state = state;
    }

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setDue(due) {
        this.due = due;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    setState(state) {
        this.state = state;
    }
}