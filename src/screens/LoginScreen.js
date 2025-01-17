import React from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    useWindowDimensions,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/LoginStyle"
import CustomText from "../components/CustomText";
import { fonts } from "../utils/fontStyles";

export default function LoginScreen() {
    const { width, height } = useWindowDimensions();
    const frameSize = Math.sqrt(width * width + height * height);
    const fontSize = frameSize * 0.07;
    const marginHorizontal = width * 0.01;
    const containerPadding = height * 0.01;

    const navigation = useNavigation();

    return (
        <View style={[styles.container, { padding: containerPadding }]}>
            <View style={[styles.titleContainer, { marginHorizontal }]}>
                <Text style={[styles.title, { fontSize }]}>We’ll take</Text>
                <Text style={[styles.title, { fontSize }]}>care of</Text>
                <Text style={[styles.title, { fontSize }]}>your</Text>
                <Text style={[styles.title, { fontSize }]}>refrigerator</Text>
            </View>
            <View style={[styles.loginContainer, { padding: containerPadding }]}>
                <View style={styles.inputGroup}>
                    <CustomText fontFamily={fonts.nBold}>Email:</CustomText>
                    <TextInput
                        style={styles.input}
                        placeholder="이메일을 입력하세요."
                        keyboardType="email-address"
                        fontFamily={fonts.nBold}
                    />
                </View>
                <View style={styles.inputGroup}>
                <CustomText fontFamily={fonts.nBold}>Password:</CustomText>
                    <TextInput
                        style={styles.input}
                        placeholder="비밀번호를 입력하세요."
                        secureTextEntry
                        fontFamily={fonts.nBold}
                    />
                </View>
                <Button title="Login" onPress={() => alert("Logged in")} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpNameScreen', {screen: 'SignUpNameScreen'})}
                style={[styles.button, { marginTop: 10 }]}>
                <Text style={styles.buttonText}>Go to Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MainScreen', {screen: 'MainScreen'})}
                style={[styles.button, { marginTop: 10 }]}>
                <Text style={styles.buttonText}>Main(임시)</Text>
            </TouchableOpacity>

        </View>
    );
}
