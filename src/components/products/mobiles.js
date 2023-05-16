import React, { useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header } from "react-native-elements";
import Data from "../../assets/data/swiper.json"

const Mobiles = () => {

    const mobiles = Data.mobiles

    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={{ backgroundColor: "white" }}>
                        <Header
                            centerComponent={{ text: "Mobile Phones", style: theme.homeStyles.header }}
                            placement='left'
                            rightComponent={{ icon: "search" }}
                        />
                        <ScrollView>
                            <View style={{marginTop:30}}>
                                <FlatList
                                    data={mobiles}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <TouchableOpacity style={theme.mobileStyles.opacity}>
                                                    <Text style={theme.mobileStyles.text}>{item.name}</Text>
                                                </TouchableOpacity>
                                                <ImageBackground source={{ uri: item.req }} style={theme.mobileStyles.imageBackgroud} >
                                                </ImageBackground>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={{ marginTop: 100 }}>
                                </View>
                            </View>
                        </ScrollView>

                    </View>
            }
        </ThemeConsumer>
    )
}


export default Mobiles