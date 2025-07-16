export interface EventData {
    id: string;
    title: string;
    description: string;
    eventType: 'Online' | 'In-Person';
    location?: string;
    eventLink?: string;
    startDateTime: string;
    endDateTime: string;
    category: string;
    organizer: string;
  }
  
export interface EventCardProps {
    event: EventData;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
  }

export interface EventFormValues {
    title: string;
    description: string;
    eventType: 'Online' | 'In-Person';
    eventLink?: string;
    location?: string;
    startDateTime: string;
    endDateTime: string;
    category: string;
  }
  
export interface EventFormProps {
    defaultValues?: Partial<EventFormValues>;
    onSubmit: (data: EventFormValues) => void;
    onCancel: () => void;
  }
  
export interface EventContextType {
    events: EventData[];
    addEvent: (event: Omit<EventData, 'id' | 'organizer'>) => void;
    updateEvent: (id: string, updated: Omit<EventData, 'id' | 'organizer'>) => void;
    deleteEvent: (id: string) => void;
    setEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
  }