import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { getFamilyMovies, getPopularMovies, getPopularTV, getUpcomingMovies } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';

const Home = ({navigation}) => {
  const [upcomingMovies, setUpcomingMovies] = useState(); //destructuring array
  const [popularMovies, setPopularMovies] = useState(); //destructuring array
  const [popularTv, setPopularTv] = useState(); //destructuring array
  const [familyMovies, setFamilyMovies] = useState(); //destructuring array
  const [error, setError] = useState(false); //destructuring array
  const [isLoaded, setLoaded] = useState(false); //destructuring array
  const window = useWindowDimensions();

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getFamilyMovies()
    ]);
  };

  /*
    useEffect() usefull in managing state in react
    second parameter in useEffect() -> interval request data from api source
  */
  useEffect(() => {
    getData()
      .then(([upcomingMoviesData, popularMoviesData, popularTvData, familyMoviesData]) => {
        const upcomingMoviesArray = [];
        upcomingMoviesData.forEach(movie => {
          upcomingMoviesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
        });
        setUpcomingMovies(upcomingMoviesArray);
        setPopularMovies(popularMoviesData);
        setPopularTv(popularTvData);
        setFamilyMovies(familyMoviesData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return(
    <React.Fragment>
      {isLoaded && !error && (
        <ScrollView>
          {upcomingMovies && (
            <View style={styles.sliderBoxContainer}>
              <SliderBox
                images={upcomingMovies}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={window.height / 1.5}
                dotStyle={styles.sliderBoxStyles}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular Movies" content={popularMovies}></List>
            </View>
          )}
          
          {popularTv && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Popular Tv Shows" content={popularTv}></List>
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title="Family Movies" content={familyMovies}></List>
            </View>
          )}
        </ScrollView>
      )}
      {!isLoaded && (<ActivityIndicator size="large" color="#0000ff" />)}
      {error && <Error />}
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