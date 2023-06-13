import React, { useEffect, useState } from "react";
import { Text, View, ScrollView , Image} from "react-native";
import { Header, ThemeConsumer } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MyOrders = ({navigation}) => {

    //Geting values from fireBase 
    const [orderData, setOrderData] = useState([])

    // Code for values grrting fro firebase by using key
    const getOrderData = async () => {
        const key = await AsyncStorage.getItem("userKey")
        // const res = await axios.get(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/orders.json`)
        const res = await axios.get(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}/orders.json`)
        let data = res.data
        let keys = Object.keys(res.data)
        let temp = []
        keys.map((k) => {
            let item = data[k].order
            temp.push(item[0])

        })
        setOrderData([...temp])
    }

    // Using useEffect for getting data from firebase
    useEffect(() => {
        getOrderData()
    }, [])

    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View>
                        <Header
                            centerComponent={{
                                text: "My Orders",
                                style: theme.MyOrders.headerCenter
                            }}
                            leftComponent={{ icon: "chevron-left", size: 32, color:"white",onPress: () => navigation.goBack() , testID:'iconLeft'}}
                        />
                        <View>
                            <ScrollView>
                                {
                                    orderData.length ? orderData.map((item, index) => {

                                        return (
                                            <View
                                                key={index}
                                                style={theme.MyOrders.mainContainer}>


                                                <View >
                                                    <Image source={{ uri: item.uri[0] }} style={theme.MyOrders.image} testID='img' />
                                                </View>

                                                <View style={theme.MyOrders.nameContain}>
                                                    <Text style={theme.MyOrders.nameText}  testID='name'>
                                                        {item.name}
                                                    </Text>
                                                </View>

                                                <View style={theme.MyOrders.cart}>
                                                    <View>
                                                        <Text style={theme.MyOrders.amountText} testID='amount'>
                                                            Rs.{item.amount}
                                                        </Text>
                                                    </View>
                                                </View>

                                            </View>
                                        )

                                    }) : null
                                }
                                <View style={{marginTop:200}}>

                                </View>
                            </ScrollView>

                        </View>
                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default MyOrders