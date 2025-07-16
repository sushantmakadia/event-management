"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { LocalStorageService } from '../utils/localStorage';
import { EventContextType, EventData } from '../types/eventType';

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const {user} = useAuth();
  const {getDecrypted,setEncrypted} = LocalStorageService;

  useEffect(() => {
    const stored = getDecrypted('events');
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  useEffect(() => {
    setEncrypted('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<EventData, 'id' | 'organizer'>) => {
    setEvents(prev => [...prev, { ...event, id: crypto.randomUUID(),organizer: user?.username as string}]);
  };

  const updateEvent = (id: string, updated: Omit<EventData, 'id' | 'organizer'>) => {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, ...updated } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEventContext must be used within EventProvider');
  return context;
};
