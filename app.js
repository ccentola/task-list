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

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
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

// remove task
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {

        // ask to confirm delete
        if(confirm('Are you sure?')){

            // remove entire list element if confirmed
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear tasks
function clearTasks(e) {

    // remove items from the list as long as they exist
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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