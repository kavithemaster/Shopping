import React from 'react';
import { View,Image} from "react-native";
import { ThemeConsumer, Header, Text } from "react-native-elements"
const Deals = () => {
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.dealsStyles.mainContainer}>
                        <Header
                            centerComponent={{ text: "Deals/Offers", style: theme.dealsStyles.header }}
                            placement='center'
                            leftComponent={{ icon: "chevron-left", size: 32, color: "white"}}                    
                        />
                        <View style={theme.dealsStyles.textContain}>
                            <Text style={theme.dealsStyles.text}>
                                Currently No offer's are avaliable please get back it later
                            </Text>
                        </View>
                        <View style={theme.dealsStyles.imageContain}>
                            <Image
                                source={{ uri: "https://i.pinimg.com/originals/15/28/ff/1528ff0a9c3f25683e3ca120155c9540.gif" }}
                                style={theme.dealsStyles.imageStyle}
                                testID="deals-image"
                            />
                        </View>
                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default Deals