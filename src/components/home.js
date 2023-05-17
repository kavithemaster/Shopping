import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView} from "react-native";
import { Avatar, ThemeConsumer, Header } from "react-native-elements";
import Data from '../assets/data/swiper.json'

const Home = ({ navigation }) => {
    const swiper = Data.swiper
    const avatar = Data.avatar
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.homeStyles.mainContainer}>

                        <Header
                            centerComponent={{ text: "Shopping", style: theme.homeStyles.header }}
                            placement='left'
                        />
                        
                        <ScrollView>
                            <View style={theme.homeStyles.swiper}>
                                <FlatList
                                    data={swiper}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <Image source={{ uri: item.req }} style={theme.homeStyles.swiperImage} />
                                            </View>
                                        )
                                    }}
                                />
                            </View>

                            <View style={theme.homeStyles.avatarContain}>
                                <Text style={theme.homeStyles.topText}> Top Selling </Text>
                                <FlatList
                                    data={avatar}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
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


                            <View >
                                <FlatList
                                    data={swiper}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <View>
                                                    <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
                                                        <View>
                                                            <Text style={theme.homeStyles.nameText}>{item.name}</Text>
                                                        </View>


                                                        <View style={theme.homeStyles.imageContain}>
                                                            <Image
                                                                source={{ uri: item.req }}
                                                                style={theme.homeStyles.image}

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