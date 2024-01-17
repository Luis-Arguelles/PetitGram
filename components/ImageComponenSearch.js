import React from 'react';
import {View, Dimensions, Image, TouchableOpacity } from 'react-native';

const ImageComponentSearch = ({ post, navigation, profile }) => {

    if (!post) {
        return null;
    }
    return (

        <TouchableOpacity onPress={() => navigation.navigate('ViewPostSearch', { post : post, profile : profile })}>
            <Image
                source={{uri: String(post.images[0])}}
                style={{
                    borderColor: 'black',
                    borderWidth: 0.5,
                    width: Dimensions.get('window').width / 3 ,
                    height: (((Dimensions.get('window').height /10)*6)/3.31)
                }}
            />
        </TouchableOpacity>
    );
}

export default ImageComponentSearch;
