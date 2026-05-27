import{ getAllProjects, addProject, deleteProject, addTodo, deleteProject,
    addTodo, deleteTodo, getProject
} from './appLogic.js';
import { saveStorage, loadStorage } from './storage.js';

// Track which projects is currently selected
let currentProjectId = getAllProjects()[0].id;

// grab the sidebar list from the html
const projectList = document.getElementById('project-list');

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

    

