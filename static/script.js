function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (message) {
        fetch('/send_message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        }).then(response => response.json())
          .then(data => {
              document.getElementById("messages").innerHTML = data.messages.map(msg => `<p>${msg}</p>`).join("");
              input.value = "";
          });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById("pendingTasksChart").getContext("2d");
    new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["High", "Medium", "Low"],
            datasets: [{
                label: "Pending Tasks",
                data: [5, 10, 7],
                backgroundColor: ["#e74c3c", "#f1c40f", "#2ecc71"]
            }]
        }
    });

    const ctx2 = document.getElementById("performanceChart").getContext("2d");
    new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Performance Trend",
                data: [10, 15, 20, 25, 30],
                borderColor: "#3498db",
                fill: false
            }]
        }
    });

    // Fetch messages when the page loads
    fetch('/get_messages')
        .then(response => response.json())
        .then(data => {
            document.getElementById("messages").innerHTML = data.map(msg => `<p>${msg}</p>`).join("");
        });
});
