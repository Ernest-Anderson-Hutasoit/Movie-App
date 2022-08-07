import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

// This is for debug
const propTypes={
    errorTextOne:PropTypes.string,
    errorTextTwo:PropTypes.string
}

const defaultProps={
    errorTextOne:"Oops! something went wrong",
    errorTextTwo:"Make sure you are online and restart the application"
}

class Error extends React.PureComponent {
    render() {
        const {errorTextOne, errorTextTwo} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{errorTextOne}</Text>
                <Text style={styles.text}>{errorTextTwo}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        color:"black",
    }
})

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;