
import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { ThemeConsumer, Avatar } from "react-native-elements";
import AppContext from "../../shared/context";
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const SignIn = ({ navigation }) => {
    const { data, setData, setLogin, load } = useContext(AppContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState([])
    const [visible, setVisible] = useState(false)
    const [userFullData, setUserFullData] = useState([])
    const [userFullKey, setUserFullKey] = useState([])

    // For reload of the function and values
    useEffect(() => {
        getData()
    }, [load])

    // Getting values from Firebase
    const getData = async () => {
        // const res = await axios.get("https://beast-4e018-default-rtdb.firebaseio.com//shopping.json")
        const res = await axios.get("https://eshopping-15bdb-default-rtdb.firebaseio.com//shopping.json")
        if (res != null) {
            setUserData(Object.values(res?.data))
            setUserFullKey(Object.keys(res.data))
            setUserFullData(res.data)
        }
        else {
            console.log("err");
        }
    }
    // values for email and password
    const onEmailChangeHandler = e => {
        setEmail(e)
    }
    const onPasswordChangeHandler = e => {
        setPassword(e)
    }
    // Validation of values from FireBase and User
    const onAddHandler = () => {
        userFullKey.map(res => {
            if (userFullData[res].Email === email) {
                AsyncStorage.setItem("userKey", res)
                ToastAndroid.show(
                    "Logined Successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT
                )
            }
        })

        let valid = false
        if (((email.length > 2))) {
            setData({ email: email, password: password })
            const uData = { email: email, password: password }
            userData.map(async (res) => {
                if (res.Email === uData.email && res.Password === uData.password) {
                    valid = true
                    await AsyncStorage.setItem('login', 'true')
                    await AsyncStorage.setItem('user', JSON.stringify(uData))
                    setLogin(true)
                }
            })
            if (!valid) {
                Alert.alert("Your Email id or Password is Incorrect", "Please Enter Vaild Email Address and Password")
            }
        }
        else {
            Alert.alert('Please enter deatils correctly', 'Your Details Cannot be Empty')
        }
    }

    // Main code of execution

    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.signInstyles.container}
                      testID="signInTest"
                    >
                        <Avatar
                            rounded
                            size={170}
                            avatarStyle={theme.signInstyles.image}
                            source={{ uri: "https://png.pngtree.com/png-clipart/20200701/original/pngtree-e-commerce-shopping-design-png-image_5342891.jpg" }}
                        />
                        <View style={theme.signInstyles.mainContain}>
                            <Text style={theme.signInstyles.text} >Email Address</Text>
                            <View style={theme.signInstyles.content}>
                                <TextInput
                                    style={theme.signInstyles.textInput}
                                    placeholder="Email"
                                    placeholderTextColor="white"
                                    autoCapitalize={"none"}
                                    keyboardType="email-address"
                                    onChangeText={onEmailChangeHandler}
                                    testID='emailjest'
                                />
                            </View>
                        </View>
                        <View style={theme.signInstyles.mainContain}>
                            <Text style={theme.signInstyles.text}>Password</Text>
                            <View style={theme.signInstyles.content}>
                                <TextInput
                                    style={theme.signInstyles.textInput}
                                    placeholder="Password"
                                    placeholderTextColor="white"
                                    onChangeText={onPasswordChangeHandler}
                                    secureTextEntry={!visible}
                                    testID='passwordjest'
                                />
                                <Icon name={visible ? "eye" : "eye-slash"} size={25}
                                    onPress={() => { setVisible(!visible) }}
                                    style={theme.signInstyles.eyeIcon}
                                    testID='eyejest'
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Forget")}
                                testID='forgetjest'
                            >
                                <Text style={theme.signInstyles.forgotButton}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={onAddHandler}
                            style={theme.signInstyles.submitButton}
                            testID='loginjest'
                        >
                            <Text style={theme.signInstyles.buttonText}>LOGIN</Text>
                        </TouchableOpacity >

                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignUp")}
                            testID='signupjest'
                        >
                            <Text style={theme.signInstyles.signUpText}>SignUp !</Text>
                        </TouchableOpacity>

                        <View style={theme.signInstyles.socialMedia}>
                            <View>
                                <Avatar
                                    rounded
                                    size={50}
                                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Google_criculo_logo.jpg" }} />
                            </View>
                            <View>
                                <Avatar
                                    rounded
                                    size={50}
                                    source={{ uri: "https://icon-library.com/images/facebook-icon-jpg-download/facebook-icon-jpg-download-14.jpg" }} />
                            </View>
                            <View>
                                <Avatar
                                    rounded
                                    size={50}
                                    source={{ uri: "https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg" }} />
                            </View>

                        </View>
                    </View>

                )
            }
        </ThemeConsumer>
    );
}

export default SignIn

