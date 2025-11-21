// Array para almacenar las tareas
let tasks = [];

// Referencias a elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Función para guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

// Función para mostrar las tareas en pantalla
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
        `;
        taskList.appendChild(li);
    });
}

// Función para agregar una nueva tarea
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Por favor escribe una tarea');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Cargar tareas al iniciar
loadTasks();
renderTasks();