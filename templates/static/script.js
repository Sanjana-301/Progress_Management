// Chat System
function sendMessage() {
    let message = document.getElementById("chatInput").value;
    if (message) {
        let chatBox = document.getElementById("chatBox");
        let newMessage = document.createElement("p");
        newMessage.textContent = message;
        chatBox.appendChild(newMessage);
        document.getElementById("chatInput").value = "";
    }
}

// Task Management
function addTask() {
    let taskList = document.getElementById("taskList");
    let newTask = document.createElement("li");
    newTask.textContent = "New Task " + (taskList.children.length + 1);
    taskList.appendChild(newTask);
}
