import React, { useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons"
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import AppContext from "../shared/context";

const MyCart = ({ navigation }) => {

    const { cart, setCart } = useContext(AppContext)

    console.log(cart)


    const removeProduct = (name) => {
        let temp = []
        cart.map((item) => {
            if (item.name != name) {
                temp.push(item)
            }
        })
        setCart([...temp])
    }

    // const calculatePrice = () => {
    //     let price = 0
    //     cart.map((item) => {
    //         price += item.price * item.count
    //     })
    //     return price
    // }

    // const calculateCount = () => {
    //     let count = 0
    //     cart.map((item) => {
    //         count += item.count
    //     })
    //     return count
    // }

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
                            rightComponent={cart.length ? { icon: "check", size: 32 } : null}
                        />
                        {
                            cart.length ?
                                <ScrollView >
                                    {
                                        cart.map((item, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={theme.myCartStyles.mainContainer}>


                                                    <View >
                                                        <Image source={{ uri: item.req }} style={theme.myCartStyles.image} />
                                                    </View>

                                                    <View style={theme.myCartStyles.nameContain}>
                                                        <Text style={theme.myCartStyles.nameText} >
                                                            {item.name}
                                                        </Text>
                                                    </View>

                                                    <View style={theme.myCartStyles.cart}>
                                                        <View >
                                                            <Icons name="minus" size={30} />
                                                        </View>
                                                        <View>
                                                            <Text style={theme.myCartStyles.amountText}>
                                                                Rs.{item.amount}
                                                            </Text>
                                                        </View>
                                                     
                                                            <View >
                                                                <Icons name="plus" size={30} />
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
                                        })
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