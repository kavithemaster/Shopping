import React from "react";
import { View } from "react-native";
import { Image, ThemeConsumer } from "react-native-elements";

const Splash = () => {
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.splashStyles.mainContainer} 
                    testID="splashTest"
                    >
                        <Image
                            style={theme.splashStyles.image}
                            source={{ uri: "https://static.wixstatic.com/media/570bfa_4a131be813c04e1591243a9343e353bb~mv2.gif" }} 
                            testID="splashjest"/>
                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default Splash