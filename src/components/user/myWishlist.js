import React, { useContext } from "react";
import { Text, View } from "react-native";
import AppContext from "../../shared/context";

const MyWishlist = () => {
    const {favourites} = useContext(AppContext)
    return(
        <View>
            {
                favourites.map((item) => {
                    return(
                        <View>
                            <Text style={{fontSize:40}}>{item.name}</Text>
                            </View>
                    )
                })
            }
        </View>
    )
}

export default MyWishlist