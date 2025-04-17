// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Function to add a task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.className = 'task-item';

        // Append the task to the list
        taskList.appendChild(taskItem);

        // Clear the input
        taskInput.value = '';
    }
});