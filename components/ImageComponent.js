import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';

const ImageCompenent = ({ post, navigation, profile }) => {
    if (!post) {
        console.log("No posts");
        return null;
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ViewPost', { post : post, profile : profile })}>
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
};

export default ImageCompenent;
