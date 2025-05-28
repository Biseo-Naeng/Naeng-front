import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={{ flex: 1, backgroundColor: "#fff" }}
                    >
                        <View style={{alignItems: 'center', height: 70}}>
                            {/* 활성화된 탭에만 상단 바 렌더링 */}
                            {isFocused && (
                                <View style={{ height: 4, backgroundColor: '#455BE2', width: '100%', borderRadius: 20, marginBottom: 3 }} />
                            )}
                            {!isFocused && (
                                <View style={{ height: 4,  marginBottom: 3 }} />
                            )}
                            {/* 아이콘과 라벨 등 */}
                            {options.tabBarIcon &&
                                options.tabBarIcon({
                                    color: isFocused ? '#455BE2' : 'gray',
                                    size: 40,
                                    focused: isFocused,
                                })}
                            <Text style={{ color: isFocused ? '#455BE2' : 'gray', textAlign: 'center', fontSize: 12 }}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MyTabBar;
