    // 001 - Initializing variables from html
    var form = document.getElementById('task_list');
    var dform = document.getElementById('dtask_list');
    //var taskButton = document.getElementById('addButton');
    var clearButton = document.getElementById('clearButton');
    var taskInput = document.querySelector('#buttons input');
    // 002 - Loading data from local storage or default
    var tasks = JSON.parse(localStorage.getItem('task_list')) || 'Example';
    var dtasks = JSON.parse(localStorage.getItem('dtask_list')) || [];
    // 003 - Functions
    var br = document.createElement('br');
    form.appendChild(br);

    function renderTasks() {
        form.innerHTML = '';
        dform.innerHTML = '';
        for (task of tasks) {
            var currentTask = document.createElement('label');
            currentTask.className = 'container';
            currentTask.appendChild(document.createTextNode(task));
            var currentTaskC = document.createElement('input');
            currentTaskC.type = 'checkbox';
            var currentTaskS = document.createElement('span');
            currentTaskS.className = 'checkmark';
            var pos = tasks.indexOf(task);
            currentTaskC.setAttribute('onclick', 'setTimeout(deleteTask(' + pos + '), 3000)');
            currentTask.appendChild(currentTaskC);
            currentTask.appendChild(currentTaskS);
            form.appendChild(currentTask);
        }
        if (dtasks && dtasks.length) {
            for (task of dtasks) {
                var currentTask = document.createElement('label');
                currentTask.className = 'container';
                currentTask.appendChild(document.createTextNode(task));
                var currentTaskC = document.createElement('input');
                currentTaskC.type = 'checkbox';
                currentTaskC.checked = 'checked';
                var currentTaskS = document.createElement('span');
                currentTaskS.className = 'checkmark';
                var pos = dtasks.indexOf(task);
                currentTaskC.setAttribute('onclick', 'setTimeout(restoreTask(' + pos + '), 3000)');
                currentTask.appendChild(currentTaskC);
                currentTask.appendChild(currentTaskS);
                dform.appendChild(currentTask);
            }
        }
    }

    function addTask() {
        var taskNew = taskInput.value;
        if (taskNew != '') {
            tasks.push(taskNew);
            taskInput.value = '';
            renderTasks();
            saveToStorage();
        }
    };

    function clearTask() {
        form.innerHTML = '';
        dform.innerHTML = '';
        tasks = [];
        dtasks = [];
        renderTasks();
        saveToStorage();
    };

    function deleteTask(pos) {
        dtasks.push(tasks[pos]);
        tasks.splice(pos, 1);
        renderTasks();
        saveToStorage();
    };

    function restoreTask(pos) {
        tasks.push(dtasks[pos]);
        dtasks.splice(pos, 1);
        renderTasks();
        saveToStorage();
    };

    taskInput.addEventListener("keypress", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            addTask();
        }
    });

    function saveToStorage() {
        localStorage.setItem('task_list', JSON.stringify(tasks));
        localStorage.setItem('dtask_list', JSON.stringify(dtasks));
    };

    renderTasks();
    //taskButton.onclick = addTask;
    clearButton.onclick = clearTask;