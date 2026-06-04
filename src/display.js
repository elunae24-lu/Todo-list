import { getAllProjects, addProject, deleteProject, addTodo,
         deleteAdd, getProject, toggleComplete } from './appLogic.js';
import { saveStorage } from './storage.js';

// ================================
// TRACKED VARIABLES
// ================================
let currentProjectId = getAllProjects()[0].id;
let currentTodoId    = null;
let isEditing        = false;

// ================================
// HTML ELEMENTS
// ================================
const projectList  = document.getElementById('project-list');
const todoList     = document.getElementById('todo-list');
const projectTitle = document.getElementById('project-title');

// ================================
// RENDER SIDEBAR
// ================================
const renderSidebar = () => {
  // Clear first so we don't get duplicates
  projectList.innerHTML = '';

  getAllProjects().forEach((project) => {
    const li       = document.createElement('li');
    li.textContent = project.name;
    li.dataset.id  = project.id;

    // Highlight the selected project
    if (project.id === currentProjectId) {
      li.classList.add('active');
    }

    // Clicking a project switches to it
    li.addEventListener('click', () => {
      currentProjectId = project.id;
      renderSidebar();
      renderTodos();
    });

    projectList.appendChild(li);
  });
};

// ================================
// RENDER TODOS
// ================================
const renderTodos = () => {
  // Clear first
  todoList.innerHTML = '';

  const project = getProject(currentProjectId);
  projectTitle.textContent = project.name;

  project.todos.forEach((todo) => {
    const li = document.createElement('li');

    // Priority bar
    const bar = document.createElement('div');
    bar.classList.add('priority-bar', todo.priority);

    // Checkbox
    const check = document.createElement('div');
    check.classList.add('todo-check');
    if (todo.isComplete) check.classList.add('checked');

    check.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleComplete(currentProjectId, todo.id);
      saveStorage(getAllProjects());
      renderTodos();
    });

    // Title and due date
    const info = document.createElement('div');
    info.classList.add('todo-info');
    info.innerHTML = `
      <div class="todo-item-title ${todo.isComplete ? 'completed' : ''}">
        ${todo.title}
      </div>
      <div class="todo-item-date">${todo.dueDate}</div>
    `;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo-delete-btn');
    deleteBtn.textContent = '✕';

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteAdd(currentProjectId, todo.id);
      saveStorage(getAllProjects());
      renderTodos();
    });

    // Click todo row to open detail panel
    li.addEventListener('click', () => {
      openDetailPanel(todo);
    });

    li.appendChild(bar);
    li.appendChild(check);
    li.appendChild(info);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
};

// ================================
// DETAIL PANEL
// ================================
const openDetailPanel = (todo) => {
  currentTodoId = todo.id;
  document.getElementById('detail-panel').classList.remove('hidden');
  document.getElementById('detail-title').textContent       = todo.title;
  document.getElementById('detail-description').textContent = todo.description;
  document.getElementById('detail-due-date').textContent    = todo.dueDate;
  document.getElementById('detail-priority').textContent    = todo.priority;
  document.getElementById('detail-notes').textContent       = todo.notes;
};

// Close detail panel
document.getElementById('close-detail-btn')
  .addEventListener('click', () => {
    document.getElementById('detail-panel').classList.add('hidden');
  });

// Delete todo from detail panel
document.getElementById('delete-todo-btn')
  .addEventListener('click', () => {
    deleteAdd(currentProjectId, currentTodoId);
    saveStorage(getAllProjects());
    renderTodos();
    document.getElementById('detail-panel').classList.add('hidden');
  });

// Edit todo — fills the form with current values
document.getElementById('edit-todo-btn')
  .addEventListener('click', () => {
    isEditing = true;
    const todo = getProject(currentProjectId)
                 .todos.find(t => t.id === currentTodoId);

    document.getElementById('todo-title-input').value    = todo.title;
    document.getElementById('todo-desc-input').value     = todo.description;
    document.getElementById('todo-date-input').value     = todo.dueDate;
    document.getElementById('todo-priority-input').value = todo.priority;
    document.getElementById('todo-notes-input').value    = todo.notes;

    document.getElementById('detail-panel').classList.add('hidden');
    document.getElementById('modal-overlay').classList.remove('hidden');
  });

// ================================
// ADD TODO MODAL
// ================================
document.getElementById('add-todo-btn')
  .addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('hidden');
  });

document.getElementById('cancel-todo-btn')
  .addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.add('hidden');
  });

// Save todo — handles both new and edit
document.getElementById('save-todo-btn')
  .addEventListener('click', () => {
    const title       = document.getElementById('todo-title-input').value;
    const description = document.getElementById('todo-desc-input').value;
    const dueDate     = document.getElementById('todo-date-input').value;
    const priority    = document.getElementById('todo-priority-input').value;
    const notes       = document.getElementById('todo-notes-input').value;

    if (!title) return;

    if (isEditing) {
      // UPDATE existing todo
      const todo       = getProject(currentProjectId)
                         .todos.find(t => t.id === currentTodoId);
      todo.title       = title;
      todo.description = description;
      todo.dueDate     = dueDate;
      todo.priority    = priority;
      todo.notes       = notes;
      isEditing        = false;
    } else {
      // CREATE new todo
      addTodo(currentProjectId, title, description, dueDate, priority, notes);
    }

    saveStorage(getAllProjects());
    renderTodos();

    // Close and clear the form
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('todo-title-input').value = '';
    document.getElementById('todo-desc-input').value  = '';
    document.getElementById('todo-date-input').value  = '';
    document.getElementById('todo-notes-input').value = '';
  });

// ================================
// ADD PROJECT MODAL
// ================================
document.getElementById('add-project-btn')
  .addEventListener('click', () => {
    document.getElementById('project-modal-overlay').classList.remove('hidden');
  });

document.getElementById('cancel-project-btn')
  .addEventListener('click', () => {
    document.getElementById('project-modal-overlay').classList.add('hidden');
  });

document.getElementById('save-project-btn')
  .addEventListener('click', () => {
    const name = document.getElementById('project-name-input').value;
    if (!name) return;

    addProject(name);
    saveStorage(getAllProjects());
    renderSidebar();

    document.getElementById('project-modal-overlay').classList.add('hidden');
    document.getElementById('project-name-input').value = '';
  });

// ================================
// EXPORT
// ================================
export { renderSidebar, renderTodos };