import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

const MyOrders = () => {

    const orderUpdate = async () => {
        const key = await AsyncStorage.getItem("userKey")
        const res =  await axios.delete(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`) 
        console.log(res.data);
    }
    return(
        <View style={{flex:1}}>
            <Text>SignIn Page</Text>
            <Button title="Click" onpress={orderUpdate}
            buttonStyle={{top:15, height:60, width:120, alignSelf:"center", justifyContent:"center"}}
            />
        </View>
    )
}

export default MyOrders