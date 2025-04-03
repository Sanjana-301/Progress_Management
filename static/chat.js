document.addEventListener("DOMContentLoaded", function () {
    const socket = io();

    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const typingStatus = document.getElementById("typing-status");
    const prioritySelect = document.getElementById("priority");

    // Handle sending messages
    sendButton.addEventListener("click", function () {
        const message = messageInput.value.trim();
        const priority = prioritySelect.value;

        if (message !== "") {
            socket.emit("send_message", { message, priority });
            messageInput.value = "";
        }
    });

    // Highlight @mentions in messages
    function formatMessage(message) {
        return message.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    }

    // Receive messages from the server
    socket.on("receive_message", function (data) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", data.priority);

        messageElement.innerHTML = `
            <strong>${data.user}:</strong> ${formatMessage(data.message)}
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    });

    // Typing indicator
    messageInput.addEventListener("input", function () {
        socket.emit("typing");
    });

    socket.on("user_typing", function (user) {
        typingStatus.textContent = `${user} is typing...`;
        setTimeout(() => (typingStatus.textContent = ""), 2000);
    });

    // Search messages
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.key === "f") {
            event.preventDefault();
            const searchTerm = prompt("Enter keyword to search:");
            if (searchTerm) {
                highlightMessages(searchTerm);
            }
        }
    });

    function highlightMessages(keyword) {
        const messages = document.querySelectorAll(".message");
        messages.forEach(msg => {
            if (msg.textContent.includes(keyword)) {
                msg.classList.add("highlight");
            } else {
                msg.classList.remove("highlight");
            }
        });
    }
});
