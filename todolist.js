var taskList = document.querySelector("#app ul");
var taskInput = document.querySelector("#app input");
var taskButton = document.querySelector("#app button");

var tasks = JSON.parse(localStorage.getItem('task_list')) || 'Example';


function renderTasks() {
    taskList.innerHTML = '';
    for (task of tasks) {
        var itask = document.createElement('li');
        var itaskText = document.createTextNode(task);
        var iexclude = document.createElement('a');
        iexclude.setAttribute('href', '#');
        var iexcludeText = document.createTextNode('Exclude');
        var pos = tasks.indexOf(task);
        iexclude.setAttribute('onclick', 'deleteTask(' + pos + ')');

        itask.appendChild(itaskText);
        taskList.appendChild(itask);
        iexclude.appendChild(iexcludeText);
        itask.appendChild(iexclude);
    }
}

renderTasks();

function addTask() {
    var taskNew = taskInput.value;

    tasks.push(taskNew);
    taskInput.value = '';
    renderTasks();
    saveToStorage();
}
taskInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        addTask();
    }
});

function deleteTask(pos) {
    tasks.splice(pos, 1);
    renderTasks();
    saveToStorage();
};

function saveToStorage() {
    localStorage.setItem('task_list', JSON.stringify(tasks));
};