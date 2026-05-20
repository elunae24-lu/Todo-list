class Add {
    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = false;

    }
}
// this new Add is for testing only
const task1 = new Add("lesson 1", "math nones", 12-23-34, "med", "negetive and negetive equal to a positive" )
export default Add