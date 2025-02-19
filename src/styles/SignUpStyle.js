import { StyleSheet } from "react-native";
import { fonts } from "../utils/fontStyles";

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    },
    titleContainer: {
        height: '20%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'orange',
    },
    titleText: {
        fontSize: 24,
    },
    inputContainer: {
        height: '100%',
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'yellow',
    },
    textInputView: {
        width: '100%',
        height: '10%',
        marginTop: '10%',
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
    scrollView: {
        maxHeight: '50%',
        backgroundColor: 'black'
    },
    completedInputContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    completedInputLabel: {
        fontSize: 14,
        color: '#888',
    },
    completedInputValue: {
        fontSize: 16,
        marginTop: 5,
        fontFamily: fonts.nBold,
    },
    completedTextInputView: {
        width: '100%',
        height: '40%',
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
    },
});
