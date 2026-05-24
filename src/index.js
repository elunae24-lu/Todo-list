import './styles/style.css'
import { getAllProjects, addProject, addTodo } from './appLogic.js'

addProject("work")

addTodo(getAllProjects()[0].id, "buy milk", "get oat milk", "2024-05-15", "low", "")
console.log(getAllProjects())