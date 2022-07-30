import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

// const placeholderImages = require('../assets/images/placeholder.png');
// This is for debug
const propTypes={
    item:PropTypes.object
}

class Card extends React.PureComponent {
    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity style={styles.containerCard}>
                <Image 
                    style={styles.cardMovies} 
                    resizeMode="cover" 
                    source={item.poster_path 
                        ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
                        : require('../assets/images/placeholder.png')}>
                </Image>
                {!item.poster_path && <Text style={styles.moviesTitle}>{item.title}</Text>}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containerCard:{
        padding:5,
        position:'relative',
        alignItems:'center',
        //justifyContent:'center',
        height:210,
        //backgroundColor:'red'
    },
    cardMovies:{
        height:200,
        width:120,
        borderRadius:20
    },
    moviesTitle:{
        position:'absolute',
        textAlign:'center',
        width:100, // Kurang dari width cardMovies
        top:5
    }
});

export default Card;