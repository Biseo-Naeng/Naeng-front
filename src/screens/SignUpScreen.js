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
    const [textColor, setTextColor] = useState('lightgray')
    const navigation = useNavigation();

    const steps = [
        { key: 'name', title: '이름', placeholder: 'ex) 홍길동' },
        { key: 'birth', title: '생년월일', placeholder: 'YYYYMMDD' },
        { key: 'email', title: '이메일', placeholder: 'example@email.com' },
        { key: 'gender', title: '성별', placeholder: '남성 / 여성' },
        { key: 'nickname', title: '닉네임', placeholder: '닉네임' },
        { key: 'phone', title: '전화번호', placeholder: '010-0000-0000' },
        { key: 'password', title: '비밀번호', placeholder: '비밀번호' },
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

    const renderInput = (step, inputs, handleInputChange, borderBottomColor, setTextColor, setBorderBottomColor) => {
        switch (step.key) {
            case 'name':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                    />
                )
            case 'email':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                    />
                );
            case 'phone':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                    />
                );
            case 'nickname':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                    />
                );
            case 'birth':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                    />
                );
            case 'gender':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                    />
                );
            case 'password':
                return (
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[step.key]}
                        placeholder={step.placeholder}
                        onChangeText={(text) => handleInputChange(step.key, text)}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                        secureTextEntry={true}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View
            style={styles.container}
        >
            <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.titleText}>회원가입을 위해 입력해주세요!</CustomText>
                </View>
                <View style={styles.textInputView}>
                    <CustomText fontFamily={fonts.nRegular} style={[styles.placeholderText, { color: textColor }]}>
                        {steps[currentStep].title}
                    </CustomText>
                    <TextInput
                        style={[styles.textInput, { borderBottomColor: borderBottomColor }]}
                        value={inputs[steps[currentStep].key]}
                        placeholder={steps[currentStep].placeholder}
                        fontFamily={fonts.nBold}
                        onChangeText={handleInputChange}
                        onFocus={() => {
                            setBorderBottomColor('#71de83');
                            setTextColor('#71de83');
                        }}
                        onEndEditing={() => {
                            setBorderBottomColor('lightgray');
                            setTextColor('lightgray');
                        }}
                        secureTextEntry={steps[currentStep].key === 'password'}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {steps.slice(0, currentStep).map((step, index) => (
                        <View key={index} style={styles.textInputView}>
                            <CustomText fontFamily={fonts.nRegular} style={[styles.placeholderText, { color: textColor }]}>
                                {step.title}
                            </CustomText>
                            {renderInput(step, inputs, handleInputChange, borderBottomColor, setTextColor, setBorderBottomColor)}
                        </View>
                    ))}
                </ScrollView>
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
        </View>
    );
}
