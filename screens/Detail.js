import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getMovie } from "../services/services";

const Detail = ({route, navigation}) => {
    const {movie} = route.params;
    const [moviesDetail, setMoviesDetail] = useState(); //destructuring array
    const [error, setError] = useState(false); //destructuring array
    const [isLoaded, setLoaded] = useState(false); //destructuring array

    const getData = () => {
        return Promise.all([
            getMovie(movie.id),
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
    }, [movie.id]);

    return (
        <React.Fragment>
            {isLoaded && (
                <View>
                    <Text>{movie.title}</Text>
                    <Text>{moviesDetail.title}</Text>
                    <Text>{moviesDetail.status}</Text>
                    <Text>{moviesDetail.tagline}</Text>
                </View>
            )}
        </React.Fragment>
    );
}

export default Detail;