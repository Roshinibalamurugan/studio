
'use server';

import { revalidatePath } from 'next/cache';
import { showtimes } from './data';
import type { Booking } from '@/types';
import { initializeFirebase } from '@/firebase';
import { collection, doc, getDoc, getDocs, setDoc, query, where, orderBy } from 'firebase/firestore';


export async function bookTickets(showtimeId: string, seatIds: string[], userId: string): Promise<{ success: boolean; message?: string; bookingId?: string }> {
    
    if (!userId) {
        return { success: false, message: 'You must be logged in to book tickets.' };
    }

    const { firestore } = initializeFirebase();

    const showtimeIndex = showtimes.findIndex(st => st.id === showtimeId);
    if (showtimeIndex === -1) {
        return { success: false, message: 'Showtime not found.' };
    }

    const showtime = showtimes[showtimeIndex];

    // This is still in-memory seat checking. For a real app, this should be a transaction.
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

    const bookingId = `B${Date.now()}`;
    const newBooking: Booking = {
        id: bookingId,
        userId: userId,
        showtimeId: showtimeId,
        seats: seatIds.map(id => ({ row: id.charAt(0), number: parseInt(id.substring(1)) })),
        totalPrice: seatIds.length * showtime.price,
        bookingTime: new Date().toISOString(),
    };

    try {
        const bookingRef = doc(firestore, 'users', userId, 'bookings', bookingId);
        await setDoc(bookingRef, newBooking);
    } catch (error) {
        console.error("Firestore booking error: ", error);
        return { success: false, message: 'Could not save your booking. Please try again.' };
    }
    

    revalidatePath(`/book/${showtimeId}`);
    revalidatePath('/bookings');
    
    return { success: true, bookingId: newBooking.id };
}

export async function getBookingById(bookingId: string, userId: string) {
    if (!userId) return null;
    const { firestore } = initializeFirebase();
    const docRef = doc(firestore, "users", userId, "bookings", bookingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Booking;
    } else {
        // This might happen if a user tries to access a booking that isn't theirs.
        // We could query all user bookings, but that is less secure and efficient.
        // For now, we return null if not found under the current user.
        return null;
    }
}

export async function getBookingsByUserId(userId: string) {
    if (!userId) return [];
    
    const { firestore } = initializeFirebase();
    const userBookingsCol = collection(firestore, 'users', userId, 'bookings');
    const q = query(userBookingsCol, orderBy('bookingTime', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
        bookings.push(doc.data() as Booking);
    });
    
    return bookings;
}
