import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../App';
import { FontAwesome5, FontAwesome, Feather, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import BottomBarContext from '../context/BottomBarContext';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

interface Ingredient {
  id: string; // Added for FlatList keyExtractor (used for registration date as well)
  name: string;
  category: string;
  instruction: string; // Changed from 'description' to 'instruction' to match initial gridData
  expiration_date: string;
}

export default function HomeScreen({ navigation }: Props) {
  const bottomBarContext = useContext(BottomBarContext);
  if (!bottomBarContext) throw new Error('BottomBarProvider로 감싸져야 합니다!');
  const { mode } = bottomBarContext;

  const [isAddIngredientModalVisible, setIsAddIngredientModalVisible] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  // New states for multi-select
  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);

  const data = [
    { label: '유통기한 임박순', value: 'ExpirationDate' },
    { label: '가나다순', value: 'Alphabet' },
    { label: '등록일자순', value: 'RegistrationDate' },
  ];

  const [gridData, setGridData] = useState<Ingredient[]>([
    {
      id: '1717395000000', // Example timestamp-like ID for 'RegistrationDate' sorting
      name: '양파',
      category: '실온',
      instruction: '서늘하고 건조한 곳에 보관하세요.',
      expiration_date: '2025-06-10',
    },
    {
      id: '1717396000000',
      name: '닭가슴살',
      category: '냉동',
      instruction: '냉동 보관이 필요합니다.',
      expiration_date: '2025-07-01',
    },
    {
      id: '1717397000000',
      name: '우유',
      category: '냉장',
      instruction: '개봉 후 빠르게 섭취하세요.',
      expiration_date: '2025-06-05',
    },
    {
      id: '1717398000000',
      name: '달걀',
      category: '냉장',
      instruction: '냉장 보관이 적합합니다.',
      expiration_date: '2025-06-12',
    },
    {
      id: '1717399000000',
      name: '사과',
      category: '실온',
      instruction: '상온 또는 냉장 보관이 가능합니다.',
      expiration_date: '2025-06-20',
    },
  ]);

  const [sortOrder, setSortOrder] = useState<string>('ExpirationDate');
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
    조미료: '#E05F1A',
  };

  const dropboxColors = {
    냉동: '#CBE6FE',
    냉장: '#ABD2F8',
    실온: '#E2BA97',
    조미료: '#EDA179',
  };

  const dropboxFontColors = {
    냉동: '#354893',
    냉장: '#172B7D',
    실온: '#8D3600',
    조미료: '#6C0000',
  };

  const addButtonColors = {
    냉동: '#176ABA',
    냉장: '#1B6196',
    실온: '#825024',
    조미료: '#A4421A',
  };

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

  const [name, setName] = useState('');
  const [modalCategory, setModalCategory] = useState<Ingredient['category'] | ''>('');
  const [instruction, setInstruction] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (selectedIngredient) {
      setName(selectedIngredient.name);
      setModalCategory(selectedIngredient.category);
      setInstruction(selectedIngredient.instruction);
      setExpiryDate(new Date(selectedIngredient.expiration_date));
    } else {
      setName('');
      setModalCategory('');
      setInstruction('');
      setExpiryDate(new Date());
    }
  }, [selectedIngredient]);

  const handleChangeName = (text: string) => {
    setName(text.slice(0, 10));
  };

  const handleChangeInstruction = (text: string) => {
    setInstruction(text.slice(0, 50));
  };

  const handleChangeCategory = (value: string) => {
    setModalCategory(value);
  };

  const handleChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpiryDate(selectedDate);
    }
  };

  const isFormValid = name.length > 0 && modalCategory !== '' && !!expiryDate;

  const handleAddIngredient = () => {
    setSelectedIngredient(null);
    setIsAddIngredientModalVisible(true);
  };

  // Modified handleItemPress for single item view/edit or multi-select toggle
  const handleItemPress = (item: Ingredient) => {
    if (isMultiSelectMode) {
      toggleMultiSelect(item.id);
    } else {
      setSelectedIngredient(item);
      setIsAddIngredientModalVisible(true);
    }
  };

  // New function to handle long press
  const handleItemLongPress = (item: Ingredient) => {
    if (!isMultiSelectMode) {
      setIsMultiSelectMode(true);
      setSelectedIngredientIds([item.id]);
      setSelectedIngredient(null); // Clear selected ingredient when entering multi-select
    } else {
      toggleMultiSelect(item.id);
    }
  };

  // Function to toggle selection for multi-select mode
  const toggleMultiSelect = (id: string) => {
    setSelectedIngredientIds(prevSelected => {
      if (prevSelected.includes(id)) {
        const newSelection = prevSelected.filter(itemId => itemId !== id);
        if (newSelection.length === 0) {
          setIsMultiSelectMode(false); // Exit multi-select if no items are selected
        }
        return newSelection;
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const onAddNewIngredient = (item: Ingredient) => {
    setGridData(prevData => [...prevData, { ...item, id: Date.now().toString() }]);
    setIsAddIngredientModalVisible(false);
  };

  const onSaveIngredient = (updatedItem: Ingredient) => {
    setGridData(prevData =>
      prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    setIsAddIngredientModalVisible(false);
  };

  const onDeleteIngredient = (id: string) => {
    Alert.alert(
      '재료 삭제',
      '정말로 이 재료를 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            setGridData(prevData => prevData.filter(item => item.id !== id));
            setIsAddIngredientModalVisible(false);
            setSelectedIngredient(null);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  // New function for batch deletion
  const handleDeleteSelectedIngredients = () => {
    Alert.alert(
      '선택된 재료 삭제',
      `선택된 재료 ${selectedIngredientIds.length}개를 삭제하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            setGridData(prevData =>
              prevData.filter(item => !selectedIngredientIds.includes(item.id))
            );
            setSelectedIngredientIds([]);
            setIsMultiSelectMode(false);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handlePrimaryAction = () => {
    if (!isFormValid) {
      return;
    }
    const itemData: Ingredient = {
      id: selectedIngredient ? selectedIngredient.id : Date.now().toString(),
      name,
      category: modalCategory as Category,
      instruction,
      expiration_date: expiryDate.toISOString().split('T')[0],
    };

    if (selectedIngredient) {
      onSaveIngredient(itemData);
    } else {
      onAddNewIngredient(itemData);
    }
  };

  const handleCancel = () => {
    setIsAddIngredientModalVisible(false);
    setSelectedIngredient(null);
    // If we're in multi-select mode and close the modal (which shouldn't happen if modal is for single select),
    // we should consider if we need to exit multi-select as well, or just reset selectedIngredient.
    // For now, modal is only for single-select, so no impact on multi-select.
  };

  const categoryData = [
    { label: '냉동실', value: '냉동' },
    { label: '냉장실', value: '냉장' },
    { label: '실온', value: '실온' },
    { label: '조미료', value: '조미료' },
  ];

  const filteredGridData = gridData.filter(item => item.category === selectedCategory);

  const sortedGridData = [...filteredGridData].sort((a, b) => {
    if (sortOrder === 'ExpirationDate') {
      return new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime();
    } else if (sortOrder === 'Alphabet') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'RegistrationDate') {
      return parseInt(a.id) - parseInt(b.id);
    }
    return 0;
  });

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#fff',
        }}>
        <Text style={{ fontSize: 20 }}>Home</Text>
        <FontAwesome5 name="bell" size={28} color="black" />
      </View>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handlePrevCategory()}>
          <FontAwesome name="angle-left" size={32} color="black" />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', width: '90%', height: '95%' }}>
          <LinearGradient
            colors={gradientColors[selectedCategory]}
            style={{ height: '90%', width: '90%', borderRadius: 20 }}>
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
                  top: 30,
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
            <View style={{ flex: 1, marginLeft: 10 }}>
              <FlatList
                data={sortedGridData}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      margin: 7,
                      padding: 10,
                      borderRadius: 15,
                      width: 85,
                      height: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: isMultiSelectMode && selectedIngredientIds.includes(item.id) ? 2 : 0,
                      borderColor: isMultiSelectMode && selectedIngredientIds.includes(item.id) ? '#455BE2' : 'transparent',
                    }}
                    onPress={() => handleItemPress(item)}
                    onLongPress={() => handleItemLongPress(item)}>
                    {isMultiSelectMode && selectedIngredientIds.includes(item.id) && (
                      <View style={{ position: 'absolute', top: 5, right: 5 }}>
                        <FontAwesome name="check-circle" size={20} color="#455BE2" />
                      </View>
                    )}
                    <Text>{item.name}</Text>
                    <Text style={{ fontSize: 10 }}>
                      {sortOrder === 'ExpirationDate' && item.expiration_date}
                      {sortOrder === 'Alphabet' && item.expiration_date}
                      {sortOrder === 'RegistrationDate' &&
                        new Date(parseInt(item.id)).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginTop: 20 }}
              />
            </View>
            <View>
              {isMultiSelectMode ? (
                <TouchableOpacity
                  onPress={handleDeleteSelectedIngredients}
                  disabled={selectedIngredientIds.length === 0}
                  style={{
                    backgroundColor: selectedIngredientIds.length === 0 ? '#aaa' : addButtonColors[selectedCategory],
                    alignItems: 'center',
                    borderRadius: 10,
                    margin: 15,
                  }}>
                  <Text style={{ color: '#fff', fontSize: 18, paddingVertical: 5 }}>
                    삭제 ({selectedIngredientIds.length})
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAddIngredient()}
                  style={{
                    backgroundColor: addButtonColors[selectedCategory],
                    alignItems: 'center',
                    borderRadius: 10,
                    margin: 15,
                  }}>
                  <Feather name="plus" size={28} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>
        <TouchableOpacity onPress={() => handleNextCategory()}>
          <FontAwesome name="angle-right" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -55 }}>
        <TouchableOpacity onPress={() => setSelectedCategory('냉동')} style={{ marginHorizontal: 20 }}>
          {mode == 'korean' && (
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '냉동' ? fontColors[selectedCategory] : '#000' }}>
              냉동
            </Text>
          )}
          {mode == 'icon' && (
            <FontAwesome5
              name="snowflake"
              size={24}
              color={selectedCategory == '냉동' ? fontColors[selectedCategory] : '#000'}
            />
          )}
        </TouchableOpacity>
        <Entypo name="minus" size={7} color="black" />
        <TouchableOpacity onPress={() => setSelectedCategory('냉장')} style={{ marginHorizontal: 20 }}>
          {mode == 'korean' && (
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '냉장' ? fontColors[selectedCategory] : '#000' }}>
              냉장
            </Text>
          )}
          {mode == 'icon' && (
            <FontAwesome6
              name="temperature-empty"
              size={24}
              color={selectedCategory == '냉장' ? fontColors[selectedCategory] : '#000'}
            />
          )}
        </TouchableOpacity>
        <Entypo name="minus" size={7} color="black" />
        <TouchableOpacity onPress={() => setSelectedCategory('실온')} style={{ marginHorizontal: 20 }}>
          {mode == 'korean' && (
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '실온' ? fontColors[selectedCategory] : '#000' }}>
              실온
            </Text>
          )}
          {mode == 'icon' && (
            <Feather
              name="archive"
              size={24}
              color={selectedCategory == '실온' ? fontColors[selectedCategory] : '#000'}
            />
          )}
        </TouchableOpacity>
        <Entypo name="minus" size={7} color="black" />
        <TouchableOpacity onPress={() => setSelectedCategory('조미료')} style={{ marginHorizontal: 20 }}>
          {mode == 'korean' && (
            <Text style={{ fontWeight: 'bold', color: selectedCategory == '조미료' ? fontColors[selectedCategory] : '#000' }}>
              조미료
            </Text>
          )}
          {mode == 'icon' && (
            <FontAwesome6
              name="jar"
              size={24}
              color={selectedCategory == '조미료' ? fontColors[selectedCategory] : '#000'}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Add/Detail Ingredient Modal */}
      <Modal animationType="fade" transparent={true} visible={isAddIngredientModalVisible} onRequestClose={handleCancel}>
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.title}>재료 {selectedIngredient ? '상세' : '추가'}</Text>

            <View style={modalStyles.field}>
              <TextInput
                style={modalStyles.input}
                value={name}
                onChangeText={handleChangeName}
                placeholder="이름"
                placeholderTextColor="#A5B2B9"
              />
            </View>

            <View style={modalStyles.field}>
              <View style={modalStyles.pickerWrapper}>
                <Dropdown
                  style={{
                    padding: 8,
                  }}
                  data={categoryData}
                  labelField="label"
                  valueField="value"
                  placeholder="카테고리"
                  placeholderStyle={{ fontSize: 14, color: '#A5B2B9' }}
                  value={modalCategory}
                  onChange={item => handleChangeCategory(item.value)}
                  itemTextStyle={{
                    fontSize: 14,
                  }}
                  selectedTextStyle={{
                    fontSize: 14,
                  }}
                  itemContainerStyle={{
                    minHeight: 30,
                    justifyContent: 'center',
                  }}
                />
              </View>
            </View>

            <View style={modalStyles.field}>
              <TextInput
                style={[modalStyles.input, { height: 70 }]}
                value={instruction}
                onChangeText={handleChangeInstruction}
                placeholder="설명"
                placeholderTextColor="#A5B2B9"
                multiline={true}
              />
            </View>

            <View style={modalStyles.field}>
              <TouchableOpacity style={modalStyles.dateButton} onPress={() => setShowPicker(true)}>
                <Text
                  style={
                    expiryDate.toDateString() === new Date().toDateString() && !selectedIngredient?.expiration_date
                      ? { color: '#999' }
                      : { color: '#000' }
                  }>
                  {expiryDate.toDateString() === new Date().toDateString() && !selectedIngredient?.expiration_date
                    ? '파기일'
                    : expiryDate.toISOString().split('T')[0]}
                </Text>
                <Feather name="calendar" size={20} color="#A5B2B9" style={{ marginLeft: 'auto' }} />
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker value={expiryDate} mode="date" display="default" onChange={handleChangeDate} />
              )}
            </View>

            {selectedIngredient && (
              <View style={modalStyles.field}>
                <Text style={modalStyles.label}>등록일자</Text>
                <Text style={modalStyles.displayOnlyText}>
                  {new Date(parseInt(selectedIngredient.id)).toLocaleDateString()}
                </Text>
              </View>
            )}

            <View style={modalStyles.buttonRow}>
              <TouchableOpacity
                style={[modalStyles.button, !isFormValid && modalStyles.buttonDisabled]}
                onPress={handlePrimaryAction}
                disabled={!isFormValid}>
                <Text style={modalStyles.buttonText}>{selectedIngredient ? '저장' : '추가'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[modalStyles.button, modalStyles.cancelButton]} onPress={handleCancel}>
                <Text style={modalStyles.buttonText}>취소</Text>
              </TouchableOpacity>
              {selectedIngredient && (
                <TouchableOpacity
                  style={[modalStyles.button, modalStyles.deleteButton]}
                  onPress={() => onDeleteIngredient(selectedIngredient.id)}>
                  <Text style={modalStyles.buttonText}>삭제</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  field: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 40,
    color: '#000',
  },
  counter: {
    marginTop: 2,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#455BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  cancelButton: {
    backgroundColor: '#777',
  },
  deleteButton: {
    backgroundColor: '#E05F1A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  displayOnlyText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    color: '#555',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});