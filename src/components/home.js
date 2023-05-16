import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { Avatar, ThemeConsumer, Header } from "react-native-elements";
import Data from '../assets/data/swiper.json'
import theme from '../styles/themes';

const Home = ({ navigation }) => {
    const swiper = Data.swiper
    const avatar = Data.avatar
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={{ backgroundColor: "white" }}>

                        <Header
                            centerComponent={{ text: "Shopping", style: theme.homeStyles.header }}
                            placement='left'

                        />
                        <ScrollView>
                            <View style={{ top: 15, marginHorizontal:5, borderRadius:20, width:400 }}>
                                <FlatList
                                    data={swiper}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <Image source={{ uri: item.req }} style={{ height: 200, width: 400, borderRadius:20 , marginRight:5}} />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            
                            <View style={{ top: 35, height: 150 }}>
                                <Text style={theme.homeStyles.topText}> Top Selling </Text>
                                <FlatList
                                    data={avatar}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{ marginHorizontal: 8 , paddingLeft:10}}>
                                                <Avatar
                                                    rounded
                                                    source={{ uri: item.req }}
                                                    size={80}
                                                    avatarStyle={{ height: 100 }}
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
                                                            <Text style={{fontSize:20, color:"black", paddingLeft:10, fontWeight:"900"}}>{item.name}</Text>
                                                        </View>


                                                        <View style={{marginHorizontal:"10%", marginVertical:10,width:"80%", elevation:20,borderRadius:10}}>
                                                        <Image 
                                                        source={{ uri: item.req }} 
                                                        style={{ height: 140, width: "100%" , borderRadius:10}} 
                                                        
                                                        />
                                                        </View>


                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 100, }}>
                            </View>
                        </ScrollView>


                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default Home