import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=81f8aa857b23824f4e7842a70791d1db';

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return resp.data.results;
}

// Get Popular Movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    return resp.data.results;
}

// Get Popular Tv Shows
export const getPopularTV = async () => {
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return resp.data.results;
}

// Get Popular Family Movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`);
    return resp.data.results;
}