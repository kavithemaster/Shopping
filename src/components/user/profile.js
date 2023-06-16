import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, Modal, TextInput, ToastAndroid } from "react-native";
import { ThemeConsumer, Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../shared/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

// Validation for edit the profile
const validation = Yup.object({
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
})

// Main function
const Profile = () => {
    const navigation = useNavigation()
    const [visibility, setVisibility] = useState(false)
    const [userData, setUserData] = useState([])
    const { setLogin } = useContext(AppContext)

   // Rendering by using useEffect  
    useEffect(() => {
        getUSerData()
    }, [])

    // Getting user data from Firebase
    const getUSerData = async () => {
        let key = await AsyncStorage.getItem("userKey")
        // const res = await axios.get(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}.json`)
        const res = await axios.get(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}.json`)
        setUserData(res.data);
    }


    // Getting Values from useConntext to dislplay user details
    const onAddHandler = async (values) => {
        const data = { ...values, Password: userData.Password, ConformPassword: userData.ConformPassword }
        const key = await AsyncStorage.getItem("userKey")
        // const res = await axios.put(`https://beast-4e018-default-rtdb.firebaseio.com/shopping/${key}.json`, data)
        const res = await axios.put(`https://eshopping-15bdb-default-rtdb.firebaseio.com/shopping/${key}.json`, data)
        setUserData(res.data);
        setVisibility(false)
        ToastAndroid.show(
            'Edited Successfully', ToastAndroid.BOTTOM, ToastAndroid.SHORT
        )

    }

    // Main Code Execution 
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View style={theme.profileStyles.mainContainer}>
                        <Header
                            centerComponent={{ text: "Profile", color:"white",style: theme.dealsStyles.header }}
                            placement='left'
                            testID="headerJest"
                        />
                        <View>
                            
                            <TouchableOpacity onPress={() => setVisibility(true)} testID="editJest">
                                <Text style={theme.profileStyles.myProflieText} testID="editTextJest">Edit Your Profile 📝</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={theme.profileStyles.container}>
                            <Text style={theme.profileStyles.mainText} testID="emailJest">Email Address : {userData && userData.Email} </Text>
                            <Text style={theme.profileStyles.mainText} testID="userJest" >User Name: {userData && userData.UserName} </Text>
                            <Text style={theme.profileStyles.mainText} testID="phoneJest">Phone Number : {userData && userData.PhoneNumber} </Text>

                            <View style={theme.profileStyles.contain}>
                                <View>
                                    <Text style={theme.profileStyles.containText}
                                        onPress={() => navigation.navigate("MyOrders")}
                                        testID="myOrderJest"
                                    >My Orders</Text>
                                </View>
                                <View>
                                    <Text style={theme.profileStyles.containText}
                                        onPress={() => navigation.navigate("MyWishlist")}
                                        testID="myWishlistJest"
                                    >My Wishlist</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={theme.profileStyles.logoutMainContainer}
                                // AsyncStorage code validated for logout
                                onPress={() => {
                                    Alert.alert('Alert', 'Are you Sure want to Logout ', [
                                        {
                                            text: 'No',
                                            onPress: () => { navigation.navigate("Profile") },

                                        },
                                        {
                                            text: 'Yes',
                                            onPress: async () => {
                                                await AsyncStorage.clear()
                                                setLogin(false)
                                                ToastAndroid.show(
                                                    'Logout Successfully', ToastAndroid.BOTTOM, ToastAndroid.SHORT
                                                )
                                            }
                                        },

                                    ])
                                }}
                                testID="alertJest"
                            >
                                <Text style={theme.profileStyles.logoutText} testID="logoutJest">Logout</Text>
                            </TouchableOpacity>

                        </View>
                        <Modal
                            visible={visibility}
                            transparent={true}
                            animationType="fade"
                            testID="modalJest"
                        >
                            <Formik validationSchema={validation} initialValues={{ PhoneNumber: userData && userData.PhoneNumber, Email: userData && userData.Email, UserName: userData && userData.UserName }} onSubmit={(values) => onAddHandler(values)} >
                                {({ values, handleChange, errors, touched, handleBlur, handleSubmit }) => {
                                    return (
                                        <View style={theme.profileStyles.formikMainContainer}>
                                            <Text style={theme.profileStyles.text} testID="fUserJest"> User Name  </Text>
                                            <TextInput
                                                placeholder="User Name"
                                                style={theme.profileStyles.placeholderText}
                                                onChangeText={handleChange("UserName")}
                                                value={values.UserName}
                                                onBlur={handleBlur("UserName")}
                                                testID="ftUserJest"
                                            />
                                            {errors ? (<Text style={theme.profileStyles.errorText} testID="errorJest">{touched.UserName && errors.UserName}</Text>) : null}

                                            <Text style={theme.profileStyles.text} testID="fPhoneJest"> Phone Number </Text>
                                            <TextInput
                                                placeholder="Phone Number"
                                                style={theme.profileStyles.placeholderText}
                                                onChangeText={handleChange("PhoneNumber")}
                                                value={values.PhoneNumber}
                                                keyboardType="numeric"
                                                onBlur={handleBlur("PhoneNumber")}
                                                testID="ftPhoneJest"
                                            />
                                            {errors ? (<Text style={theme.profileStyles.errorText}testID="error1Jest">{touched.PhoneNumber && errors.PhoneNumber}</Text>) : null}
                                            <TouchableOpacity style={theme.profileStyles.submitButton} testID="submitJest">
                                                <Text style={theme.profileStyles.submitText} onPress={handleSubmit} testID="submitTestJest">Submit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={theme.profileStyles.closeButton} testID="closeJest">
                                                <Text style={theme.profileStyles.submitText} onPress={() => setVisibility(false)} testID="closeButtonJest">Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}

                            </Formik>

                        </Modal>



                    </View>
                )
            }
        </ThemeConsumer>
    )
}

export default Profile