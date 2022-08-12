import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, ScrollView, StyleSheet, useWindowDimensions, Image } from "react-native";
import { getMovie } from "../services/services";
import StarRating from 'react-native-star-rating';
import dateFormat from "dateformat";

const Detail = ({route, navigation}) => {
    const {movieId} = route.params;
    const [moviesDetail, setMoviesDetail] = useState(); //destructuring array
    const [error, setError] = useState(false); //destructuring array
    const [isLoaded, setLoaded] = useState(false); //destructuring array
    const { styles } = useStyle(); //destructuring object

    const getData = () => {
        return Promise.all([
            getMovie(movieId),
        ]);
      };
    
    /*
        useEffect() usefull in managing state in react
        second parameter in useEffect() -> interval request data from api source
    */
    useEffect(() => {
        getData()
            .then(([moviesDetailData]) => {
                setMoviesDetail(moviesDetailData);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoaded(true);
            })
    }, [movieId]);

    return (
        <React.Fragment>
            {isLoaded && !error && (
                <ScrollView>
                    <Image
                        style={styles.posterMovies}
                        resizeMode="cover"
                        source={moviesDetail.poster_path 
                            ? {uri: 'https://image.tmdb.org/t/p/w500' + moviesDetail.poster_path}
                            : require('../assets/images/placeholder.png')}>
                    </Image>
                    {/* {!moviesDetail.poster_path && <Text style={styles.moviesTitle}>{moviesDetail.title}</Text>} */}
                    <View style={styles.container}>
                        <Text style={styles.moviesTitle}>{moviesDetail.title}</Text>
                        {moviesDetail.genres && (
                            <View style={styles.genresContainer}>
                                {moviesDetail.genres.map((genre) => {
                                    return(<Text key={genre.id} style={styles.genre}>{genre.name}</Text>);
                                })}
                            </View>  
                        )}
                        <StarRating 
                            disabled={true} 
                            fullStarColor={"gold"} 
                            maxStars={5} 
                            rating={moviesDetail.vote_average / 2}
                            starSize={30}
                        />
                        <Text style={styles.overview}>{moviesDetail.overview}</Text>
                        <Text style={styles.releaseDate}>{'Release Date: ' + dateFormat(moviesDetail.release_date, 'dd mmmm yyyy')}</Text>
                    </View>
                </ScrollView>
            )}
            {!isLoaded && (<ActivityIndicator size="large" color="#0000ff" />)}
        </React.Fragment>
    );
}

const useStyle = () =>{
    // const dimensions = useWindowDimensions();
    const {height, width} = useWindowDimensions(); //destructuring object

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            marginTop:20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        moviesTitle:{
            // position:'absolute',
            fontSize:24,
            fontWeight:"bold",
            alignSelf:"flex-start",
            color:"black",
            marginTop:10,
            marginBottom:10,
            paddingLeft:40
        },
        genresContainer:{
            flexDirection:"row",
            alignContent:"center",
            // justifyContent: 'center',
            marginTop:20,
            marginBottom:20
        },
        genre:{
            marginRight:10,
            fontWeight:"bold"
        },
        posterMovies:{
            // height:dimensions.height,
            height:height / 2.5,
            // width:dimensions.width,
            // width:width,
        },
        overview:{
            padding:15,
        },
        releaseDate:{
            color:"black",
            fontWeight:"bold"
        }
      });

    return {styles};
}

export default Detail;