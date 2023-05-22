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
    color: "black",
    alignSelf: "flex-end",
    marginHorizontal: 8
  },
  imgaeContain: {
    elevation: 40,
    borderRadius: 10,
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
    borderWidth: 2
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "black"
  },
  nameContain: {
    marginTop: 60
  },
  nameText: {
    fontSize: 20,
    color: "black",
    padding: 10
  },
  contentText:
  {
    fontSize: 18,
    color: "black",
    padding: 14,
    justifyContent: "center"
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
