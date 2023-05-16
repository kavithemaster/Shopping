import React, { useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import AppContext from "../shared/context";

const MyCart = ({ navigation }) => {

    const { cart } = useContext(AppContext)
    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View>
                        <Header
                            centerComponent={{
                                text: "My Carts",
                                style: { color: "white", fontSize: 20, fontWeight: "900" }

                            }}
                            leftComponent={{ icon: "chevron-left", size: 32, onPress: () => navigation.goBack() }}
                        />
                        <ScrollView >
                            {
                                cart.map((item, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{ elevation: 40, borderRadius: 10, top: 10, borderWidth: 2, backgroundColor: "white", marginHorizontal: 10, marginVertical: 10 }}>

                                            <View >
                                                <Image source={{ uri: item.req }} style={{ width: "92%", height: 200, left: 20, top: 10 }} />
                                            </View>

                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ fontSize: 20, color: "black", paddingLeft: 22, fontWeight: '900', padding: 5 }} >
                                                    {item.name}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>

                                                <View>
                                                    <Text style={{ fontSize: 20, color: "black", fontWeight: "900", paddingLeft: 22 }}>
                                                        Rs.{item.amount}
                                                    </Text>
                                                </View>

                                                <View >
                                                    <Button
                                                        title={"Remove cart"}
                                                        titleStyle={{ fontSize: 20, color: "white" }}
                                                        buttonStyle={{ marginHorizontal: 110, marginBottom: 10, padding: 10 }}
                                                    />
                                                </View>

                                            </View>

                                        </View>



                                    )
                                })
                            }
                            <View style={{ marginBottom: 100 }}>

                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </ThemeConsumer>


    )
}

export default MyCart