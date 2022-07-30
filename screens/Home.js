import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { getFamilyMovies, getPopularMovies, getPopularTV, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';

const Home = () => {
  const [upcomingMoviesImages, setUpcomingMoviesImages] = useState([]); //destructirung array
  const [popularMovies, setPopularMovies] = useState(""); //destructirung array
  const [popularTv, setPopularTv] = useState(""); //destructirung array
  const [familyMovies, setFamilyMovies] = useState(""); //destructirung array
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
    getPopularTV()
      .then(movies => {
        setPopularTv(movies);
      })
      .catch(err => {
        setError(err);
      });
    getFamilyMovies()
      .then(movies => {
        setFamilyMovies(movies);
      })
      .catch(err => {
        setError(err);
      });
  }, []);
  return (
    <React.Fragment>
      <ScrollView>
        <View style={styles.sliderBoxContainer}>
          <SliderBox
            images={upcomingMoviesImages}
            autoplay={true}
            circleLoop={true}
            sliderBoxHeight={useWindowDimensions().height / 1.5}
            dotStyle={styles.sliderBoxStyles}
          />
          {error && <Text style={{ color: 'red' }}>Error In The Server</Text>}
        </View>
        <View style={styles.carousel}>
          <List title="Popular Movies" content={popularMovies}></List>
        </View>
        <View style={styles.carousel}>
          <List title="Popular Tv Shows" content={popularTv}></List>
        </View>
        <View style={styles.carousel}>
          <List title="Family Movies" content={familyMovies}></List>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderBoxStyles: {
    height: 0
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;