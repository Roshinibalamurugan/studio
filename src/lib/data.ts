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
    title: 'Vikram',
    tagline: 'A high-octane action thriller.',
    overview: 'A special investigator discovers a case of serial killings is not what it seems, and leading down this path is a syndicate of drug lords.',
    releaseDate: '2022-06-03',
    genres: ['Action', 'Thriller'],
    runtime: 175,
    posterUrl: getImage('movie-1'),
    backdropUrl: getImage('backdrop-1'),
    rating: 8.4,
    cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
  },
  {
    id: '2',
    title: 'Kaithi',
    tagline: 'An ex-convict tries to meet his daughter for the first time.',
    overview: 'An ex-convict, Dilli, tries to meet his daughter for the first time after leaving prison. However, his attempts are interrupted by a drug raid planned by Inspector Bejoy.',
    releaseDate: '2019-10-25',
    genres: ['Action', 'Thriller'],
    runtime: 145,
    posterUrl: getImage('movie-2'),
    backdropUrl: getImage('backdrop-2'),
    rating: 8.5,
    cast: ['Karthi', 'Narain', 'Arjun Das'],
  },
  {
    id: '3',
    title: 'Soorarai Pottru',
    tagline: 'A story of a man who dreamt of making the common man fly.',
    overview: 'Maara, a man from a remote village, dreams of launching his own airline service. However, he must overcome several obstacles and challenges in order to be successful in his quest.',
    releaseDate: '2020-11-12',
    genres: ['Drama'],
    runtime: 153,
    posterUrl: getImage('movie-3'),
    backdropUrl: getImage('backdrop-3'),
    rating: 8.7,
    cast: ['Suriya', 'Aparna Balamurali', 'Paresh Rawal'],
  },
  {
    id: '4',
    title: '96',
    tagline: 'A nostalgic journey of love.',
    overview: 'Two high school sweethearts from the batch of 1996 meet at a reunion, 22 years after they parted.',
    releaseDate: '2018-10-04',
    genres: ['Romance', 'Drama'],
    runtime: 158,
    posterUrl: getImage('movie-4'),
    backdropUrl: getImage('backdrop-1'),
    rating: 8.6,
    cast: ['Vijay Sethupathi', 'Trisha Krishnan', 'Devadarshini'],
  },
  {
    id: '5',
    title: 'Asuran',
    tagline: 'A farmer from a lower caste clashes with a wealthy landlord.',
    overview: 'A farmer from an underprivileged caste, in a fit of rage, kills a wealthy landlord from an upper caste. Will the farmer, a loving father and a pacifist by nature, be able to save his hot-headed son who is on a killing spree?',
    releaseDate: '2019-10-04',
    genres: ['Action', 'Drama'],
    runtime: 141,
    posterUrl: getImage('movie-5'),
    backdropUrl: getImage('backdrop-2'),
    rating: 8.5,
    cast: ['Dhanush', 'Manju Warrier', 'Prakash Raj'],
  },
   {
    id: '6',
    title: 'Ratsasan',
    tagline: 'A psycho killer is on the loose, and a rookie cop tries to solve the case.',
    overview: 'A wannabe filmmaker becomes a police officer after his father\'s death and sets out to track down a serial killer who is murdering school girls.',
    releaseDate: '2018-10-05',
    genres: ['Crime', 'Thriller', 'Horror'],
    runtime: 170,
    posterUrl: getImage('movie-6'),
    backdropUrl: getImage('backdrop-3'),
    rating: 8.5,
    cast: ['Vishnu Vishal', 'Amala Paul', 'Saravanan'],
  },
  {
    id: '7',
    title: 'Mankatha',
    tagline: 'A crooked cop, a master plan, and a game of greed.',
    overview: 'A suspended cop gets involved in a risky heist of cricket betting money, leading to a cat-and-mouse game with his partners and the police.',
    releaseDate: '2011-08-31',
    genres: ['Action', 'Crime', 'Thriller'],
    runtime: 155,
    posterUrl: getImage('movie-7'),
    backdropUrl: getImage('backdrop-4'),
    rating: 7.6,
    cast: ['Ajith Kumar', 'Arjun Sarja', 'Trisha Krishnan'],
  },
  {
    id: '8',
    title: 'Thuppakki',
    tagline: 'An army captain is on a mission to deactivate a sleeper cell.',
    overview: 'An army captain on vacation in Mumbai discovers and foils a terrorist plot, leading to a race against time to save the city.',
    releaseDate: '2012-11-13',
    genres: ['Action', 'Thriller'],
    runtime: 165,
    posterUrl: getImage('movie-8'),
    backdropUrl: getImage('backdrop-5'),
    rating: 8.0,
    cast: ['Vijay', 'Kajal Aggarwal', 'Vidyut Jammwal'],
  },
  {
    id: '9',
    title: 'Kaththi',
    tagline: 'One man\'s fight against corporate exploitation.',
    overview: 'A petty thief impersonates his lookalike, a social activist, to fight a corporate giant that is exploiting farmers.',
    releaseDate: '2014-10-22',
    genres: ['Action', 'Drama'],
    runtime: 166,
    posterUrl: getImage('movie-9'),
    backdropUrl: getImage('backdrop-6'),
    rating: 8.0,
    cast: ['Vijay', 'Samantha Ruth Prabhu', 'Neil Nitin Mukesh'],
  },
  {
    id: '10',
    title: 'Master',
    tagline: 'An alcoholic professor is sent to a juvenile school.',
    overview: 'An alcoholic professor is sent to a juvenile school, where he clashes with a ruthless gangster who uses the children for criminal activities.',
    releaseDate: '2021-01-13',
    genres: ['Action', 'Thriller'],
    runtime: 179,
    posterUrl: getImage('movie-10'),
    backdropUrl: getImage('backdrop-1'),
    rating: 7.8,
    cast: ['Vijay', 'Vijay Sethupathi', 'Malavika Mohanan'],
  },
  {
    id: '11',
    title: 'Mersal',
    tagline: 'A magician and a doctor attempt to expose corruption in the medical industry.',
    overview: 'A magician and a doctor with a shared past team up to expose corruption in the medical field and seek revenge for a personal tragedy.',
    releaseDate: '2017-10-18',
    genres: ['Action', 'Thriller'],
    runtime: 172,
    posterUrl: getImage('movie-11'),
    backdropUrl: getImage('backdrop-2'),
    rating: 7.8,
    cast: ['Vijay', 'S. J. Suryah', 'Kajal Aggarwal'],
  },
  {
    id: '12',
    title: 'Bigil',
    tagline: 'A former football player coaches a women\'s team to fulfill his dream.',
    overview: 'A former football player is forced to coach a women\'s football team and deals with the challenges they face, both on and off the field.',
    releaseDate: '2019-10-25',
    genres: ['Action', 'Drama', 'Sport'],
    runtime: 179,
    posterUrl: getImage('movie-12'),
    backdropUrl: getImage('backdrop-3'),
    rating: 7.0,
    cast: ['Vijay', 'Nayanthara', 'Jackie Shroff'],
  },
  {
    id: '13',
    title: 'Enthiran',
    tagline: 'A scientist creates a robot that develops human emotions.',
    overview: 'A brilliant scientist creates a sophisticated android robot to protect mankind, but things go awry when human emotions are programmed and the robot falls in love.',
    releaseDate: '2010-10-01',
    genres: ['Action', 'Sci-Fi'],
    runtime: 177,
    posterUrl: getImage('movie-13'),
    backdropUrl: getImage('backdrop-4'),
    rating: 7.1,
    cast: ['Rajinikanth', 'Aishwarya Rai Bachchan', 'Danny Denzongpa'],
  },
  {
    id: '14',
    title: 'Sivaji: The Boss',
    tagline: 'A software architect returns to India to serve the nation.',
    overview: 'A successful software architect returns to India with the dream of providing free education and healthcare, but he must fight a corrupt system to achieve his goal.',
    releaseDate: '2007-06-15',
    genres: ['Action', 'Masala'],
    runtime: 185,
    posterUrl: getImage('movie-14'),
    backdropUrl: getImage('backdrop-5'),
    rating: 7.5,
    cast: ['Rajinikanth', 'Shriya Saran', 'Suman'],
  },
  {
    id: '15',
    title: 'Anniyan',
    tagline: 'A man with multiple personality disorder takes on corruption.',
    overview: 'A law-abiding citizen who is frustrated with corruption develops multiple personality disorder and takes it upon himself to punish the wrongdoers.',
    releaseDate: '2005-06-17',
    genres: ['Action', 'Thriller', 'Psychological'],
    runtime: 181,
    posterUrl: getImage('movie-15'),
    backdropUrl: getImage('backdrop-6'),
    rating: 8.3,
    cast: ['Vikram', 'Sada', 'Prakash Raj'],
  },
  {
    id: '16',
    title: 'Vada Chennai',
    tagline: 'A skilled carrom player becomes a pawn in a gang war.',
    overview: 'A young carrom player in North Chennai gets reluctantly drawn into a world of crime and politics, and must fight to survive in a bloody gang war.',
    releaseDate: '2018-10-17',
    genres: ['Action', 'Crime', 'Drama'],
    runtime: 166,
    posterUrl: getImage('movie-16'),
    backdropUrl: getImage('backdrop-1'),
    rating: 8.5,
    cast: ['Dhanush', 'Ameer', 'Andrea Jeremiah'],
  }
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

    