import React, { useContext, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons"
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import AppContext from "../shared/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment"
import { ActivityIndicator } from "react-native-paper";

const MyCart = ({ navigation }) => {

    const { cart, setCart } = useContext(AppContext)

    useEffect(() => {
        if(cart.length)
            addToCart()
    },[cart])

    useEffect(() => {
        getCartData()
    },[])

    const getCartData = async () => {

        const key = await AsyncStorage.getItem("userKey")
        const res = await axios.get(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)
        let temp = []
        temp.push(res.data.cart[0])
        setCart(temp)

    }

    const addToCart = async () => {

        const key = await AsyncStorage.getItem("userKey")

        const res = await axios.put(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`, {cart})

        getCartData()
    }

    const removeProduct = (name) => {
        let temp = []
        cart.map((item) => {
            if (item.name != name) {
                temp.push(item)
            }
        })
        setCart([...temp])
    }

    const updateCount = (item) => {
        let temp = []
        cart.map((prod) => {
            if(prod.name == item.name) {
                temp.push(item)
            }
            else {
                temp.push(prod)
            }
        })
        setCart([...temp])
    }

 

    const placeOrder = async () => {
        const key = await AsyncStorage.getItem("userKey")
        const del = await axios.delete(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)
        let orders = {}
        orders['order'] = cart
        orders['time'] = Moment(new Date()).format('dddd MMMM D, y - h:mm a')
        const res = await axios.post(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/orders.json`, orders)
    }

    
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View>
                        <Header
                            centerComponent={{
                                text: "My Carts",
                                style: theme.myCartStyles.headerCenter

                            }}
                            leftComponent={{ icon: "chevron-left", size: 32, onPress: () => navigation.goBack() }}
                            rightComponent={cart.length ? { icon: "check", size: 32, onPress: () => placeOrder() } : null}
                        />
                        {
                            cart.length ?
                                <ScrollView >
                                    {
                                        cart.length ? cart.map((item, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={theme.myCartStyles.mainContainer}>


                                                    <View >
                                                        <Image source={{ uri: item.uri[0] }} style={theme.myCartStyles.image} />
                                                    </View>

                                                    <View style={theme.myCartStyles.nameContain}>
                                                        <Text style={theme.myCartStyles.nameText} >
                                                            {item.name}
                                                        </Text>
                                                    </View>

                                                    <View style={theme.myCartStyles.cart}>

                                                        <View >
                                                            <Icons name="minus" size={30} onPress={() => {
                                                                let temp = item
                                                                if(item.count - 1 > 0) {
                                                                    temp.count -= 1
                                                                    updateCount(temp)
                                                                }
                                                            }} />
                                                        </View>

                                                        <View>
                                                            <Text style={theme.myCartStyles.amountText}>
                                                                Rs.{item.amount * item.count}
                                                            </Text>
                                                        </View>
                                                     
                                                            <View >
                                                                <Icons name="plus" size={30} onPress={() => {
                                                                    let temp = item
                                                                    temp.count += 1
                                                                    updateCount(temp)
                                                                }} />
                                                            </View>                                                    

                                                        <View >
                                                            <Button
                                                                title={"Remove cart"}
                                                                titleStyle={theme.myCartStyles.title}
                                                                buttonStyle={theme.myCartStyles.button}
                                                                onPress={() => removeProduct(item.name)}
                                                            />
                                                        </View>

                                                    </View>

                                                </View>



                                            )
                                        }) : <View>
                                            <ActivityIndicator  />
                                        </View>
                                    }
                                    <View style={theme.myCartStyles.gap}>

                                    </View>
                                </ScrollView> : <View style={theme.myCartStyles.emptyCart}>
                                    <Text style={theme.myCartStyles.emptyText}>Your Cart is Empty</Text>
                                    <Image
                                        style={theme.myCartStyles.emptyImage}
                                        source={{ uri: "https://content.presentermedia.com/content/animsp/00007000/7277/stick_figure_shopping_cart_300_wht.gif" }} />
                                </View>
                        }
                    </View>
                )
            }
        </ThemeConsumer>


    )
}

export default MyCart