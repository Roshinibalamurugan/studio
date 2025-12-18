
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { Showtime, Seat, Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import { useUser, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';

type SeatSelectionProps = {
  showtime: Showtime;
};

const SeatComponent = ({ seat, onSelect, isSelected }: { seat: Seat, onSelect: (seat: Seat) => void, isSelected: boolean }) => {
  const getSeatClass = () => {
    if (seat.status === 'unavailable') return 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed';
    if (isSelected) return 'bg-primary text-primary-foreground hover:bg-primary/90';
    return 'bg-secondary hover:bg-accent';
  };
  
  const handleSelect = () => {
    if (seat.status === 'available') {
      onSelect(seat);
    }
  }

  return (
    <button
      onClick={handleSelect}
      disabled={seat.status === 'unavailable'}
      className={`w-7 h-7 md:w-9 md:h-9 rounded-md flex items-center justify-center text-xs font-semibold transition-colors duration-200 ${getSeatClass()}`}
      aria-label={`Seat ${seat.row}${seat.number}`}
    >
      {seat.number}
    </button>
  );
};

export default function SeatSelection({ showtime }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats(prev => {
      const isAlreadySelected = prev.find(s => s.id === seat.id);
      if (isAlreadySelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const totalPrice = (selectedSeats.length * showtime.price).toFixed(2);

  const handleBooking = async () => {
    if (!user || !firestore) {
        toast({
            title: "Authentication Required",
            description: "Please log in to book tickets.",
            variant: "destructive",
        });
        router.push('/login');
        return;
    }
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to proceed.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const bookingId = `B${Date.now()}`;
      const newBooking: Booking = {
          id: bookingId,
          userId: user.uid,
          showtimeId: showtime.id,
          seats: selectedSeats.map(s => ({ row: s.row, number: s.number })),
          totalPrice: parseFloat(totalPrice),
          bookingTime: new Date().toISOString(),
          paymentReference: `PAY${Date.now()}`
      };

      const bookingRef = doc(firestore, 'users', user.uid, 'bookings', bookingId);
      
      // Use non-blocking write
      setDocumentNonBlocking(bookingRef, newBooking, {});

      toast({
          title: "Booking Successful!",
          description: "Redirecting to confirmation page...",
      });
      // Optimistically navigate
      router.push(`/confirm/${bookingId}`);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            title: "Booking Failed",
            description: errorMessage,
            variant: "destructive",
        });
        setIsSubmitting(false);
        // We should re-fetch showtime data to get latest seat availability
        router.refresh();
    }
  };

  const LoginPromptDialog = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="w-full" disabled={isSubmitting || selectedSeats.length === 0}>
          {isSubmitting ? 'Processing...' : `Pay $${totalPrice}`}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log in to continue</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to book tickets. Please log in or create an account to proceed with your booking.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href="/login">Log In</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="grid lg:grid-cols-[1fr,320px] gap-8">
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="p-4 bg-muted/50 rounded-lg text-center mb-6">
            <div className="w-full h-2 bg-gray-300 rounded-full mb-2" />
            <p className="text-sm text-muted-foreground tracking-widest">SCREEN</p>
          </div>
          <div className="flex flex-col items-center gap-2 overflow-x-auto pb-4">
            {showtime.seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2">
                <span className="w-6 text-center text-sm font-medium text-muted-foreground">{row[0].row}</span>
                <div className="flex gap-2">
                  {row.map(seat => (
                    <SeatComponent
                      key={seat.id}
                      seat={seat}
                      onSelect={handleSeatSelect}
                      isSelected={!!selectedSeats.find(s => s.id === seat.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-wrap gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-secondary border"></div><span>Available</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-primary"></div><span>Selected</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600"></div><span>Unavailable</span></div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Ticket className="w-6 h-6" />
                    Booking Summary
                </CardTitle>
                <CardDescription>Review your selections before confirming.</CardDescription>
            </CardHeader>
            <CardContent>
                {selectedSeats.length > 0 ? (
                    <>
                        <p className="font-semibold mb-2">Selected Seats:</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedSeats.sort((a,b) => a.id.localeCompare(b.id)).map(seat => (
                                <span key={seat.id} className="font-mono bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm">{seat.id}</span>
                            ))}
                        </div>
                        <div className="flex justify-between items-center border-t pt-4">
                            <p className="text-lg font-semibold">Total Price:</p>
                            <p className="text-2xl font-bold font-mono text-primary">${totalPrice}</p>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>Select seats to see your summary.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 { isUserLoading ? 
                    <Button size="lg" className="w-full" disabled><div className="h-5 w-20 bg-muted-foreground/50 rounded-md animate-pulse" /></Button> :
                   user ? (
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={handleBooking}
                      disabled={isSubmitting || selectedSeats.length === 0}
                    >
                      {isSubmitting ? 'Processing...' : `Pay $${totalPrice}`}
                    </Button>
                   ) : (
                    <LoginPromptDialog />
                   )
                 }
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
