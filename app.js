// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// define load event listeners function
function loadEventListeners() {
    // add task event
    form.addEventListener('submit', addTask);
}

// add task
function addTask(e) {
    
    // if no task is entered, alert to add a task
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // clear input
    taskInput.value = ''

    // prevent defualt action
    e.preventDefault();
}