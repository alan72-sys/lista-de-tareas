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
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${task.id})">✎</button>
                <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? '✓' : ''}</button>
            </div>
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

// Función para marcar tarea como completada
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}


// Función para editar tarea
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt('Editar tarea:', task.text);
    
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
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

