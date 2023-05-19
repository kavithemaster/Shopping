import React from "react";
import { StyleSheet } from "react-native";

export const myCartStyles = StyleSheet.create({
    headerCenter: {
        color: "white", fontSize: 20, fontWeight: "900"
    },
    mainContainer: {
        elevation: 40, borderRadius: 10, top: 10, borderWidth: 2, backgroundColor: "white", marginHorizontal: 10, marginVertical: 10
    },
    image: {
        width: "92%", height: 200, left: 20, top: 10
    },
    nameContain: {
        marginTop: 10,
    },
    nameText: {
        fontSize: 20, color: "black", paddingLeft: 22, fontWeight: '900', padding: 5
    },
    cart: {
        flexDirection: "row", left:20
    },
    amountText: {
        fontSize: 20, color: "black", fontWeight: "900"
    },
    title: {
        fontSize: 20, color: "white"
    },
    button: {
        marginHorizontal: 60, marginBottom: 10, padding: 10
    },
    gap: {
        marginBottom: 100
    },
    emptyCart:{
        backgroundColor:"white",
    },
    emptyText:{
        fontSize:30, color:"red", alignSelf:"center",fontWeight:"800", top:10
    },
    emptyImage:{
        width: "72%", height: "83%", top:90, left:60
    },
    plusIcon:{
        right:68,
        color:"black"
    },
    minusIcon:{
        color:"black"
    },
    rate:{
        fontSize:20,
        right:22,
        color:"black"
    }
})
