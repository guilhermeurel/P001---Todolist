// 001 - Initializing variables from html
var taskList = document.querySelector('#list ul');
var buttons = document.querySelector('#buttons');
var taskButton = document.createElement('button');
taskButton.setAttribute('type', 'Text');
taskButton.value = 'Add';
var taskInput = document.createElement('input');
taskInput.setAttribute('type', 'Text');
taskInput.placeholder = 'New task';
// 002 - Loading data from local storage or default
var tasks = JSON.parse(localStorage.getItem('task_list')) || 'Example';
// 003 - Functions
function renderTasks() {
    taskList.innerHTML = '';
    for (task of tasks) {
        // Creating task elements
        var itask = document.createElement('li');
        var itaskText = document.createTextNode(task);
        var iexclude = document.createElement('a');
        iexclude.setAttribute('href', '#');
        var iexcludeText = document.createTextNode('Exclude');
        var pos = tasks.indexOf(task);
        iexclude.setAttribute('onclick', 'deleteTask(' + pos + ')');
        // Creating task
        itask.appendChild(itaskText);
        taskList.appendChild(itask);
        iexclude.appendChild(iexcludeText);
        itask.appendChild(iexclude);
    }
}

function addTask() {
    var taskNew = taskInput.value;

    tasks.push(taskNew);
    taskInput.value = '';
    renderTasks();
    saveToStorage();
};

function deleteTask(pos) {
    tasks.splice(pos, 1);
    renderTasks();
    saveToStorage();
};
taskInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        addTask();
    }
});

function saveToStorage() {
    localStorage.setItem('task_list', JSON.stringify(tasks));
};
// 004 - Script
renderTasks();
buttons.appendChild(taskInput);
buttons.appendChild(taskButton);