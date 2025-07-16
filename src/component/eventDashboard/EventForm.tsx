'use client'
import { useEventContext } from '../../context/EventContext';
import './EventForm.css';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';
import { EventData, EventFormProps, EventFormValues } from '../../types/eventType';

dayjs.extend(isBetween);


const categoryOptions = ['Workshop','Webinar','Meetup']

const EventForm: React.FC<EventFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    defaultValues,
  });
  const { events } = useEventContext();
  const watchEventType = watch('eventType', defaultValues?.eventType || 'Online');

  return (
    <div className="event-form-overlay">
    <div className="event-form-container">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register('title', { required: 'Title is required' })} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Description</label>
          <input {...register('description', { required: 'Description is required' })} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Event Type</label>
          <select {...register('eventType', { required: 'Event Type is required' })}>
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
          </select>
          {errors.eventType && <p>{errors.eventType.message}</p>}
        </div>

        {watchEventType === 'Online' ? (
          <div>
            <label>Event Link</label>
            <input {...register('eventLink', { required: 'Event link is required',
              pattern: {
                value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                message: 'Enter a valid URL',
              },
            })} />
            {errors.eventLink && <p>{errors.eventLink.message}</p>}
          </div>
        ) : (
          <div>
            <label>Location</label>
            <input {...register('location', { required: 'Location is required' })} />
            {errors.location && <p>{errors.location.message}</p>}
          </div>
        )}

        <div>
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            {...register('startDateTime', { required: 'Start date is required',
              
             })}
          />
          {errors.startDateTime && <p>{errors.startDateTime.message}</p>}
        </div>

        <div>
          <label>End Date & Time</label>
          <input
            type="datetime-local"
            {...register('endDateTime', 
              { required: 'End date is required',
                validate: {
                  isAfterStart: (endVal) => {
                    const startVal = watch('startDateTime');
                    if (!startVal) return true;
                    return dayjs(endVal).isAfter(dayjs(startVal)) || 'End date must be after start date';
                  },
                  noOverlap: (endVal) => {
                    const startVal = watch('startDateTime');
                    if (!startVal) return true;
            
                    const newStart = dayjs(startVal);
                    const newEnd = dayjs(endVal);
                    // to find the overlapping event
                    const hasConflict = events.some((e) => {
                      // exclude the current event while editing
                      if ((defaultValues as EventData)?.id && e.id === (defaultValues as EventData)?.id) return false; 
                      const existingStart = dayjs(e.startDateTime);
                      const existingEnd = dayjs(e.endDateTime);
            
                      return newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart);
                    });
            
                    return !hasConflict || 'This event overlaps with another existing event';
                  },
                }
              }
            )}
          />
          {errors.endDateTime && <p>{errors.endDateTime.message}</p>}
        </div>

        <div>
          <label>Category</label>
          <select {...register('category', { required: 'Category is required' })}>
            {categoryOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EventForm;
