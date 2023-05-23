import { StyleSheet } from "react-native";

export const productDetails = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1
  },
  container: {
    marginTop: 10
  },
  icon: {
    color: "red",
    alignSelf: "flex-end",
    marginHorizontal: 8
  },
  imgaeContain: {
    elevation: 80,
    borderRadius: 60,
    top: 10
  },
  image: {
    width: "96%",
    height: 280,
    left: 9
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: 45
  },
  opacity: {
    width: 70,
    borderWidth: 3,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight:"800",
  },
  nameContain: {
    marginTop: 60,
    
  },
  nameText: {
    fontSize: 20,
    color: "black",
    padding: 10,
    color:"black", fontWeight:"800"
  },
  contentText:
  {
    fontSize: 18,
    padding: 14,
    justifyContent: "center",
    color:"black", fontWeight:"800"
  },
  amountContain: {
    padding: 14,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    color: "white"
  },
  button: {
    marginHorizontal: 130
  },
  gap: {
    marginBottom: 20
  }
})
