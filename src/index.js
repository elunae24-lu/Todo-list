import './styles/style.css'
import { renderSidebar, renderTodos } from './display'
import { loadStorage, saveStorage } from './storage'
import { getAllProjects, loadProjects } from './appLogic'

//load save data or new
const save = loadStorage()

if(save && save.length > 0) {
   loadProjects(save)  // put saved date back into the array
}

// Render the init screen
renderSidebar();
renderTodos();