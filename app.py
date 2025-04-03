from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import random
import datetime

app = Flask(__name__)
socketio = SocketIO(app)

# Sample Data for Dashboard
tasks = [
    {"id": 1, "title": "Fix login bug", "priority": "High", "status": "Pending"},
    {"id": 2, "title": "Design new UI", "priority": "Medium", "status": "In Progress"},
    {"id": 3, "title": "Optimize database queries", "priority": "Low", "status": "Completed"}
]

notifications = [
    {"id": 1, "type": "Mention", "message": "@john You have a meeting at 3 PM", "time": "1 hour ago"},
    {"id": 2, "type": "Project Update", "message": "New task assigned to you", "time": "2 hours ago"},
    {"id": 3, "type": "Deadline", "message": "Project submission due tomorrow", "time": "1 day ago"}
]

chat_rooms = {}  # Stores active chat rooms
users = {}  # Stores connected users


# -------------- ROUTES --------------

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', tasks=tasks, notifications=notifications)

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/tasks')
def manage_tasks():
    return render_template('tasks.html', tasks=tasks)

@app.route('/notifications')
def get_notifications():
    return jsonify(notifications)


# -------------- CHAT SYSTEM --------------

@socketio.on('message')
def handle_message(msg):
    print(f"Received message: {msg}")
    send(msg, broadcast=True)

@socketio.on('join')
def handle_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    if room not in chat_rooms:
        chat_rooms[room] = []
    chat_rooms[room].append(username)
    emit('room_users', {"room": room, "users": chat_rooms[room]}, room=room)
    send(f"{username} has joined the room {room}", room=room)

@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    if room in chat_rooms and username in chat_rooms[room]:
        chat_rooms[room].remove(username)
    emit('room_users', {"room": room, "users": chat_rooms[room]}, room=room)
    send(f"{username} has left the room {room}", room=room)


# -------------- TASK MANAGEMENT --------------

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = {
        "id": random.randint(10, 1000),
        "title": data["title"],
        "priority": data["priority"],
        "status": "Pending"
    }
    tasks.append(new_task)
    return jsonify({"message": "Task added successfully!", "task": new_task})


@app.route('/update_task/<int:task_id>', methods=['POST'])
def update_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["status"] = "Completed"
            return jsonify({"message": "Task updated!"})
    return jsonify({"message": "Task not found"}), 404


# -------------- MEETING SCHEDULING --------------

@app.route('/schedule_meeting', methods=['POST'])
def schedule_meeting():
    data = request.get_json()
    meeting_info = {
        "meeting_id": random.randint(1000, 9999),
        "title": data["title"],
        "time": data["time"],
        "room": data["room"],
        "participants": data["participants"]
    }
    notifications.append({
        "id": len(notifications) + 1,
        "type": "Meeting Reminder",
        "message": f"Meeting '{data['title']}' scheduled at {data['time']} in room {data['room']}",
        "time": datetime.datetime.now().strftime("%H:%M")
    })
    return jsonify({"message": "Meeting scheduled successfully!", "meeting": meeting_info})


if __name__ == '__main__':
    socketio.run(app, debug=True)
