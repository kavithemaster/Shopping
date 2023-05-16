import React, { useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header } from "react-native-elements";
import Data from "../../assets/data/swiper.json"

const Grocery = () => {

    const grocery = Data.grocery

    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={{backgroundColor:"white"}} >

                        <Header
                            centerComponent={{ text: "Grocery", style: theme.electronicStyles.header }}
                            placement='left'
                            rightComponent={{ icon: "search" }}
                        />

                        <ScrollView>
                            <View style={{ marginTop: 30 }}>
                                <FlatList
                                    data={grocery}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <TouchableOpacity style={theme.groceryStyles.opacity}>
                                                    <Text style={theme.groceryStyles.text}>{item.name}</Text>
                                                </TouchableOpacity>
                                                <ImageBackground source={{ uri: item.req }} style={theme.groceryStyles.imageBackgroud} >
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



export default Grocery