let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');

    const taskText = taskInput.value.trim();
    const priority = parseInt(priorityInput.value) || 1; // Default priority is 1 if not provided
    const dueDate = dueDateInput.value || ''; // Use empty string if no due date provided

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    priorityInput.value = '';
    dueDateInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const filterSelect = document.getElementById('filterSelect');
    const filterValue = filterSelect.value;
    taskList.innerHTML = '';

    let filteredTasks = [...tasks];
    if (filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterValue === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filterValue === 'priority') {
        filteredTasks.sort((a, b) => a.priority - b.priority);
    } else if (filterValue === 'dueDate') {
        filteredTasks.sort((a, b) => {
            if (a.dueDate < b.dueDate) return -1;
            if (a.dueDate > b.dueDate) return 1;
            return 0;
        });
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${task.text}</span>
            <span class="details">
                Priority: ${task.priority} | Due Date: ${task.dueDate}
            </span>
            <div class="actions">
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;

    const newText = prompt('Edit task:', taskToEdit.text);
    if (newText !== null) {
        taskToEdit.text = newText.trim();
        renderTasks();
    }
}

function toggleComplete(id) {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return;

    taskToToggle.completed = !taskToToggle.completed;
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function filterTasks() {
    renderTasks();
}
