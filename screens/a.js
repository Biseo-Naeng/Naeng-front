import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";

function a() {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Start!</Text>
      <Button 
        title="go to main" 
        onPress={() => navigation.navigate('b')}
      />
    </View>
  );
}

export default a;