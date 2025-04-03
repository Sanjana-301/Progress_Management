document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskModal = document.getElementById("task-modal");
    const closeModal = document.querySelector(".close");
    const saveTask = document.getElementById("save-task");
    const taskTitle = document.getElementById("task-title");
    const taskStatus = document.getElementById("task-status");

    // Open Task Modal
    addTaskBtn.addEventListener("click", () => {
        taskModal.style.display = "block";
    });

    // Close Task Modal
    closeModal.addEventListener("click", () => {
        taskModal.style.display = "none";
    });

    // Add New Task
    saveTask.addEventListener("click", () => {
        const title = taskTitle.value.trim();
        const status = taskStatus.value;

        if (title === "") {
            alert("Task title cannot be empty!");
            return;
        }

        // Create Task Card
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.textContent = title;

        // Append to the correct column
        document.getElementById(status).querySelector(".task-list").appendChild(taskCard);

        // Close Modal
        taskModal.style.display = "none";
        taskTitle.value = "";
    });

    // Drag and Drop Feature
    document.querySelectorAll(".task-list").forEach((list) => {
        list.addEventListener("dragover", (e) => e.preventDefault());
        list.addEventListener("drop", function (e) {
            const taskId = e.dataTransfer.getData("text");
            const task = document.getElementById(taskId);
            this.appendChild(task);
        });
    });

    document.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("task-card")) {
            e.dataTransfer.setData("text", e.target.id);
        }
    });
});
