'use server';

import { revalidatePath } from 'next/cache';
import { showtimes } from './data';
import type { Booking } from '@/types';

let bookings: Booking[] = [];

export async function bookTickets(showtimeId: string, seatIds: string[]): Promise<{ success: boolean; message?: string; bookingId?: string }> {
    
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
    
    await new Promise(res => setTimeout(res, 1000));
    
    seatIds.forEach(seatId => {
        const seatRow = seatId.charAt(0);
        const seatNumber = parseInt(seatId.substring(1), 10);
        const rowIndex = seatRow.charCodeAt(0) - 65;
        const colIndex = seatNumber - 1;
        
        if (showtimes[showtimeIndex].seats[rowIndex]?.[colIndex]) {
            showtimes[showtimeIndex].seats[rowIndex][colIndex].status = 'unavailable';
        }
    });

    const newBooking: Booking = {
        id: `B${Date.now()}`,
        userId: 'user123',
        showtimeId: showtimeId,
        seats: seatIds.map(id => ({ row: id.charAt(0), number: parseInt(id.substring(1)) })),
        totalPrice: seatIds.length * showtime.price,
        bookingTime: new Date().toISOString(),
    };
    bookings.push(newBooking);

    revalidatePath(`/book/${showtimeId}`);
    
    return { success: true, bookingId: newBooking.id };
}

export async function getBookingById(bookingId: string) {
    return bookings.find(b => b.id === bookingId);
}
