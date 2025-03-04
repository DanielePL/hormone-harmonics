
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Plus, Sparkles } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import GlassCard from '../ui/GlassCard';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'workout' | 'nutrition' | 'hormone' | 'health';
  completed: boolean;
}

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  
  // Sample events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Full-body Workout',
      date: new Date(),
      type: 'workout',
      completed: false
    },
    {
      id: '2',
      title: 'Track Hormones',
      date: addDays(new Date(), 1),
      type: 'hormone',
      completed: false
    },
    {
      id: '3',
      title: 'Meal Prep',
      date: addDays(new Date(), 2),
      type: 'nutrition',
      completed: true
    },
    {
      id: '4',
      title: 'Blood Test',
      date: addDays(new Date(), 5),
      type: 'health',
      completed: false
    },
  ]);

  // Selected day's events
  const selectedDayEvents = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'workout': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'nutrition': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'hormone': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      case 'health': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Get event type label
  const getEventTypeLabel = (type: string) => {
    switch(type) {
      case 'workout': return 'Workout';
      case 'nutrition': return 'Nutrition';
      case 'hormone': return 'Hormone';
      case 'health': return 'Health';
      default: return 'Event';
    }
  };

  // Toggle event completion
  const toggleEventCompletion = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-8/12">
          <AnimatedCard>
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-indigo-50 dark:from-rose-950/20 dark:to-indigo-950/20 pb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full shadow-sm">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl tracking-tight">Health Calendar</CardTitle>
                    <CardDescription className="mt-1 text-base">
                      Track your plan and progress
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    {date ? format(date, 'MMMM yyyy') : 'Select a date'}
                  </h2>
                  <Select value={view} onValueChange={(value: 'month' | 'week') => setView(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
        
        <div className="w-full md:w-4/12 space-y-6">
          <GlassCard className="p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {date ? format(date, 'EEEE, MMMM d') : 'No date selected'}
              </h2>
              <Button size="sm" variant="ghost" className="px-2 flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </Button>
            </div>
            
            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`p-3 rounded-lg ${event.completed ? 'bg-primary/5' : 'bg-card'} border transition-all`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <Badge variant="outline" className={`${getEventTypeColor(event.type)} mb-2`}>
                          {getEventTypeLabel(event.type)}
                        </Badge>
                        <h3 className={`font-medium ${event.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {event.title}
                        </h3>
                      </div>
                      <Button 
                        variant={event.completed ? "outline" : "default"} 
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => toggleEventCompletion(event.id)}
                      >
                        {event.completed ? 'Completed' : 'Complete'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No events for this day</p>
                <Button className="mt-4 cta-button gap-2" size="sm">
                  <Plus className="h-4 w-4" /> Add Event
                </Button>
              </div>
            )}
          </GlassCard>
          
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <CardTitle className="text-base tracking-tight">Upcoming</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {events.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(event.date, 'EEE, MMM d')}
                      </p>
                    </div>
                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
