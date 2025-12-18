import { getBookingsByUserId } from '@/lib/actions';
import { getShowtimeById, getMovieById, getTheaterById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, MapPin, Calendar, Clock, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// This is a server component, but we need to get the user ID to fetch bookings.
// In a real app with server-side auth helpers, you'd get the session here.
// For this example, we'll assume a way to get the current user, or we'll have to make this a client component.
// To keep it simple, we'll need a client component wrapper to get the user.
import { BookingsClientPage } from './client-page';

export default function BookingsPage() {
  return <BookingsClientPage />;
}
