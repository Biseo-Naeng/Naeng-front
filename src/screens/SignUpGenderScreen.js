import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontStyles";
import CustomText from "../components/CustomText";
import styles from "../styles/SignUpStyle";

export default function SignUpGender() {
    const [borderBottomColor, setBorderBottomColor] = useState('lightgray');
    const [gender, setGender] = useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.titleText}>성별을 알려주세요</CustomText>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.textInputView}>
                        <CustomText fontFamily={fonts.nRegular} style={styles.placeholderText}>
                            둘 중 하나를 골라주세요
                        </CustomText>
                        <TextInput
                            style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                            value={gender}
                            placeholder="ex) 홍길동"
                            fontFamily={fonts.nBold}
                            onChangeText={(value) => setGender(value)}
                            onFocus={() => setBorderBottomColor('#71de83')}
                            onEndEditing={() => setBorderBottomColor('lightgray')}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => {
                            navigation.navigate("SignUpNumberScreen", { screen: "SignUpNumberScreen" });
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
