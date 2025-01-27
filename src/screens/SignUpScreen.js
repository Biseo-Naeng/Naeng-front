import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { fonts } from "../utils/fontStyles";
import CustomText from "../components/CustomText";
import styles from "../styles/SignUpStyle";

export default function SignUp() {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputs, setInputs] = useState({
        name: '',
        birth: '',
        email: '',
        gender: '',
        nickname: '',
        phone: '',
        password: '',
    });
    const [borderBottomColor, setBorderBottomColor] = useState('lightgray');
    const navigation = useNavigation();

    const steps = [
        { key: 'name', title: '이름을 알려주세요', placeholder: 'ex) 홍길동' },
        { key: 'birth', title: '생년월일을 알려주세요', placeholder: 'YYYYMMDD' },
        { key: 'email', title: '이메일 주소를 알려주세요', placeholder: 'example@email.com' },
        { key: 'gender', title: '성별을 선택해주세요', placeholder: '남성 / 여성' },
        { key: 'nickname', title: '닉네임을 입력해주세요', placeholder: '닉네임' },
        { key: 'phone', title: '전화번호를 입력해주세요', placeholder: '010-0000-0000' },
        { key: 'password', title: '비밀번호를 설정해주세요', placeholder: '비밀번호' },
    ];

    const handleInputChange = (value) => {
        setInputs({ ...inputs, [steps[currentStep].key]: value });
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // 회원가입 완료 처리
            navigation.navigate("SignUpComplete");
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    {steps.slice(0, currentStep).reverse().map((step, index) => (
                        <View key={index} style={styles.completedInputContainer}>
                            <CustomText style={styles.completedInputLabel}>{step.title}</CustomText>
                            <CustomText style={styles.completedInputValue}>{inputs[step.key]}</CustomText>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.titleText}>{steps[currentStep].title}</CustomText>
                </View>
                <View style={styles.textInputView}>
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[steps[currentStep].key]}
                        placeholder={steps[currentStep].placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={handleInputChange}
                        onFocus={() => setBorderBottomColor('#71de83')}
                        onEndEditing={() => setBorderBottomColor('lightgray')}
                        secureTextEntry={steps[currentStep].key === 'password'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleNext}
                    >
                        <CustomText fontFamily={fonts.nExtraBold} style={styles.buttonText}>
                            {currentStep === steps.length - 1 ? '완료' : '다음'}
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
