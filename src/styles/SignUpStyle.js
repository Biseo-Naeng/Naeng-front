import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    innerContainer: {
        width: '90%',
        height: '100%',
        marginLeft: '5%',
    },
    titleContainer: {
        height: '20%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    titleText: {
        fontSize: 24,
    },
    inputContainer: {
        height: '50%',
        width: '100%',
    },
    textInputView: {
        width: '100%',
        height: '20%',
        marginTop: '15%',
        display: 'flex',
        justifyContent: 'center',
    },
    placeholderText: {
        color: 'lightgray',
        fontSize: 16,
    },
    textInput: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        fontSize: 24,
        fontWeight: '600',
        borderBottomWidth: 1,
    },
    buttonContainer: {
        height: '30%',
        width: '100%',
        display: 'flex',
        justifyContent: "flex-end",
    },
    nextButton: {
        backgroundColor: '#71de83',
        borderRadius: 6,
        margin: 10,
        paddingVertical: 10,
        display: 'flex',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
