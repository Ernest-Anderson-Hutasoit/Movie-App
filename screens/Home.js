import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import { getPopularMovies, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";

const Home = () => {
    const [upcomingMoviesImages, setUpcomingMoviesImages] = useState([]); //destructirung array
    const [popularMovies, setPopularMovies] = useState(""); //destructirung array
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
      getPopularMovies()
        .then(movies => {
          setPopularMovies(movies);
        })
        .catch(err => {
          setError(err);
        });
    }, []);
    return (
        <React.Fragment>
          <View style={styles.sliderBoxContainer}>
            <SliderBox 
              images={upcomingMoviesImages} 
              autoplay={true} 
              circleLoop={true} 
              sliderBoxHeight={useWindowDimensions().height / 1.5} 
              dotStyle={styles.sliderBoxStyles}
            />
            {error && <Text style={{color: 'red'}}>Error In The Server</Text>}
          </View>
          <View style={styles.carousel}>
            <FlatList 
              data={popularMovies}
              horizontal={true}
              renderItem={({item}) => <Text>{item.title}</Text>}
            >
            </FlatList>
          </View>
        </React.Fragment>
        
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
  },
  carousel:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;