import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import SignIn from "../components/auth/signin";
import SignUp from "../components/auth/signup";
import ForgetPassword from "../components/auth/forgetPassword";
import Deals from "../components/deals";
import Home from "../components/home";
import MyCart from "../components/myCart";
import Splash from "../components/splash";
import MyOrders from "../components/user/myOrders";
import MyWishlist from "../components/user/myWishlist";
import Profile from "../components/user/profile";
import UpdateProfile from "../components/user/updateProfile";

const Stack = createNativeStackNavigator()
const Tab = createMaterialTopTabNavigator()
const Bottom = createMaterialBottomTabNavigator()


const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Forget" component={ForgetPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const ProductsTab = () => {
    return (
        <NavigationContainer>
            <Bottom.Navigator>
                <Bottom.Screen name="Home" component={Home} />
                <Bottom.Screen name="Deals" component={Deals} />
                <Bottom.Screen name="MyCart" component={MyCart} />
                <Bottom.Screen name="Profile" component={UserStack} />
            </Bottom.Navigator>
        </NavigationContainer>
    )
}

const UserStack = () => {
    return (
            <Stack.Navigator >
                <Stack.Screen name="MyOrders" component={MyOrders} />
                <Stack.Screen name="MyWishlist" component={MyWishlist} />
                <Stack.Screen name="MyProfile" component={Profile} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            </Stack.Navigator>
    )
}

const Router = () => {
    return (
        <ProductsTab />
    )
}

export default Router


