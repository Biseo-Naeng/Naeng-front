import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStackParamList } from '../../App';
import Checkbox from 'expo-checkbox';

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;

export default function TermsScreen({ navigation }: Props) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const handleAllChecked = (value: boolean) => {
        setIsAllChecked(value);
        setIsChecked1(value);
        setIsChecked2(value);
        setIsChecked3(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconButton}>
                    <Ionicons name="chevron-back-outline" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>회원가입</Text>
            </View>
            <View>
                <Text style={styles.sectionTitle}>1. 약관</Text>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                </View>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                >
                <View>
                    <Text>냉비서 이용 약관</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            persistentScrollbar={true}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}>
                            <Text style={styles.content}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isChecked1}
                            onValueChange={(value) => {
                                setIsChecked1(value);
                                setIsAllChecked(value && isChecked2 && isChecked3);
                            }}
                            style={styles.checkbox}
                            color={isChecked1 ? '#1C9BEA' : undefined}
                        />
                        <Text style={styles.checkboxLabel}>동의합니다.</Text>
                    </View>
                </View>
                <View>
                    <Text>개인 정보 수집 약관</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            persistentScrollbar={true}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}>
                            <Text style={styles.content}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isChecked2}
                            onValueChange={(value) => {
                                setIsChecked2(value);
                                setIsAllChecked(value && isChecked1 && isChecked3);
                            }}
                            style={styles.checkbox}
                            color={isChecked2 ? '#1C9BEA' : undefined}
                        />
                        <Text style={styles.checkboxLabel}>동의합니다.</Text>
                    </View>
                </View>
                <View>
                    <Text>개인 정보 수집 약관</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            persistentScrollbar={true}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}>
                            <Text style={styles.content}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isChecked3}
                            onValueChange={(value) => {
                                setIsChecked3(value);
                                setIsAllChecked(value && isChecked1 && isChecked2);
                            }}
                            style={styles.checkbox}
                            color={isChecked3 ? '#1C9BEA' : undefined}
                        />
                        <Text style={styles.checkboxLabel}>동의합니다.</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={{ backgroundColor: '#979797', width: '100%', height: 1}}/>
            <View>                
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isAllChecked}
                        onValueChange={() => handleAllChecked(!isAllChecked)}
                        style={styles.checkbox}
                        color={isAllChecked ? '#1C9BEA' : undefined}
                    />
                    <Text style={styles.checkboxLabel}>전체 동의</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    disabled={!isAllChecked}
                    style={{ backgroundColor: isAllChecked ? '#1C9BEA' : '#B0C4DE', borderRadius: 20, height: 50, marginBottom: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 24 }}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    iconButton: {
        position: 'absolute',
        left: -10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressBarContainer: {
        width: '100%',
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressBar: {
        width: '33.33%',
        height: '100%',
        backgroundColor: '#1C9BEA',
    },
    scrollContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#DEE9F1',
        overflow: 'hidden',
        padding: 5,
        marginTop: 10,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
    },
});