import { StyleSheet } from 'react-native'
export const profileStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white",
        flex: 1,
    },
    container: {
        position: "absolute",
        marginTop: 150,
        width: "100%",
        height: 400,
    },
    mainText: {
        fontSize: 19,
        fontWeight: "bold",
        textShadowRadius: 4,
        marginLeft: 38,
        fontStyle: "italic",
        color: "black",
        marginTop: 63,
    },
    logoutMainContainer: {
        top: 100, height: 50, backgroundColor: "red", marginHorizontal: 100, borderRadius: 10, left: 13
    },
    logoutText: {
        fontSize: 20, color: "white", alignSelf: "center", padding: 10, fontWeight: "800"
    },
    myAccountText: {
        fontSize: 25,
        marginTop: 60,
        color: "black",
        alignSelf: "center",
        fontWeight: "bold",
        position: "absolute"
    },
    myProflieText: {
            fontSize: 25,
            marginTop: 120,
            color: "black",
            alignSelf: "center",
            fontWeight: "bold",
            position: "absolute",
            textDecorationLine:"underline"        
    },
    placeholderText: {
        fontSize: 19,
        marginLeft: 36,
        color: "black",
        borderBottomWidth: 2,
        width: "60%",
        fontWeight: "bold",
    },
    formikMainContainer: {
        width: "94%",
        height: 430,
        marginTop: 180,
        borderRadius: 20,
        elevation: 60,
        marginLeft: 15,
        backgroundColor: "white"
    },
    errorText: {
        color: "red",
        fontSize: 15,
        padding: 5,
        left: 13,
    },
    submitButton: {
        top: 20, height: 50, backgroundColor: "blue", marginHorizontal: 100, borderRadius: 10, left: 13,
    },
    submitText: {
        fontSize: 20, color: "white", alignSelf: "center", padding: 10, fontWeight: "800"
    },
    closeButton: {
        top: 40, height: 50, backgroundColor: "blue", marginHorizontal: 100, borderRadius: 10, left: 13,
    },
    close: {
        fontSize: 20, color: "white", alignSelf: "center", padding: 10, fontWeight: "800", top: 20
    },
    text: {
        fontSize: 19,
        fontWeight: "bold",
        textShadowRadius: 4,
        marginLeft: 10,
        color: "black",
        marginTop: 20,
    },
    contain:{
        flexDirection: "row", justifyContent: "space-between", padding: 30
    },
    containText:{
        fontSize: 25, top: 50, elevation: 10, borderRadius: 1, color: "black", fontWeight: "800" 
    }
})