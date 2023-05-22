import { StyleSheet } from "react-native";

export const fashionStyles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: "white",
    fontWeight: "800",
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover"
  },
  imageConatiner: {
    flex: 0.5,

  },
  addCart: {
    position: "absolute",
    left: 100,
    top: 3,
    color: "black"
  },
  mainContainer: {
    backgroundColor: "white",
  },
  container: {
    marginTop: 30,
  },
  mainContain: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    elevation: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  contain: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 0.6,
    paddingLeft: 10,
    paddingVertical: 6
  },
  text: {
    fontSize: 20,
    color: "black"
  },
  amountContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '60%'
  },
  ratingContain: {
    flexDirection: "row"
  },
  ratingText: {
    fontSize: 20,
    paddingLeft: 16,
    color: "black"
  },
  ratingStar: {
    color: "black"
  },
  title: {
    fontSize: 20,
    color: "white"
  },
  gap: {
    marginTop: 100
  }


})
