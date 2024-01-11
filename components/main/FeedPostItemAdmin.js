// PostItem.js

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet , ImageBackground, Dimensions} from "react-native";
import Swiper from "react-native-swiper";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { likeControl } from "../helper/posts";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const FeedPostItem = ({ post, index, navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const comments = useSelector((state) => state.user.comments[post.id]);
  const currentValue = new Animated.Value(1);

  function timeAgo(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const timeDifference = now - pastDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (hours > 0) {
      return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (minutes > 0) {
      return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else {
      return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
  }

  function postView(post, navigation, index) {
    return (
      <View style={styles.imageContainer} key={post._id}>
        {postHeader(navigation, post)}
        {imagesSwiper(post, index)}
        {iconsSection(index, post, navigation)}
        <View>
          {/* description */}
          {description(post)}
          {/* first comment */}
        </View>
      </View>
    );
  }

  function postHeader(navigation, post) {
    return (
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            navigation.navigate("searchUserProfileScreen", {
              user: users[post.userId],
            })
          }
        >
          <Image
            source={{ uri: String(users[post.userId]?.photo) }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.name}>{users[post.userId]?.name}</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.dateText}>{timeAgo(post.date)}</Text>
        </View>
        <TouchableOpacity style={styles.optionsIcon}>
            <SimpleLineIcons name="options-vertical" size={20} color={"black"}/>
        </TouchableOpacity>
      </View>
    );
  }

  function imagesSwiper(post, index) {
    return (
      <Swiper
        style={styles.imageSlider}
        loop={false}
        paginationStyle={styles.pagination}
      >
        {post.images.map((image) => (
          <MemoizedImage key={image} image={image} index={index} />
        ))}
      </Swiper>
    );
  }

  const MemoizedImage = React.memo(({ image, index }) => {
    return (
      <View style={styles.mainImage}>
        <ImageBackground
          source={{ uri: String(image), cache: "force-cache" }}
          style={styles.mainImage}
        >
        </ImageBackground>
      </View>
    );
  });

  function iconsSection(index, post, navigation) {
    return (
      <View style={styles.IconContainer}>
        
        {/* icon for toggoling add comment for a post */}
        <AntDesign
          name="message1"
          size={30}
          color="#bbbbbb"
          onPress={() => {
            navigation.navigate("Comments", { post: post });
          }}
          style={{ marginLeft: 10 }}
        />
      </View>
    );
  }

  const description = (post) => {
    if (!post?.description) {
      return;
    }
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{post.description}</Text>
      </View>
    );
  };

    return postView(post, navigation, index);
}

export default FeedPostItem

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        borderTopWidth: 0.5,
        marginBottom: 3,
      },
      profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      commentProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      profileInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: Dimensions.get("window").width * 0.05,	
        flex: 1,
      },
      IconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
      },
      name: {
        fontWeight: "bold",
      },
      imageSlider: {
        height: Dimensions.get("window").height / 2,
      },
      pagination: {
        bottom: 0,
      },
      mainImage: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
        alignItems: "center",
        justifyContent: "center",
      },
      commentButton: {
        alignItems: "center",
        padding: 3,
      },
      commentButtonText: {
        color: "#007AFF",
      },
      separator: {
        borderBottomWidth: 0.5,
        borderBottomColor: "black",
      },
      commentSection: {
        flexDirection: "row",
        padding: 5,
      },
      ImageProfileComment: {
        flexDirection: "row",
        alignItems: "top",
      },
      commentRight: {
        flexDirection: "column",
        alignItems: "flex-start",
        flex: 1,
      },
      nameComment: {
        fontWeight: "bold",
        marginRight: 10,
      },
      commentText: {
        fontWeight: "normal",
        marginRight: 20,
      },
      dateText: {
        color: "gray",
        fontSize: 12,
      },
      descriptionContainer: {
        padding: 10,
      },
      descriptionText: {
        fontSize: 15,
      },
    
      touchable: {
        flexDirection: "row",
        alignItems: "center",
      },
    
      likesCount: {
        marginLeft: 5,
        marginRight: 4,
        fontWeight: "bold",
      },

      optionsIcon:{
        width: Dimensions.get("window").width * 0.05,
        height: Dimensions.get("window").height * 0.05,	
        alignItems: "center",
        justifyContent: "center",
        marginRight: Dimensions.get('window').width * 0.015,
      }

});



