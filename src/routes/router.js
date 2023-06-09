import React, { useEffect, useState } from "react";
import { ThemeProvider, Icon } from 'react-native-elements'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import SignIn from "../components/auth/signin";
import SignUp from "../components/auth/signup";
import ForgetPassword from "../components/auth/forgetPassword";
import Deals from "../components/deals";
import Home from "../components/home";
import MyCart from "../components/myCart";
import MyOrders from "../components/user/myOrders";
import MyWishlist from "../components/user/myWishlist";
import Profile from "../components/user/profile";
import UpdateProfile from "../components/user/updateProfile";
import theme from "../styles/themes";
import Electronics from "../components/products/electronics";
import Fashion from "../components/products/fashion";
import Grocery from "../components/products/grocery";
import Mobiles from "../components/products/mobiles";
import Product from "../components/products/productDetails";
import AppContext from "../shared/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../components/splash";
import Google from "../components/auth/google";
import Facebook from "../components/auth/facebook";

// Creating Navigator for stack and bottom
const Stack = createNativeStackNavigator()
const Bottom = createMaterialBottomTabNavigator()

// Authentication for app using stack Navigator
const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    header: () => null
                }}
            >
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Forget" component={ForgetPassword} />
                <Stack.Screen name="google" component={Google} />
                <Stack.Screen name="facebook" component={Facebook} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// Products lists using Bottom navigator
const ProductsTab = () => {
    return (
        <NavigationContainer>
            <Bottom.Navigator testID="botNavTest">
                <Bottom.Screen 
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon
                                    name={focused ? 'home' : 'home-outline'}
                                    type={'ionicon'}
                                    size={focused ? 32 : 30}
                                    color={focused ? "blue" : "black"}
                                    // testID="homeBotTest"
                                />
                            )
                        }
                    }}
                    name="Store" component={ProductsDetails} />
                <Bottom.Screen
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon
                                    name={focused ? 'md-pricetag-sharp' : 'md-pricetag-outline'}
                                    type={'ionicon'}
                                    size={focused ? 32 : 30}
                                    color={focused ? "blue" : "black"}
                                />
                            )
                        }
                    }}
                    name="Deals" component={Deals} />
                <Bottom.Screen
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon
                                    name={focused ? 'cart' : 'cart-outline'}
                                    type={'ionicon'}
                                    size={focused ? 32 : 30}
                                    color={focused ? "blue" : "black"}
                                />
                            )
                        }
                    }}
                    name="MyCart" component={MyCart} />
                <Bottom.Screen
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon
                                    name={focused ? 'person' : 'person-outline'}
                                    type={'ionicon'}
                                    size={focused ? 32 : 30}
                                    color={focused ? "blue" : "black"}
                                />
                            )
                        }
                    }}
                    name="Profile" component={UserStack} />
            </Bottom.Navigator>
        </NavigationContainer>
    )
}

// Product details using stack navigator
const ProductsDetails = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Electronics" component={Electronics} />
            <Stack.Screen name="Fashion" component={Fashion} />
            <Stack.Screen name="Grocery" component={Grocery} />
            <Stack.Screen name="Mobiles" component={Mobiles} />
            <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    )

}

// User information using stack
const UserStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null
            }}
        >
            <Stack.Screen name="MyProfile" component={Profile} />
            <Stack.Screen name="MyOrders" component={MyOrders} />
            <Stack.Screen name="MyWishlist" component={MyWishlist} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        </Stack.Navigator>
    )
}

// Main Function for application
const Router = () => {

    const [cart, setCart] = useState([])
    const [product, setProduct] = useState()
    const [favourites, setFavourites] = useState([])
    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])
    const [login, setLogin] = useState(false)
    const [visible, setVisible] = useState(false)

    // useEffect function for getCart and getUser
    useEffect(() => {
        getCart()
        getUser()
    }, [])

    // user function using Async storage
    const getUser = async () => {
        let user
        try {
            user = await AsyncStorage.getItem('user')
        } catch (err) {
            console.log(err)
        }
        if (user != null) {
            setLogin(true)
        }
    }

    // card function using Async storage
    const getCart = async () => {
        let crt
        try {
            crt = await AsyncStorage.getItem('cart')
        } catch (err) {
            console.log(err)
        }
        if (crt == null) {
            try {
                await AsyncStorage.setItem('cart', JSON.stringify([]))
            } catch (err) {
                console.log(err)
            }
        }
        else {
            setCart(JSON.parse(crt))
        }
    }
    if (visible) {
        return (

            <ThemeProvider theme={theme}>
                <AppContext.Provider value={{
                    cart,
                    setCart,
                    product,
                    setProduct,
                    favourites,
                    setFavourites,
                    load,
                    setLoad,
                    data,
                    setData,
                    login,
                    setLogin

                }}
                >
                    {
                        login ? <ProductsTab /> : <AuthStack />
                    }
                </AppContext.Provider>
            </ThemeProvider>
        )
    }
    else {
        setTimeout(() => {
            setVisible(true)
        }, 3000);
        return (
            <ThemeProvider theme={theme}>
                <Splash />
            </ThemeProvider>
        )
    }
}

export default Router


