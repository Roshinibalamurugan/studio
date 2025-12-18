
'use server';

import { revalidatePath } from 'next/cache';
import { showtimes } from './data';
import type { Booking } from '@/types';
// Firebase logic will be moved to client components. This file will be simplified.


// This function is now simplified as the core logic is moved to the client.
// It could be removed if all logic is on the client, but we'll keep the shell.
// The primary booking logic now lives in the SeatSelection component.
export async function bookTickets(showtimeId: string, seatIds: string[], userId: string): Promise<{ success: boolean; message?: string; bookingId?: string }> {
    
    // The in-memory update logic for optimistic UI remains, but Firestore logic is gone.
    const showtimeIndex = showtimes.findIndex(st => st.id === showtimeId);
    if (showtimeIndex === -1) {
        return { success: false, message: 'Showtime not found.' };
    }

    const showtime = showtimes[showtimeIndex];

    for (const seatId of seatIds) {
        const seatRow = seatId.charAt(0);
        const seatNumber = parseInt(seatId.substring(1));
        const seat = showtime.seats.flat().find(s => s.row === seatRow && s.number === seatNumber);
        
        if (!seat || seat.status === 'unavailable') {
            return { success: false, message: `Seat ${seatId} is no longer available. Please select different seats.` };
        }
    }

    seatIds.forEach(seatId => {
        const seatRow = seatId.charAt(0);
        const seatNumber = parseInt(seatId.substring(1), 10);
        const rowIndex = seatRow.charCodeAt(0) - 65;
        const colIndex = seatNumber - 1;
        
        if (showtimes[showtimeIndex].seats[rowIndex]?.[colIndex]) {
            showtimes[showtimeIndex].seats[rowIndex][colIndex].status = 'unavailable';
        }
    });
    
    // The booking ID will now be generated on the client, but we can simulate success.
    const bookingId = `B${Date.now()}`;

    revalidatePath(`/book/${showtimeId}`);
    revalidatePath('/bookings');
    
    // This action no longer creates the booking in Firestore.
    // It just validates and returns a success-like message. The client does the write.
    return { success: true, bookingId: bookingId };
}

// These functions are no longer needed as they are handled client-side.
// They are removed to avoid confusion and further errors.
// export async function getBookingById(bookingId: string, userId: string) {}
// export async function getBookingsByUserId(userId: string) {}

