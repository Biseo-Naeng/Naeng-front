import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignUpBirth() {
    const [BorderBottomColor, setBorderBottomColor] = useState('lightgray');    
    const [Birth, setBirth] = useState('');
    const MiddleView = () => {
        return (
        <View
            style={styles.TextInptView}>
                <Text
                style={{
                    color: 'lightgray',
                    fontSize: 16,
                }}>이름
                </Text>
                <TextInput 
                style={styles.TextInput}
                value={Birth}
                placeholder="ex)홍길동"                               
                onChangeText={(value) => {
                    setBirth(value)
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
        <SafeAreaProvider>
            <SafeAreaView
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
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                            }}>이름을 알려주세요</Text>
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
                            }}>
                                <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>다음</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
