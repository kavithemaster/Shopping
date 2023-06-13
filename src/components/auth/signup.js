import React, { useState, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AppContext from "../../shared/context";
import { useNavigation } from "@react-navigation/native";


// Validation for user details
const validationSchema = Yup.object({
    Email: Yup
        .string()
        .email('Invalid email')
        .required('Email ID is Required'),
    UserName: Yup
        .string()
        .trim()
        .min(3, 'Invalid Name!')
        .required('User Name is Required'),
    PhoneNumber: Yup
        .string()
        .matches(/(\d){10}\b/, 'Enter the valid Mobile number')
        .matches('^[6-9][0-9]*$', 'Enter the valid  number')
        .max(10, 'Invalid Number')
        .required('Phone number is required'),
    Password: Yup
        .string()
        .trim()
        .min(8, ({ min }) => `password must be at least ${min} characters`)
        // .max(20, ({ max }) => `password must be at least ${max} characters`)
        .required('Password is required'),
    ConformPassword: Yup
        .string()
        .equals([Yup.ref('Password'), null], 'Password doesnt match')
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        // .max(20, ({ max }) => `Password must be at least ${max} characters`)
        .required('Conform Password is Required'),
})

const SignUp = () => {
    const { setLoad, load } = useContext(AppContext)
    const navigation = useNavigation()
    // Posting Data to firebase 
    const onAddHandler = async (values) => {
        try {
            const data = { ...values, cart: "kokarakoo koli", orders: "kokarakoo orders" }
            // const res = await axios.post("https://beast-4e018-default-rtdb.firebaseio.com//shopping.json", data)
            const res = await axios.post("https://eshopping-15bdb-default-rtdb.firebaseio.com//shopping.json", data)
            if (!res)
                {setLoad(!load)
            navigation.navigate("SignIn")
            ToastAndroid.show(
                "Registred Successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT
            )}
            else{
                console.log("error")
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    // UeState for password visibility
    const [visible, setVisible] = useState(false)
    const [anotherVisible, setAnotherVisible] = useState(false)

    // Values for details
    const Details = {
        Email: "",
        UserName: "",
        PhoneNumber: "",
        Password: "",
        ConformPassword: "",
    }

    // Main code of Execution using Formik
    return (
        < View >
            <Formik validationSchema={validationSchema} initialValues={Details} onSubmit={(values) => onAddHandler(values)}>
                {({ values, handleChange, errors, touched, handleBlur, handleSubmit }) => {
                    const { Email, UserName, PhoneNumber, Password, ConformPassword } = values
                    return (
                        <ThemeConsumer>
                            {
                                ({ theme }) => (
                                    <ScrollView>
                                        <View style={theme.signUpStyles.container}>
                                            <View>
                                                <Avatar

                                                    rounded
                                                    size={130}
                                                    source={{ uri: "https://png.pngtree.com/png-clipart/20200701/original/pngtree-e-commerce-shopping-design-png-image_5342891.jpg" }}
                                                    avatarStyle={theme.signUpStyles.image}
                                                />
                                            </View>
                                            <View style={theme.signUpStyles.mainContain}>
                                                <Text style={theme.signUpStyles.text}>Email Address</Text>
                                                <View style={theme.signUpStyles.content}>
                                                    <TextInput

                                                        style={theme.signUpStyles.textInput}
                                                        placeholder="Email"
                                                        placeholderTextColor="white"
                                                        onChangeText={handleChange("Email")}
                                                        value={Email}
                                                        autoCapitalize={"none"}
                                                        onBlur={handleBlur("Email")}
                                                        testID="emailjest"
                                                    />
                                                    {errors && (
                                                        <Text style={theme.signUpStyles.errorText}>{touched.Email && errors.Email}</Text>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={theme.signUpStyles.mainContain}>
                                                <Text style={theme.signUpStyles.text}>User Name</Text>
                                                <View style={theme.signUpStyles.content}>
                                                    <TextInput
                                                        style={theme.signUpStyles.textInput}
                                                        placeholder="UserName"
                                                        placeholderTextColor="white"
                                                        onChangeText={handleChange("UserName")}
                                                        value={UserName}
                                                        onBlur={handleBlur("UserName")}
                                                        testID="usernamejest"
                                                    />
                                                    {errors && (
                                                        <Text style={theme.signUpStyles.errorText}>{touched.UserName && errors.UserName}</Text>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={theme.signUpStyles.mainContain}>
                                                <Text style={theme.signUpStyles.text}>Phone Number</Text>
                                                <View style={theme.signUpStyles.content}>
                                                    <TextInput
                                                        style={theme.signUpStyles.textInput}
                                                        placeholder="PhoneNumber"
                                                        placeholderTextColor="white"
                                                        onChangeText={handleChange("PhoneNumber")}
                                                        value={PhoneNumber}
                                                        onBlur={handleBlur("PhoneNumber")}
                                                        testID="phonenumjest"
                                                    />
                                                    {errors && (
                                                        <Text style={theme.signUpStyles.errorText}>{touched.PhoneNumber && errors.PhoneNumber}</Text>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={theme.signUpStyles.mainContain}>
                                                <Text style={theme.signUpStyles.text}>Password</Text>
                                                <View style={theme.signUpStyles.content}>
                                                    <TextInput
                                                        style={theme.signUpStyles.textInput}
                                                        placeholder="Password"
                                                        placeholderTextColor="white"
                                                        onChangeText={handleChange("Password")}
                                                        value={Password}
                                                        onBlur={handleBlur("Password")}
                                                        secureTextEntry={!visible}
                                                        testID="passwordjest"
                                                    />
                                                    <Icon name={visible ? "eye" : "eye-slash"} size={25}
                                                        onPress={() => { setVisible(!visible) }}
                                                        style={theme.signUpStyles.eyeIcon}
                                                        testID="eyejest"
                                                    />
                                                    {errors && (
                                                        <Text style={theme.signUpStyles.errorText}>{touched.Password && errors.Password}</Text>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={theme.signUpStyles.mainContain}>
                                                <Text style={theme.signUpStyles.text}>Conform Password</Text>
                                                <View style={theme.signUpStyles.content}>
                                                    <TextInput
                                                        style={theme.signUpStyles.textInput}
                                                        placeholder="ConformPassword"
                                                        placeholderTextColor="white"
                                                        onChangeText={handleChange("ConformPassword")}
                                                        value={ConformPassword}
                                                        onBlur={handleBlur("ConformPassword")}
                                                        secureTextEntry={!anotherVisible}
                                                        testID="comPassjest"
                                                    />
                                                    <Icon name={anotherVisible ? "eye" : "eye-slash"} size={25}
                                                        onPress={() => { setAnotherVisible(!anotherVisible) }}
                                                        style={theme.signUpStyles.eyeIcon}
                                                        testID="eye1jest"
                                                    />
                                                    {errors && (
                                                        <Text style={theme.signUpStyles.errorText}>{touched.ConformPassword && errors.ConformPassword}</Text>
                                                    )}
                                                </View>
                                            </View>

                                            <TouchableOpacity style={theme.signUpStyles.accountContain}
                                                onPress={() => navigation.navigate('SignIn')}
                                                testID="alreadyjest"
                                            >
                                                <Text style={theme.signUpStyles.accountText}>Already have an account !</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={theme.signUpStyles.submitButton}
                                                onPress={values && handleSubmit}
                                                testID="registerjest"
                                            >
                                                <Text style={theme.signUpStyles.buttonText}>REGISTER</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={theme.signUpStyles.gap}>
                                        </View>
                                    </ScrollView>
                                )
                            }
                        </ThemeConsumer>
                    )
                }}
            </Formik>
        </View >
    )
}

export default SignUp