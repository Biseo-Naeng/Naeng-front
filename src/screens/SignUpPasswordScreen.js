import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontStyles";
import CustomText from "../components/CustomText";
import styles from "../styles/SignUpStyle";

export default function SignUpPassword() {
    const [borderBottomColor, setBorderBottomColor] = useState('lightgray');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.titleText}>비밀번호를 입력해주세요</CustomText>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.textInputView}>
                        <CustomText fontFamily={fonts.nRegular} style={styles.placeholderText}>
                            비밀번호
                        </CustomText>
                        <TextInput
                            style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                            value={password}
                            secureTextEntry={true}
                            fontFamily={fonts.nBold}
                            onChangeText={(value) => setPassword(value)}
                            onFocus={() => setBorderBottomColor('#71de83')}
                            onEndEditing={() => setBorderBottomColor('lightgray')}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => {
                            navigation.navigate("SignUpNameScreen", { screen: "SignUpNameScreen" });
                        }}
                    >
                        <CustomText fontFamily={fonts.nExtraBold} style={styles.buttonText}>
                            다음
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
