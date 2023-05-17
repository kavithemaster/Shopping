import React from "react";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "900",

  },
  text: {
    fontSize: 23,
    color: "black",
    textAlign: "center",
    paddingLeft: 10,

  },
  opacity: {
    backgroundColor: "white",
    width: 140,
    height: 40,
    left: 10,
    borderRadius: 10,
  },
  topText: {
    fontSize: 20,
    color: "black",
    paddingLeft: 10,
    fontWeight: "900",
  },
  mainContainer: {
    backgroundColor: "white"
  },
  swiper: {
    top: 15, marginHorizontal: 5, borderRadius: 20, width: 400
  },
  swiperImage: {
    height: 200, width: 400, borderRadius: 20, marginRight: 5
  },
  avatarContain: {
    top: 35, height: 150
  },
  avatarView: {
    marginHorizontal: 8, paddingLeft: 10
  },
  avatar: {
    height: 100
  },
  nameText: {
    fontSize: 20, color: "black", paddingLeft: 10, fontWeight: "900"
  },
  imageContain: {
    marginHorizontal: "10%", marginVertical: 10, width: "80%", elevation: 20, borderRadius: 10
  },
  image: {
    height: 140, width: "100%", borderRadius: 10
  },
  gap: {
    marginBottom: 100
  }


})
