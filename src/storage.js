import createProjects from "./project.js";
import createAdd from "./add.js";

// The Key name for localstorage
const STORAGE_KEY = 'todoAppProject' 

//save- converts array to a string and saves it
const saveStorage = (project) => {
localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
};

//Load - reads the string and rebuild your objects
const loadStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);


// if the item return null
if(!data) return null;

//parse the string back into plain objects
const parsed = JSON.parse(data);

// Rebuild each projects as proper class
 return parsed.map((projectData) => {
    const project = new createProjects(projectData.name);
    project.id   = projectData.id;

    project.todos = projectData.todos.map((todosData) => {
        const todos     = new createAdd(
            todosData.title,
            todosData.description,
            todosData.dueDate,
            todosData.priority,
            todosData.notes
        );
        todos.id     = todosData.id;
        todos.isComplete = todosData.isComplete;
        return todos;
    });
    return project;
 });
};

export{saveStorage, loadStorage};