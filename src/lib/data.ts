import type { Movie, Showtime, Theater, Seat } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

const generateSeats = (rows: number, cols: number): Seat[][] => {
  const seats: Seat[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: Seat[] = [];
    const rowChar = String.fromCharCode(65 + i);
    for (let j = 0; j < cols; j++) {
      const isUnavailable = Math.random() < 0.15;
      row.push({
        id: `${rowChar}${j + 1}`,
        row: rowChar,
        number: j + 1,
        status: isUnavailable ? 'unavailable' : 'available',
      });
    }
    seats.push(row);
  }
  return seats;
};


export const movies: Movie[] = [
  {
    id: '1',
    title: 'Echoes of Nebula',
    tagline: 'The future is not what it seems.',
    overview: 'In a distant galaxy, a lone explorer discovers a secret that could unravel the fabric of the universe. Pursued by a relentless empire, she must forge an alliance with a band of outcasts to protect her discovery and save humanity.',
    releaseDate: '2024-10-25',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    runtime: 148,
    posterUrl: getImage('movie-1'),
    backdropUrl: getImage('backdrop-1'),
    rating: 8.5,
    cast: ['Aria Vance', 'Jax Orion', 'General Kael'],
  },
  {
    id: '2',
    title: 'The Last Stand',
    tagline: 'Courage is their only weapon.',
    overview: 'A small group of soldiers is left to defend a critical outpost against overwhelming odds. As their resources dwindle, they must rely on their wits, training, and each other to survive the final assault.',
    releaseDate: '2024-09-12',
    genres: ['War', 'Drama', 'Action'],
    runtime: 132,
    posterUrl: getImage('movie-2'),
    backdropUrl: getImage('backdrop-2'),
    rating: 7.9,
    cast: ['Sgt. Evan Ross', 'Lt. Maria Flores', 'Pvt. Cole Younger'],
  },
  {
    id: '3',
    title: 'City of Illusions',
    tagline: 'What you see is not what you get.',
    overview: 'A master illusionist gets entangled in a web of corporate espionage after one of his tricks exposes a high-level conspiracy. Now, he must use his skills of deception to stay one step ahead of those who want him silenced.',
    releaseDate: '2024-11-01',
    genres: ['Thriller', 'Mystery', 'Crime'],
    runtime: 115,
    posterUrl: getImage('movie-3'),
    backdropUrl: getImage('backdrop-3'),
    rating: 8.1,
    cast: ['Silas "The Phantom" Black', 'Detective Mia Stone', 'CEO Alistair Finch'],
  },
  {
    id: '4',
    title: 'The Whispering Woods',
    tagline: 'Some secrets are best left buried.',
    overview: 'A group of friends on a camping trip venture into a forest with a dark history. As night falls, they realize they are not alone, and the woods have a terrifying way of making old legends come to life.',
    releaseDate: '2024-08-30',
    genres: ['Horror', 'Supernatural', 'Thriller'],
    runtime: 96,
    posterUrl: getImage('movie-4'),
    backdropUrl: getImage('backdrop-1'),
    rating: 6.8,
    cast: ['Chloe', 'Ben', 'Maya', 'Liam'],
  },
  {
    id: '5',
    title: 'Chronicles of Glimmerfall',
    tagline: 'A little magic goes a long way.',
    overview: 'In a hidden world powered by magical crystals, a young inventor named Pip accidentally shatters the Heartstone, plunging his village into darkness. With his quirky robot sidekick, he embarks on a quest to find the legendary Sunpetal flowers to restore the light.',
    releaseDate: '2024-12-20',
    genres: ['Animation', 'Family', 'Fantasy'],
    runtime: 105,
    posterUrl: getImage('movie-5'),
    backdropUrl: getImage('backdrop-2'),
    rating: 8.9,
    cast: ['Pip', 'Bolt', 'Elder Bloom', 'Shadow Queen'],
  },
   {
    id: '6',
    title: 'Just One More Thing',
    tagline: 'His biggest case was his own life.',
    overview: 'A bumbling but brilliant detective, famous for his disheveled appearance and absent-minded nature, stumbles upon a seemingly simple case that spirals into a city-wide conspiracy, forcing him to confront his own past.',
    releaseDate: '2024-07-19',
    genres: ['Comedy', 'Mystery', 'Crime'],
    runtime: 122,
    posterUrl: getImage('movie-6'),
    backdropUrl: getImage('backdrop-3'),
    rating: 7.5,
    cast: ['Detective Frank Columbo Jr.', 'Nora Page', 'The Boss'],
  },
];

export const theaters: Theater[] = [
    { id: 't1', name: 'Cineplex Metropolis', address: '123 Movie Lane, Downtown' },
    { id: 't2', name: 'The Grand Cinema', address: '456 Film Ave, Uptown' },
    { id: 't3', name: 'Starlight Drive-In', address: '789 Reel Rd, Suburbia' },
];

export let showtimes: Showtime[] = [
    { id: 'st1', movieId: '1', theaterId: 't1', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(19, 0, 0, 0).valueOf().toString(), seats: generateSeats(8, 12), price: 15.00 },
    { id: 'st2', movieId: '1', theaterId: 't1', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(22, 0, 0, 0).valueOf().toString(), seats: generateSeats(8, 12), price: 15.00 },
    { id: 'st3', movieId: '1', theaterId: 't2', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(20, 0, 0, 0).valueOf().toString(), seats: generateSeats(10, 15), price: 16.50 },
    { id: 'st4', movieId: '2', theaterId: 't2', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(18, 30, 0, 0).valueOf().toString(), seats: generateSeats(10, 15), price: 16.50 },
    { id: 'st5', movieId: '2', theaterId: 't3', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(21, 0, 0, 0).valueOf().toString(), seats: generateSeats(5, 20), price: 12.00 },
    { id: 'st6', movieId: '3', theaterId: 't1', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(17, 0, 0, 0).valueOf().toString(), seats: generateSeats(8, 12), price: 15.00 },
    { id: 'st7', movieId: '3', theaterId: 't1', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(21, 30, 0, 0).valueOf().toString(), seats: generateSeats(8, 12), price: 15.00 },
    { id: 'st8', movieId: '4', theaterId: 't2', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(23, 0, 0, 0).valueOf().toString(), seats: generateSeats(10, 15), price: 16.50 },
    { id: 'st9', movieId: '5', theaterId: 't3', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(15, 0, 0, 0).valueOf().toString(), seats: generateSeats(5, 20), price: 12.00 },
    { id: 'st10', movieId: '6', theaterId: 't1', time: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(14, 0, 0, 0).valueOf().toString(), seats: generateSeats(8, 12), price: 15.00 },
];

export const getMovieById = (id: string) => movies.find(m => m.id === id);
export const getTheaterById = (id: string) => theaters.find(t => t.id === id);
export const getShowtimeById = (id: string) => showtimes.find(st => st.id === id);
export const getShowtimesForMovie = (movieId: string, date: string) => {
    return showtimes.filter(st => st.movieId === movieId);
};
