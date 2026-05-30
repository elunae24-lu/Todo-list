import{ getAllProjects, addProject, deleteProject, addTodo,
     deleteAdd, getProject, toggleComplete} from './appLogic.js';

import {saveStorage} from './storage.js';

// Track which projects is currently selected
let currentProjectId = getAllProjects()[0].id;

// grab element from HTML
const projectList = document.getElementById('project-list');
const todoList = document.getElementById('todo-list');
const projectTitle = document.getElementById('project-title');

const renderSidebar = () => { 
  //clear first so we don't get duplicate
  projectList.innerHTML = ''                                                            

  //loop througth each project and create a list 
        getAllProjects().forEach((project) => {
        const li         = document.createElement('li');
        li.textContent   = project.name;
        li.dataset.id    = project.id

        // Highligth the currently selectet project 
     if(project.id === currentProjectId) {
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
  //clear first
  todoList.innerHTML =  ''

  // Get the currently selected project
  const project = getProject(currentProjectId)

  // Update the title in the header
  projectTitle.textContent = project.name

  // Loop throught every todo
  project.todos.forEach((todo) => {
    const li = document.createElement('li')
    
    // Priority bar on the left
    const bar = document.createElement('div')
    bar.classList.add('priority-bar', todo.priority)

    // CheckBox circle
    const check = document.createElement('div')
    check.classList.add('todo-check')
    if(todo.isComplete) check.classList.add('checked')

      //todo title and due date
      const info = document.createElement('div')
      info.classList.add('todo-info')
      info.innerHTML = `
      <div class="todo-item-title ${todo.isComplete ? 'complete' : ''}">
        ${todo.title}
         </div>
         <div class="todo-item-date">${todo.dueDate}</div>`

        //Delete Button
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('todo-delete-btn')
        deleteBtn.textContent = 'X'

    // Append everything to the list item
    li.appendChild(bar)
    li.appendChild(check)
    li.appendChild(info)
    li.appendChild(deleteBtn)
    todoList.appendChild(li)
  })
}
    // Export render function so index.js can call then
    export {renderSidebar, renderTodos};

