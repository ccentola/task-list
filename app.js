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

    // dom content load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        // add a class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
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
    });
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

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = ''

    // prevent defualt action
    e.preventDefault();
}

// store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
} 

// remove task
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {

        // ask to confirm delete
        if(confirm('Are you sure?')){

            // remove entire list element if confirmed
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e) {

    // remove items from the list as long as they exist
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from ls
    clearTasksFromLocalStorage();
}

// clear tasks from ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
    
    // capture whatever is being typed in
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        // if item is in filter...
        if(item.toLowerCase().indexOf(text) != -1){
            
            // display item
            task.style.display = 'block';

        } else {
            
            // hide item
            task.style.display = 'none';
        }
    })
}