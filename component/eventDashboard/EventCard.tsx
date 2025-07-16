"use client"
import Link from 'next/link';
import './EventCard.css';
import { EventCardProps } from '../../types/eventType';



const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-card">
      <div className="event-header">
        <h3>{event.title}</h3>
        <span>{new Date(event.startDateTime).toLocaleString()} → {new Date(event.endDateTime).toLocaleTimeString()}</span>
        {(onEdit || onDelete) && (
        <div className="event-card-actions">
          {onEdit && <button onClick={() => onEdit(event.id)}>Edit</button>}
          {onDelete && <button onClick={() => onDelete(event.id)}>Delete</button>}
        </div>
      )}
      </div>

      <div className="event-info">
        <div className="event-meta">
        <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Organizer:</strong> {event.organizer}</p>
        </div>
        <div className="event-meta">
        <p><strong>Type:</strong> {event.eventType}</p>
          <p>
            <strong>{event.eventType === 'Online' ? 'Link:' : 'Location:'}</strong>{' '}
            {event.eventType === 'Online' ? <a href={event.eventLink} target="_blank" rel="noopener noreferrer">{event.eventLink} </a> : event.location}
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default EventCard;
