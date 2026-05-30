import './styles/style.css'
import { renderSidebar, renderTodos } from './display'
import { loadStorage, saveStorage } from './storage'
import { getAllProjects } from './appLogic'

//load save data or new
const save = loadStorage()

if(save && save.length > 0) {
    console.log('loaded from storage', save)
}

// Render the init screen
renderSidebar();
renderTodos();