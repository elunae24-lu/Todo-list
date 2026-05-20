import createAdd from "./add.js";
import createProjects from "./project.js";

// The one array the hold everything
const project = [];

// ex project for startup
const exProject = new createProjects("My task");
project.push(exProject);

// --- Projects Function 

const getAllProjects = () => project;

const addProject = (name) => {
    const newProject = new createProjects(name);
    project.push(newProject);
};

const deleteProject = (projectId) => {
// filter out the project that matches the id
const index = project.findIndex(p => p.id === process);
project.splice(index, 1)
};

const getProject = (projectId) =>
    project.find(p => p.id === projectId);

// ---Add Function

const addTodo = (projectId, title, description, dueDate, priority, notes) => {
    const project = getProject(projectId);
    const newTodo = new createAdd(title, description, dueDate, priority, notes);
    project.todos.push(newTodo);
};

const deleteAdd = (projectId, todoid) => {
const project = getProject(projectId);
project.todos.find(t => t.id === todoid);
};

const getAdd= (projectId, todoid) => {
const project = getProject(projectId);
return project.todos.find(t => t.id === todoid)
};

const toggleComplete = (projectId, todoid) => {
    const add = getAdd(projectId, todoid);
    add.isComplete = !add.isComplete // flip to true to false or false to true
};

// Export everthing 
export {
    getAllProjects, addProject, deleteProject, getProject, 
    addTodo, deleteAdd, getAdd, toggleComplete
}


