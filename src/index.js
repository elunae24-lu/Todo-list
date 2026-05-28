import './styles/style.css'
import { renderSidebar, renderTodos } from './display'
import { loadStorage, saveStorage } from './storage'
import { getAllProjects } from './appLogic'

//load save data or new
const save = loadStorage();

// Render the init screen
renderSidebar();
renderTodos();