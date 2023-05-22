import React from 'react';
import { View,FlatList, Image } from "react-native";
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
                            centerComponent={{ text: "Deals/Offers", style: theme.dealsStyles.header }}
                            placement='center'
                            leftComponent={{ icon: "chevron-left", size: 32, color:"white",onPress: () => navigation.goBack() }}
                            
                            
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