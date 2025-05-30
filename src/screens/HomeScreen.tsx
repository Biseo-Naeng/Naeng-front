import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';
import { FontAwesome5, FontAwesome, Feather, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient';

import BottomBarContext from '../context/BottomBarContext';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const bottomBarContext = useContext(BottomBarContext);
  if (!bottomBarContext) throw new Error('BottomBarProvider로 감싸져야 합니다!');
  const { mode } = bottomBarContext;


  const data = [
    { label: '유통기한 임박순', value: 'ExpirationDate' },
    { label: '가나다순', value: 'Alphabet' },
    { label: '등록일자순', value: 'RegistrationDate' }
  ];

  const gridData = [
    {
      id: '1',
      name: '양파',
      category: '채소',
      instruction: '서늘하고 건조한 곳에 보관하세요.',
      expiration_date: '2025-06-10',
    },
    {
      id: '2',
      name: '닭가슴살',
      category: '육류',
      instruction: '냉동 보관이 필요합니다.',
      expiration_date: '2025-07-01',
    },
    {
      id: '3',
      name: '우유',
      category: '유제품',
      instruction: '개봉 후 빠르게 섭취하세요.',
      expiration_date: '2025-06-05',
    },
    {
      id: '4',
      name: '달걀',
      category: '계란',
      instruction: '냉장 보관이 적합합니다.',
      expiration_date: '2025-06-12',
    },
    {
      id: '5',
      name: '사과',
      category: '과일',
      instruction: '상온 또는 냉장 보관이 가능합니다.',
      expiration_date: '2025-06-20',
    },

  ];


  const [sortOrder, setSortOrder] = useState<string>('ExpirationDate')
  const categories = ['냉동', '냉장', '실온', '조미료'] as const;
  type Category = typeof categories[number];
  const [selectedCategory, setSelectedCategory] = useState<Category>('냉동');

  const gradientColors = {
    냉동: ['#ACD6FF', '#75B5F3'] as const,
    냉장: ['#53B7FF', '#75B5F3'] as const,
    실온: ['#CF8B4F', '#DEC0A5'] as const,
    조미료: ['#E05F1A', '#FFAD98'] as const,
  };

  const fontColors = {
    냉동: '#4761E1',
    냉장: '#0092FF',
    실온: '#BC6417',
    조미료: '#E05F1A'
  }

  const dropboxColors = {
    냉동: '#CBE6FE',
    냉장: '#ABD2F8',
    실온: '#E2BA97',
    조미료: '#EDA179'
  }

  const dropboxFontColors = {
    냉동: '#354893',
    냉장: '#172B7D',
    실온: '#8D3600',
    조미료: '#6C0000'
  }

  const addButtonColors = {
    냉동: '#176ABA',
    냉장: '#1B6196',
    실온: '#825024',
    조미료: '#A4421A'
  }

  const handleNextCategory = () => {
    const currentIndex = categories.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setSelectedCategory(categories[nextIndex]);
  };

  const handlePrevCategory = () => {
    const currentIndex = categories.indexOf(selectedCategory);
    const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
    setSelectedCategory(categories[prevIndex]);
  };


  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 20 }}>Home</Text>
        <FontAwesome5 name="bell" size={28} color="black" />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handlePrevCategory()}
          style={{  }}>
          <FontAwesome name="angle-left" size={32} color="black" />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', width: '90%', height: '95%', }}>
          <LinearGradient
            colors={gradientColors[selectedCategory]}
            style={{ height: '90%', width: '90%', borderRadius: 20 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>
                {selectedCategory}
              </Text>
              <Dropdown
                style={{
                  padding: 5,
                  width: 120,
                  backgroundColor: dropboxColors[selectedCategory],
                  borderRadius: 15,
                  position: 'absolute',
                  right: 5,
                  top: 30
                }}
                data={data}
                labelField="label"
                valueField="value"
                placeholder=""
                placeholderStyle={{ fontSize: 10, color: '#354893' }}
                value={sortOrder}
                onChange={item => setSortOrder(item.value)}
                itemTextStyle={{
                  fontSize: 10,
                  color: dropboxFontColors[selectedCategory],
                  lineHeight: 12,
                }}
                selectedTextStyle={{
                  fontSize: 10,
                  color: dropboxFontColors[selectedCategory],
                  lineHeight: 12,
                }}
                containerStyle={{
                  backgroundColor: dropboxColors[selectedCategory],
                  borderRadius: 15,
                }}
                itemContainerStyle={{
                  minHeight: 30,
                  justifyContent: 'center',
                }}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <FlatList
                data={gridData}
                numColumns={3}
                renderItem={({ item }) => (
                  <View style={{ backgroundColor: '#fff', margin: 7, padding: 10, borderRadius: 15, width: 85, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{item.name}</Text>
                    <Text style={{ fontSize: 10 }}>{item.expiration_date}</Text>
                  </View>
                  // sortOrder 값에 따라 텍스트 변경해야함 -> api 나오면 가능
                )}
                // keyExtractor는 반드시 문자열을 반환해야함
                // flatlist의 각 아이템을 고유하게 식별할 key값을 추출
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginTop: 20 }}
              />
            </View>
            <View>
              <TouchableOpacity style={{ backgroundColor: addButtonColors[selectedCategory], alignItems: 'center', borderRadius: 10, margin: 15 }}>
                <Feather name="plus" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

          </LinearGradient>
        </View>
        <TouchableOpacity onPress={() => handleNextCategory()}
          style={{ }}>
          <FontAwesome name="angle-right" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -55 }}>
        <TouchableOpacity onPress={() => setSelectedCategory('냉동')}
          style={{ marginHorizontal: 20 }}>
          {mode == 'korean' &&
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '냉동' ? fontColors[selectedCategory] : '#000' }}>냉동</Text>}
          {mode == 'icon' &&
            <FontAwesome5 name="snowflake" size={24} color="black" />}
        </TouchableOpacity>
        <Entypo name="minus" size={7} color="black" />
        <TouchableOpacity onPress={() => setSelectedCategory('냉장')}
          style={{ marginHorizontal: 20 }}>
          {mode == 'korean' &&
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '냉장' ? fontColors[selectedCategory] : '#000' }}>냉장</Text>}
          {mode == 'icon' &&
            <FontAwesome6 name="temperature-empty" size={24} color="black" />}
        </TouchableOpacity>
        <Entypo name="minus" size={7} color="black" />
        <TouchableOpacity onPress={() => setSelectedCategory('실온')}
          style={{ marginHorizontal: 20 }}>
          {mode == 'korean' &&
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '실온' ? fontColors[selectedCategory] : '#000' }}>실온</Text>}
          {mode == 'icon' &&
            <Feather name="archive" size={24} color="black" />}
        </TouchableOpacity>
        <Entypo name="minus" size={7} color="black" />
        <TouchableOpacity onPress={() => setSelectedCategory('조미료')}
          style={{ marginHorizontal: 20 }}>
          {mode == 'korean' &&
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '조미료' ? fontColors[selectedCategory] : '#000' }}>조미료</Text>}
          {mode == 'icon' &&
            <FontAwesome6 name="jar" size={24} color="black" />}
        </TouchableOpacity>
      </View>
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
