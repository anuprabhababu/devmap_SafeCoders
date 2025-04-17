// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

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
    taskItem.className = `task-item ${completed ? 'completed' : ''}`;

    // Task text
    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text';
    taskTextElement.textContent = taskText;

    // Action buttons
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    // Complete button
    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn';
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    // Append buttons to actions
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    // Append elements to task item
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(taskActions);

    // Append task item to the list
    taskList.appendChild(taskItem);
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

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
