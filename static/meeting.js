import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Meetings = () => {
    const [events, setEvents] = useState([]);

    const handleDateClick = (info) => {
        const title = prompt("Enter Meeting Title");
        if (title) {
            setEvents([...events, { title, start: info.date, allDay: true }]);
        }
    };

    return (
        <div>
            <h2>Meeting Scheduler</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                events={events}
            />
        </div>
    );
};

export default Meetings;
