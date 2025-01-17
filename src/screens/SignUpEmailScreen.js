import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { fonts } from "../utils/fontStyles";
import CustomText from "../components/CustomText";

export default function SignUpEmail() {
    const [BorderBottomColor, setBorderBottomColor] = useState('lightgray');    
    const [Name, setName] = useState('');
    const navigation = useNavigation();
    const MiddleView = () => {
        return (
        <View
            style={styles.TextInptView}>
                <CustomText
                fontFamily={fonts.nRegular}
                style={{
                    color: 'lightgray',
                    fontSize: 16,
                }}>이름
                </CustomText>
                <TextInput 
                style={styles.TextInput}
                value={Name}
                placeholder="ex)홍길동"  
                fontFamily={fonts.nBold}                             
                onChangeText={(value) => {
                    setName(value)
                }}
                onFocus={() => {
                    setBorderBottomColor('#71de83')
                }}
                onEndEditing={() => {
                    setBorderBottomColor('lightgray')
                }}
                >
                </TextInput>
        </View>
    );
    };

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        TextInput: {
            padding: 0,
            margin: 0,
            width: '100%',
            height: '70%',
            backgroundColor: 'white',
            fontSize: 24,
            fontWeight: '600',
            borderBottomColor: BorderBottomColor,
            borderBottomWidth: 1,
        },
        TextInptView: {
            width: '100%',
            height: '20%',            
            marginTop: '15%',
            display: 'flex',
            justifyContent: 'center',   
        }
    });
    return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                }}>
                <View style={{
                    width: '90%',
                    height: '100%',
                    marginLeft: '5%',
                }}>
                    <View
                        style={{
                            height: '20%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                        <CustomText
                            style={{
                                fontSize: 24,
                            }}>이름을 알려주세요</CustomText>
                    </View>
                    <View
                        style={{
                            height: '50%',
                            width: '100%',
                        }}>
                            {MiddleView()}
                    </View>
                    <View
                        style={{
                            height: '30%',
                            width: '100%',  
                            display: 'flex',  
                            justifyContent: "flex-end",                      
                        }}>
                            <TouchableOpacity
                            style={{
                                backgroundColor: '#71de83',
                                borderRadius: 6,
                                margin: 10,
                                paddingVertical: 10,
                                display: 'flex',
                                alignItems: 'center',                                
                            }}
                            onPress={() => {
                                navigation.navigate("SignUpBirthScreen", {screen: "SignUpBirthScreen"})
                            }}>
                                <CustomText
                                fontFamily={fonts.nExtraBold}
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                }}>다음</CustomText>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

