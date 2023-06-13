import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper"; 
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import Icons from "react-native-vector-icons/MaterialCommunityIcons"
import AppContext from "../shared/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment"

const MyCart = ({ navigation }) => {

    // Setting and getting value from useContext
    const { cart, setCart } = useContext(AppContext)
    const [load, setLoad] = useState(false)


    useEffect(() => {
        getCartData()
        setTimeout(() => {
            setLoad(true)
        }, 3000);
    }, [])

    // Getting cart from using axios
    const getCartData = async () => {
        const key = await AsyncStorage.getItem("userKey")
        // const res = await axios.get(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)\
        const res = await axios.get(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)
        let temp = []
        res.data.cart.map((item) => {
            temp.push(item)
        })
        setCart([...temp])
    }

    // Inserting cart data to fire base
    const addToCart = async () => {
        const key = await AsyncStorage.getItem("userKey")
        // await axios.put(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`, { cart })
        await axios.put(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}/cart.json`, { cart })
            .then((result) => {

            }
            ).catch((err) => {

            })
    }

    // Remove cart function
    const removeProduct = (name) => {
        let temp = []
        if (cart.length > 1) {

            cart.map((item) => {
                if (item.name != name) {
                    temp.push(item)
                }
            })
            setCart([...temp])
            addToCart()
        }
        else {
            setCart([...temp])
            addToCart()
        }

    }

    // Updating amount 
    const updateCount = (item) => {
        let temp = []
        cart.map((prod) => {
            if (prod.name == item.name) {
                temp.push(item)
            }
            else {
                temp.push(prod)
            }
        })
        setCart([...temp])
    }

    // placing order using firebase
    const placeOrder = async () => {
        const key = await AsyncStorage.getItem("userKey")
        // const del = await axios.delete(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)
        const del = await axios.delete(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)
        let orders = {}
        orders['order'] = cart
        orders['time'] = Moment(new Date()).format('dddd MMMM D, y - h:mm a')
        // const res = await axios.post(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/orders.json`, orders).
        const res = await axios.post(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}/orders.json`, orders)
    }


    // main code execution
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View>
                        <Header
                            centerComponent={{
                                text: "Carts",
                                style: theme.myCartStyles.headerCenter

                            }}
                            leftComponent={{ icon: "chevron-left", size: 32, color: "white", onPress: () => navigation.goBack() }}
                            rightComponent={cart.length ? { icon: "check", size: 32, color: "white", onPress: () => placeOrder() } : null}
                        />
                        {
                            load ?
                                cart.length ?
                                    <View>
                                        <ScrollView >
                                            {
                                                cart.map((item, index) => {
                                                    return (
                                                        <View
                                                            key={index}
                                                            style={theme.myCartStyles.mainContainer}>


                                                            <View >
                                                                <Image source={{ uri: item.uri[0] }} testID="imgjest" style={theme.myCartStyles.image} />
                                                            </View>

                                                            <View style={theme.myCartStyles.nameContain}>
                                                                <Text style={theme.myCartStyles.nameText} testID="namejest" >
                                                                    {item.name}

                                                                </Text>
                                                            </View>

                                                            <View style={theme.myCartStyles.cart}>

                                                                <View style={theme.myCartStyles.minusIcon}>
                                                                    <Icons name="minus" size={30} onPress={() => {
                                                                        let temp = item
                                                                        if (item.count - 1 > 0) {
                                                                            temp.count -= 1
                                                                            updateCount(temp)

                                                                        }

                                                                    }}
                                                                        testID="minusiconJest"
                                                                    />
                                                                </View>

                                                                <View style={theme.myCartStyles.price}>

                                                                    <View>
                                                                        <Text style={theme.myCartStyles.amountText} testID="countjest">
                                                                            {item.count}
                                                                        </Text>
                                                                        <Text testID="countAmountjest" style={[theme.myCartStyles.rate, { textDecorationLine: "underline" }]}>Rs. {item.count * item.amount}</Text>
                                                                    </View>

                                                                    <View style={theme.myCartStyles.plusIcon}>
                                                                        <Icons name="plus" size={30} onPress={() => {
                                                                            let temp = item
                                                                            temp.count += 1
                                                                            updateCount(temp)


                                                                        }}
                                                                            testID="plusJest"
                                                                        />
                                                                    </View>

                                                                    <View >
                                                                        <Button
                                                                            title={"Remove cart"}
                                                                            titleStyle={theme.myCartStyles.title}
                                                                            buttonStyle={theme.myCartStyles.button}
                                                                            onPress={() => {
                                                                                removeProduct(item.name)
                                                                            }}
                                                                            testID="buttonJest"
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                            <View style={theme.myCartStyles.gap}>

                                            </View>
                                        </ScrollView>
                                    </View> :
                                    <View style={{ backgroundColor: "white" }}>
                                        <Text style={theme.myCartStyles.emptyText}>Your Cart is Empty</Text>
                                        <Image
                                            style={theme.myCartStyles.emptyImage}
                                            source={{ uri: "https://content.presentermedia.com/content/animsp/00007000/7277/stick_figure_shopping_cart_300_wht.gif" }}
                                            testID="img1jest"
                                        />
                                    </View> :
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                                    <ActivityIndicator
                                        size={'large'}
                                        testID="acindjest"
                                    />
                                </View>
                        }
                    </View>
                )
            }
        </ThemeConsumer>


    )
}

export default MyCart