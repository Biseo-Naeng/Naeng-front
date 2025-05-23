import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomToggle({
    leftText = "한글",
    rightText = "아이콘",
    width = 140,
    height = 40,
    onToggle,
    initial = true,
}) {
    const [isLeft, setIsLeft] = useState(initial);
    const animValue = useRef(new Animated.Value(initial ? 0 : 1)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: isLeft ? 0 : 1,
            duration: 180,
            useNativeDriver: false,
        }).start();
        onToggle?.(isLeft);
    }, [isLeft]);

    const thumbWidth = width / 2;
    const thumbTranslate = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, thumbWidth],
    });

    return (
        <Pressable
            style={[
                styles.container,
                {
                    width,
                    height,
                    borderRadius: height / 2,
                    backgroundColor: '#E5E5E5',
                }
            ]}
            onPress={() => setIsLeft((prev) => !prev)}
        >
            {/* 위아래 inner shadow */}
            <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.15)']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: height / 2,
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />
            {/* 좌우 inner shadow */}
            <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.15)']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: height / 2,
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            />
            {/* 텍스트 항상 표시 */}
            <View style={styles.textRow}>
                <Text
                    style={[
                        styles.sideText,
                        {
                            color: isLeft ? '#fff' : '#455BE2',
                            fontWeight: isLeft ? 'bold' : 'normal',
                        }
                    ]}
                >
                    {leftText}
                </Text>
                <Text
                    style={[
                        styles.sideText,
                        {
                            color: !isLeft ? '#fff' : '#455BE2',
                            fontWeight: !isLeft ? 'bold' : 'normal',
                        }
                    ]}
                >
                    {rightText}
                </Text>
            </View>
            {/* Thumb */}
            <Animated.View
                style={[
                    styles.thumb,
                    {
                        width: thumbWidth,
                        height: height,
                        borderRadius: height / 2,
                        backgroundColor: '#455BE2',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: [{ translateX: thumbTranslate }],
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 6,
                        elevation: 8,
                        zIndex: 1,
                    },
                ]}
                pointerEvents="none"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
    },
    textRow: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    sideText: {
        fontSize: 16,
        width: '50%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    thumb: {
        zIndex: 1,
        position: 'absolute',
    },
});