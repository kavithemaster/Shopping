import React, { useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import { ThemeConsumer, Header, Image , Button} from "react-native-elements";
import AppContext from "../../shared/context";

const MyWishlist = () => {
    const { favourites , setFavourites} = useContext(AppContext)

    const removeProduct = (name) => {
        let temp = []
        favourites.map((item) => {
            if (item.name != name) {
                temp.push(item)
            }
        })
        setFavourites([...temp])
    }

    return (
        <ThemeConsumer>
            {
                ({ theme }) => (
                    <View>
                        <Header
                            centerComponent={{
                                text: "My Favourites",
                                style: theme.myWishlist.headerCenter
                            }}
                            leftComponent={{ icon: "chevron-left", size: 32, onPress: () => navigation.goBack() }}
                           
                        />
                        {
                            favourites.length ?
                                <ScrollView >
                                    {
                                        favourites.map((item, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={theme.myWishlist.mainContainer}>


                                                    <View >
                                                        <Image source={{ uri: item.uri[0] }} style={theme.myWishlist.image} />
                                                    </View>

                                                    <View style={theme.myWishlist.nameContain}>
                                                        <Text style={theme.myWishlist.nameText} >
                                                            {item.name}
                                                        </Text>
                                                    </View>

                                                    <View style={theme.myWishlist.cart}>

                                                        <View>
                                                            <Text style={theme.myWishlist.amountText}>
                                                                Rs.{item.amount * item.count}
                                                            </Text>
                                                        </View>

                                            

                                                        <View >
                                                            <Button
                                                                title={"Remove Favourites"}
                                                                titleStyle={theme.myWishlist.title}
                                                                buttonStyle={theme.myWishlist.button}
                                                                onPress={() => removeProduct(item.name)}
                                                            />
                                                        </View>

                                                    </View>

                                                </View>



                                            )
                                        })
                                    }
                                    <View style={theme.myWishlist.gap}>

                                    </View>
                                </ScrollView> : <View style={theme.myWishlist.emptyCart}>
                                    <Text style={theme.myWishlist.emptyText}>Your Favourites list is Empty</Text>
                                    <Image
                                        style={theme.myWishlist.emptyImage}
                                        source={{ uri: "https://cdn.dribbble.com/users/2070959/screenshots/5881187/copy_2.gif"}} />
                                </View>
                        }
                    </View>
                )
            }
        </ThemeConsumer>
     )
}

export default MyWishlist