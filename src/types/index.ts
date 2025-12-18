export type Movie = {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  releaseDate: string;
  genres: string[];
  runtime: number;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  cast: string[];
};

export type Theater = {
  id: string;
  name: string;
  address: string;
};

export type SeatStatus = 'available' | 'selected' | 'unavailable';

export type Seat = {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
};

export type Showtime = {
  id:string;
  movieId: string;
  theaterId: string;
  time: string;
  seats: Seat[][];
  price: number;
};

export type Booking = {
    id: string;
    userId: string;
    showtimeId: string;
    seats: { row: string, number: number }[];
    totalPrice: number;
    bookingTime: string;
}
