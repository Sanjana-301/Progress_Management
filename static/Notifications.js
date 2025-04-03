import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on("send_notification", (data) => {
            setNotifications((prev) => [...prev, data.notification]);
        });

        return () => {
            socket.off("send_notification");
        };
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
