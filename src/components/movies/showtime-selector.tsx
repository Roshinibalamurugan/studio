'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { theaters, getTheaterById } from '@/lib/data';
import type { Showtime } from '@/types';
import { format } from 'date-fns';

type ShowtimeSelectorProps = {
  showtimes: Showtime[];
};

export default function ShowtimeSelector({ showtimes: initialShowtimes }: ShowtimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);

  useEffect(() => {
      const today = new Date();
      const updatedShowtimes = initialShowtimes.map(st => {
          const [hours, minutes] = st.time.split(':').map(Number);
          const time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes).valueOf().toString();
          return {
              ...st,
              time
          }
      })
      setShowtimes(updatedShowtimes);

  }, [initialShowtimes])

  const showtimesByTheater = showtimes.reduce((acc, showtime) => {
    const theaterId = showtime.theaterId;
    if (!acc[theaterId]) {
      acc[theaterId] = [];
    }
    acc[theaterId].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  const theaterIds = Object.keys(showtimesByTheater);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold tracking-tight mb-6 text-center font-headline">Book Your Tickets</h2>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {theaterIds.length > 0 ? (
          theaterIds.map((theaterId) => {
            const theater = getTheaterById(theaterId);
            if (!theater) return null;
            
            return (
              <Card key={theaterId} className="bg-secondary/30">
                <CardHeader>
                  <CardTitle className="font-headline">{theater.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{theater.address}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {showtimesByTheater[theaterId].map((showtime) => (
                      <Button key={showtime.id} asChild variant="outline" className="bg-background hover:bg-accent hover:border-primary/50">
                        <Link href={`/book/${showtime.id}`}>
                          {showtime.time ? format(new Date(parseInt(showtime.time)), 'p') : ''}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-10 text-muted-foreground bg-secondary/30 rounded-lg">
            <p>No showtimes available for the selected date.</p>
          </div>
        )}
      </div>
    </div>
  );
}
