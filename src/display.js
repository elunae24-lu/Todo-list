import{ getAllProjects, addProject, deleteProject, addTodo,
     deleteTodo, getProject
} from './appLogic.js';
import { saveStorage, loadStorage } from './storage.js';

// Track which projects is currently selected
let currentProjectId = getAllProjects()[0].id;

// grab the sidebar list from the html and Todos 
const projectList = document.getElementById('project-list');
const todoList = document.getElementById('todo-list');
const projectTitle = document.getElementById('project-title');

const renderSidebar = () => {
    //clear the list so we don't get duplicates
    projectList.innerHTML = '';

    //loop througth each project and create a list 
    getAllProjects().forEach((projects) => {
        const li = document.createElement('li');
        li.textContent = projects.name;
        li.dataset.id = projects.id

        // Highligth the currently selectef project 
     if(projects.id === currentProjectId) {
        li.classList.add('active');
     }
    
     //Project switches 
     li.addEventListener('click', () => {
        currentProjectId = project.id;
        renderSidebar();
        renderTodos();
     });

   projectList.appendChild(li)

    });
};

const renderTodos = () => {
    // Clear the list first
    todoList.innerHTML = ''

    //Get the currently selected project
     const project = getProject(currentProjectId)

    // Updated the title
    projectTitle.textContent = project.name

    //Loop through every projects
  project.todos.forEach((todo)=> {
    const li = document.createElement('li');

   // Priority bar on the left
   const bar = document.createElement('div');
   bar.classList.add('priority-bar', todo.priority);

   //Checkbox circle
   const check = document.createElement('div');
   check.classList.add('todo-check');
   if(todo.isComplete) check.classList.add('checked');

   // todo info 
   const info = document.createElement("div");
   info.classList.add('todo-info');
   info.innerHTML = `
     <div class = "todo-item-title ${todo.isComplete ? 'Complete' : ''}">
     ${todo.title}
     </div>
     <div class = "todo-item-date"> ${todo.dueDate}</div>
   `
   ;

   //Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('todo-detele-btn');
    deleteBtn.innerHTML =`X`;

    li.appendChild(bar);
    li.appendChild(check);
    li.appendChild(info);
    li.appendChild(deleteBtn);
    todoList.appendChild(li)
  });

};
    // Adding the button for the modal
    const addBtn = document.getElementById('add-todo-btn')
    .addEventListener('click', () => {
    document.getElementById('modal-overlay')
    .classList.remove('hidden')
    });

    // Save todo button reads the form calls addTodo
    document.getElementById('save-todo-btn')
    .addEventListener('click', () => {
        const title = document.getElementById('todo-title-input').value;
        const description = document.getElementById('todo-desc-input').value;
        const dueDate = document.getElementById('todo-date-input').value;
        const priority = document.getElementById('todo-priority-input').value;
        const notes = document.getElementById('todo-notes-input').value;

        if(!title) return; // don't save empty notes

        addTodo(currentProjectId, title, description, dueDate, priority, notes);
        saveStorage(getAllProjects());
        renderTodos();

        //close modal and clear the form
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('todo-title-input').value = '';
        if(!name) return;

        addProject(name);
        saveStorage(getAllProjects())
        renderSidebar();

        document.getElementById('project-modal-overlay').classList.add('hidden');
        document.getElementById('project-name-input').value = '';
    });

    // Export render function so index.js can call then
    export {renderSidebar, renderTodos};

