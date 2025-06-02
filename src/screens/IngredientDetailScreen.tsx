import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, {DateTimePickerEvent,} from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';


interface Ingredient {
  name: string;
  category: '냉동' | '냉장' | '실온' | '조미료';
  description: string;
  expiry: string; 
}

const IngredientDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const onAdd = route.params?.onAdd as ((item: Ingredient) => void) | undefined;

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Ingredient['category'] | ''>('');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // 이름: 한글만, 최대 10자
  const handleChangeName = (text: string) => {
  setName(text.slice(0, 10));
  };


  // 설명: 최대 50자
  const handleChangeDescription = (text: string) => {
    setDescription(text.slice(0, 50));
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value as Ingredient['category']);
  };

  const handleChangeDate = (
  event: DateTimePickerEvent,
  selectedDate?: Date
  ) => {
  setShowPicker(Platform.OS === 'ios');
  if (selectedDate) {
    setExpiryDate(selectedDate);
    }
  };


  const isFormValid =
    name.length > 0 &&
    category !== '' &&
    description.length > 0 &&
    !!expiryDate;

  const handleAdd = () => {
    if (!isFormValid) {
      return;
    }
    const item: Ingredient = {
      name,
      category,
      description,
      expiry: expiryDate.toISOString().split('T')[0],
    };
    if (onAdd) {
      onAdd(item);
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <Text style={styles.title}>재료 상세</Text>

        <View style={styles.field}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleChangeName}
            placeholder="재료 이름"
          />
          <Text style={styles.counter}>{name.length} / 10</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>카테고리</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={handleChangeCategory}
            >
              <Picker.Item label="선택하세요" value="" />
              <Picker.Item label="냉동" value="냉동" />
              <Picker.Item label="냉장" value="냉장" />
              <Picker.Item label="실온" value="실온" />
              <Picker.Item label="조미료" value="조미료" />
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>설명</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={handleChangeDescription}
            placeholder="재료 설명"
          />
          <Text style={styles.counter}>{description.length} / 50</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>파기일</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text>{expiryDate.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={expiryDate}
              mode="date"
              display="default"
              onChange={handleChangeDate}
            />
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleAdd}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IngredientDetailScreen;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
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
    borderRadius: 4,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
