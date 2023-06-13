import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";

const ForgetPassword = ({navigation}) => {

    const[text , setText] = useState('')

    const handleChangeText =(inputText)=>{
        setText(inputText)
    }
    return (
        <View>
            <View>
                <Text>Kathir</Text>
            </View>
            <View>
                <TextInput
                placeholder="Enter text"
                value={text}
                onChangeText={handleChangeText}
                testID="name"
                />
            </View>
            <View>
                <Button
                title="Clich here"
                testID="btn"
                onPress={()=>navigation.navigate("google")}
                />
                 <Button
                title="Clich here"
                testID="btn1"
                onPress={()=> navigation.navigate("facebook")}
                />
            </View>

        </View>
    )
}

export default ForgetPassword