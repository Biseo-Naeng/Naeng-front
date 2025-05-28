import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';

type Props = BottomTabScreenProps<MainTabParamList, 'Recipe'>;

export default function RecipeScreen({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/로고.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
