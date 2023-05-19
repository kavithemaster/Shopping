import React, { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons"
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import AppContext from "../shared/context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment"
import { ActivityIndicator } from "react-native-paper";
import {useIsFocused} from "@react-navigation/native";

const MyCart = ({ navigation }) => {

    const { cart, setCart } = useContext(AppContext)
    const [load, setLoad] = useState(false)

    const focused = useIsFocused()

    // useEffect(() => {
    //     addToCart()
    // }, [cart])

    useEffect(() => {
        getCartData()
        setTimeout(() => {
            setLoad(true)
        }, 3000);
    }, [])

    // useEffect(()=>{
    //     console.log("cart details", cart);
    // },[cart])

    const getCartData = async () => {
        // console.log("Inside get")
        const key = await AsyncStorage.getItem("userKey")
        const res = await axios.get(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`)
        let temp = []
        // console.log(res.data.cart.length)
        res.data.cart.map((item) => {
            console.log(item)
            temp.push(item)
        })
        setCart([...temp])
    }

    const addToCart = async () => {
        // console.log("from add", cart)
        const key = await AsyncStorage.getItem("userKey")
        await axios.put(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}/cart.json`,{ cart})
        .then((result) => 
        {
            // console.log(Object.keys(result.data.cart).length)
        }
        ).catch((err)=>{
            // console.log(err)
        })
    }

    const removeProduct = (name) => {
        let temp = []
        if(cart.length > 1){

        cart.map((item) => {
            if (item.name != name) {
                temp.push(item)
            }
        })
        // console.log("temp",temp);
        setCart([...temp])
        addToCart()
        }
        else {
            setCart([...temp])
            //  console.log("cancel");
            addToCart()
        }
        
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
                                text: "Carts",
                                style: theme.myCartStyles.headerCenter

                            }}
                            leftComponent={{ icon: "chevron-left", size: 32,color:"white", onPress: () => navigation.goBack() }}
                            rightComponent={cart.length ? { icon: "check", size: 32, color:"white",onPress: () => placeOrder() } : null}
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
                                                        <Image source={{ uri: item.uri[0] }} style={theme.myCartStyles.image} />
                                                    </View>

                                                    <View style={theme.myCartStyles.nameContain}>
                                                        <Text style={theme.myCartStyles.nameText} >
                                                            {item.name}
                                                        </Text>
                                                    </View>

                                                    <View style={theme.myCartStyles.cart}>

                                                        <View style={theme.myCartStyles.minusIcon}>
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
                                                                {item.count}
                                                            </Text>
                                                            <Text style={theme.myCartStyles.rate}>Rs. {item.count * item.amount}</Text>
                                                        </View>
                                                     
                                                            <View style={theme.myCartStyles.plusIcon}>
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
                                                                onPress={() => {
                                                                    removeProduct(item.name)
                                                                    // addToCart()
                                                                    // getCartData()
                                                                }}
                                                            />
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
                            <View style={{backgroundColor:"white"}}>
                                <Text style={theme.myCartStyles.emptyText}>Your Cart is Empty</Text>
                                    <Image
                                        style={theme.myCartStyles.emptyImage}
                                        source={{ uri: "https://content.presentermedia.com/content/animsp/00007000/7277/stick_figure_shopping_cart_300_wht.gif" }} />
                            </View> : 
                            <View style={{justifyContent:'center', alignItems: 'center', height: '90%'}}>
                                <ActivityIndicator 
                                    size={'large'}
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