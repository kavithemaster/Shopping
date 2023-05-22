import { StyleSheet } from "react-native";
export const signInstyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 800,
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    top: 13,
  },
  mainContain: {
    top: 39,
    padding: 10,
    width: "90%",
    left: 35,
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "800"
  },
  content: {
    backgroundColor: "lightblue",
    width: "80%",
    height: 60,
    elevation: 10,
    borderRadius: 10
  },
  textInput: {
    fontSize: 18,
    padding: 15,
    color: "black"
  },
  eyeIcon: {
    color: "black",
    position: "absolute",
    alignSelf: "flex-end",
    padding: 18,
  },
  submitButton: {
    top: 70,
    height: 50,
    backgroundColor: "blue",
    marginHorizontal: 100,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    padding: 12,
    textAlign: 'center',
    color: "white"
  },
  forgotButton: {
    fontSize: 18,
    alignSelf: "flex-end",
    color: "black",
    top: 50
  },
  signUpText: {
    fontSize: 17,
    top: 90,
    color: "black"
  },
  socialMedia: {
    flexDirection: "row",
    top: 140,
    justifyContent: "space-evenly",
    width: "100%"
  }
});