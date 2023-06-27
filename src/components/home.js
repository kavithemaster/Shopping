import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, ThemeConsumer, Header } from "react-native-elements";
import Data from '../assets/data/swiper.json'
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

const navigation = useNavigation()

    // Getting values from json
    const swiper = Data.swiper
    const avatar = Data.avatar
    const scroll = Data.scroll
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.homeStyles.mainContainer}
                     testID='homeTest'
                    >
                        <Header
                            centerComponent={{ text: "Shopping", style: theme.homeStyles.header }}
                            placement='left'
                        />
                        <ScrollView>
                            <View testID='swiper-container' style={theme.homeStyles.swiper}>
                                <Swiper containerStyle={{ height: 250 }} autoplay={true} loop={true} >
                                    {
                                        scroll.map((item, ind) => {
                                            return (
                                                <View key={ind} >
                                                    <Image source={{ uri: item.req }} style={theme.homeStyles.swiperImage} />
                                                </View>
                                            )
                                        })
                                    }
                                </Swiper>
                            </View>
                            <View style={theme.homeStyles.avatarContain}>
                                <Text style={theme.homeStyles.topText}> Top Selling </Text>
                                <FlatList
                                    data={avatar}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    testID='avatar-container'
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={theme.homeStyles.avatarView}>
                                                <Avatar
                                                    rounded
                                                    source={{ uri: item.req }}
                                                    size={80}
                                                    avatarStyle={theme.homeStyles.avatar}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View testID='swiperTest' >
                                <FlatList
                                    data={swiper}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    testID='newone'
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <View>
                                                    <TouchableOpacity onPress={() => navigation.navigate(item.name)} testID='productsTest'>
                                                        <View>
                                                            <Text style={theme.homeStyles.nameText} >{item.name}</Text>
                                                        </View>
                                                        <View style={theme.homeStyles.imageContain}>
                                                            <Image
                                                                source={{ uri: item.req }}
                                                                style={theme.homeStyles.image}
                                                                testID='swiperImgJest'
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={theme.homeStyles.gap}>
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default Home