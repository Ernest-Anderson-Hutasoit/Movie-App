import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({onClose, navigation}) => {
    return(
        <VideoPlayer
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            onBack={onClose}
            onEnd={() =>onClose()}
            // fullscreenOrientation='all'
            // navigator={navigation}
        />
    );
}

export default Video;