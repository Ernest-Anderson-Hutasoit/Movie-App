import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Card } from "@rneui/themed";

class Card extends React.PureComponent {
    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity style={styles.containerCard}>
                <Image 
                    style={styles.cardMovies} 
                    resizeMode="cover" 
                    source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}>
                </Image>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    containerCard:{
        padding:5,
        position:"relative"
    },
    cardMovies:{
        height:200,
        width:120,
        borderRadius:20
    }
});

export default Card;