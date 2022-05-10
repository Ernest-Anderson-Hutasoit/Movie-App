import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";

const Home = () => {
    const [upcomingMoviesImages, setUpcomingMoviesImages] = useState(''); //destructirung array
    const [error, setError] = useState(false); //destructuring array
  
    /*
      useEffect() usefull in managing state in react
      second parameter in useEffect() -> interval request data from api source
    */
    useEffect(() => {
      getUpcomingMovies()
        .then(movies => {
          const upcomingMoviesImagesArray = [];
          movies.forEach(movie => {
            upcomingMoviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
          })
          setUpcomingMoviesImages(upcomingMoviesImagesArray)
        })
        .catch(err => {
          setError(err);
        });
        
      getPopularMovies()
        .then(movies => {
          setMovie(movies[0])
        })
        .catch(err => {
          setError(err);
      });
    }, []);
    return (
        <View>
            <SliderBox images={upcomingMoviesImages} />
            {error && <Text style={{color: 'red'}}>Error In The Server</Text>}
        </View>
    );
}

export default Home;