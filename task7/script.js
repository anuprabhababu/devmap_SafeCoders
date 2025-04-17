// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterPending = document.getElementById('filterPending');
const clearCompletedButton = document.getElementById('clearCompletedButton');

// Load tasks from local storage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
};

// Save tasks to local storage
const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Create a task element
const createTaskElement = (taskText, completed = false) => {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item flex items-center justify-between p-2 border rounded-lg bg-white shadow-md ${completed ? 'completed' : ''}`;

    // Task text
    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text flex-1';
    taskTextElement.textContent = taskText;

    // Action buttons
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions flex space-x-2';

    // Complete button
    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg';
    completeButton.textContent = '✔';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    // Edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg';
    editButton.textContent = '✏';
    editButton.addEventListener('click', () => {
        const newText = prompt('Edit your task:', taskTextElement.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskTextElement.textContent = newText.trim();
            saveTasks();
        }
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg';
    deleteButton.textContent = '✖';
    deleteButton.addEventListener('click', () => {
        taskItem.classList.add('fade-exit');
        setTimeout(() => {
            taskItem.remove();
            saveTasks();
        }, 300);
    });

    // Append buttons to actions
    taskActions.appendChild(completeButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    // Append elements to task item
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(taskActions);

    // Append task item to the list
    taskItem.classList.add('fade-enter');
    taskList.appendChild(taskItem);

    setTimeout(() => taskItem.classList.remove('fade-enter'), 300);
};

// Add a new task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = '';
    }
});

// Filter tasks
const filterTasks = (filter) => {
    document.querySelectorAll('.task-item').forEach(taskItem => {
        switch (filter) {
            case 'all':
                taskItem.style.display = 'flex';
                break;
            case 'completed':
                taskItem.style.display = taskItem.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                taskItem.style.display = !taskItem.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
};

// Filter buttons event listeners
filterAll.addEventListener('click', () => filterTasks('all'));
filterCompleted.addEventListener('click', () => filterTasks('completed'));
filterPending.addEventListener('click', () => filterTasks('pending'));

// Clear completed tasks
clearCompletedButton.addEventListener('click', () => {
    document.querySelectorAll('.task-item.completed').forEach(taskItem => {
        taskItem.classList.add('fade-exit');
        setTimeout(() => {
            taskItem.remove();
            saveTasks();
        }, 300);
    });
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
