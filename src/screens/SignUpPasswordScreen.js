import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontStyles";
import Feather from '@expo/vector-icons/Feather';
import CustomText from "../components/CustomText";
import styles from "../styles/SignUpStyle";

export default function SignUpPassword() {
    const [borderBottomColor, setBorderBottomColor] = useState('lightgray');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const navigation = useNavigation();

    const seePasswordHandler = () => {
        setSeePassword(!seePassword);
    };

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
                        <View style={{
                            flexDirection: "row",
                            borderBottomColor: borderBottomColor,
                            borderBottomWidth: 1,
                            width: '100%',
                            height: '70%',
                            backgroundColor: 'white',
                            alignItems: 'center',
                        }}>
                            <TextInput
                                style={[styles.textInput, { width: '90%', borderBottomWidth: 0,}]}
                                value={password}
                                secureTextEntry={seePassword}
                                // 폰트 적용 안됨
                                placeholder="비밀번호를 입력해주세요"
                                onChangeText={(value) => setPassword(value)}
                                onFocus={() => setBorderBottomColor('#71de83')}
                                onEndEditing={() => setBorderBottomColor('lightgray')}
                            />
                            {seePassword ? (
                                <TouchableOpacity onPress={seePasswordHandler}>
                                    <Feather name="eye" size={24} color="gray" style={{ marginLeft: 5 }} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={seePasswordHandler}>
                                    <Feather name="eye-off" size={24} color="gray" style={{ marginLeft: 5 }} />
                                </TouchableOpacity>
                            )}
                        </View>
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
