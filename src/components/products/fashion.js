import React, { useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header } from "react-native-elements";
import Data from "../../assets/data/swiper.json"

const Fashion = () => {

    const fashion = Data.fashion

    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View  style={{backgroundColor:"white"}}>

                        <Header
                            centerComponent={{ text: "Electronics", style: theme.electronicStyles.header }}
                            placement='left'
                            rightComponent={{ icon: "search" }}
                        />

                        <ScrollView>
                            <View style={{ marginTop: 30 }}>
                                <FlatList
                                    data={fashion}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <TouchableOpacity style={theme.fashionStyles.opacity}>
                                                    <Text style={theme.fashionStyles.text}>{item.name}</Text>
                                                </TouchableOpacity>
                                                <ImageBackground source={{ uri: item.req }} style={theme.fashionStyles.imageBackgroud} >
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


export default Fashion