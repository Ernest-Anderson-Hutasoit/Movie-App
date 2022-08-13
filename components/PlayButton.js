import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
    render() {
        const {handlePress} = this.props;
        return (
            <Pressable style={styles.button} onPress={() => handlePress()}>
                <Icon name='play' size={30} color='white' />
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#4481FC',
        alignContent:'center',
        borderRadius:50,
        width:50,
        padding:10,
    }
});

export default PlayButton;