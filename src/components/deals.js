import React from 'react';
import { View, Text, FlatList, Image } from "react-native";
import { ThemeConsumer, Header } from "react-native-elements";
import Data from '../assets/data/swiper.json'

const Deals = ({ navigation }) => {
    const offers = Data.offers
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.dealsStyles.mainContainer}>
                        <Header
                            centerComponent={{ text: "Delas/Offers", style: theme.dealsStyles.header }}
                            placement='left'
                            
                        />
                        <View style={theme.dealsStyles.swiper}>
                            <FlatList
                                data={offers}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <Image source={{ uri: item.req }} style={theme.dealsStyles.swiperImage} />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default Deals