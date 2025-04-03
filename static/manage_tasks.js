document.addEventListener("DOMContentLoaded", function () {
    const taskModal = document.getElementById("taskModal");
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const closeBtn = document.querySelector(".close");
    
    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.name}</td>
                <td class="${task.status.toLowerCase()}">${task.status}</td>
                <td>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    window.editTask = function (index) {
        document.getElementById("taskName").value = tasks[index].name;
        document.getElementById("taskStatus").value = tasks[index].status;
        taskModal.style.display = "block";
        taskForm.onsubmit = function (event) {
            event.preventDefault();
            tasks[index] = {
                name: document.getElementById("taskName").value,
                status: document.getElementById("taskStatus").value
            };
            renderTasks();
            taskModal.style.display = "none";
        };
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskBtn.onclick = function () {
        taskModal.style.display = "block";
        taskForm.onsubmit = function (event) {
            event.preventDefault();
            let newTask = {
                name: document.getElementById("taskName").value,
                status: document.getElementById("taskStatus").value
            };
            tasks.push(newTask);
            renderTasks();
            taskModal.style.display = "none";
        };
    };

    closeBtn.onclick = function () {
        taskModal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
    };
});
