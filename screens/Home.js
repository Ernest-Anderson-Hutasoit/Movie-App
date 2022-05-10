import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";

const Home = () => {
    const [upcomingMoviesImages, setUpcomingMoviesImages] = useState([]); //destructirung array
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
          setUpcomingMoviesImages(upcomingMoviesImagesArray);
        })
        .catch(err => {
          setError(err);
        });
    }, []);
    return (
        <View style={styles.sliderBoxContainer}>
            <SliderBox 
              images={upcomingMoviesImages} 
              autoplay={true} 
              circleLoop={true} 
              sliderBoxHeight={useWindowDimensions().height / 1} 
              dotStyle={styles.sliderBoxStyles}
            />
            {error && <Text style={{color: 'red'}}>Error In The Server</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
  sliderBoxContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderBoxStyles:{
    height: 0
  }
});

export default Home;