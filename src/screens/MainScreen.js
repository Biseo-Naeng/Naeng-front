import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  TextInput,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles/MainStyle";

export default function MainScreen() {
  // 카테고리별 섹션명을 매핑
  const categoryToSectionMap = {
    냉동: "냉동실",
    냉장: "냉장실",
    실온: "실온칸",
    조미료: "조미료칸",
  };

  // 메인 data
  const [sectionsData, setSectionsData] = useState([
    {
      section: "냉동실",
      items: [
        {
          id: "1",
          name: "고기",
          instruction: "Meat",
          expiration_date: "2025-01-02",
        },
        { id: "2", name: "얼음", instruction: "Ice", expiration_date: "" },
        { id: "7", name: "만두", instruction: "Dumpling", expiration_date: "" },
        { id: "8", name: "새우", instruction: "Shrimp", expiration_date: "" },
      ],
    },
    {
      section: "냉장실",
      items: [
        {
          id: "3",
          name: "우유",
          instruction: "Milk",
          expiration_date: "2025-01-02",
        },
        { id: "4", name: "토마토", instruction: "Tomato", expiration_date: "" },
        { id: "9", name: "치즈", instruction: "Cheese", expiration_date: "" },
      ],
    },
    {
      section: "실온칸",
      items: [
        { id: "5", name: "라면", instruction: "Ramen", expiration_date: "" },
        {
          id: "6",
          name: "참기름",
          instruction: "Sesame Oil",
          expiration_date: "",
        },
        {
          id: "10",
          name: "통조림",
          instruction: "Canned Food",
          expiration_date: "",
        },
        { id: "11", name: "과자", instruction: "Snacks", expiration_date: "" },
      ],
    },
    {
      section: "조미료칸",
      items: [],
    },
  ]);

  // '더보기' 모달 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSectionTitle, setModalSectionTitle] = useState("");
  const [modalItems, setModalItems] = useState([]);

  // '재료 추가' 모달 상태
  const [addModalVisible, setAddModalVisible] = useState(false);

  // 새 재료 입력 상태
  const [newItemName, setNewItemName] = useState("");
  const [newItemInstruction, setNewItemInstruction] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("냉동");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [newItemExpirationDate, setNewItemExpirationDate] = useState(null);

  // '아이템 수정' 모달 상태
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editSectionIndex, setEditSectionIndex] = useState(null);
  const [editItemIndex, setEditItemIndex] = useState(null);

  // ---------- 함수들 ----------

  // (1) '더보기' 버튼 -> 모달 열기
  const handleShowMore = (sectionTitle, items) => {
    setModalSectionTitle(sectionTitle);
    setModalItems(items);
    setModalVisible(true);
  };

  // (2) '재료 추가' 버튼 -> 모달 열기
  const handleOpenAddModal = () => {
    setNewItemName("");
    setNewItemInstruction("");
    setNewItemCategory("냉동");
    setNewItemExpirationDate(null);
    setAddModalVisible(true);
  };

  // 카테고리를 섹션 인덱스로 변환
  const findSectionIndexByCategory = (data, category) => {
    const targetSectionName = categoryToSectionMap[category] || "기타";
    return data.findIndex((sec) => sec.section === targetSectionName);
  };

  // 새 아이템 추가
  const handleAddNewItem = () => {
    const formattedDate =
      newItemExpirationDate instanceof Date
        ? formatDate(newItemExpirationDate)
        : "";

    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      instruction: newItemInstruction,
      expiration_date: formattedDate,
    };

    setSectionsData((prevData) => {
      const sectionIndex = findSectionIndexByCategory(
        prevData,
        newItemCategory
      );
      if (sectionIndex === -1) {
        // '기타' 섹션이 없으면 만들어줌
        return [...prevData, { section: "기타", items: [newItem] }];
      }
      const updatedData = [...prevData];
      updatedData[sectionIndex] = {
        ...updatedData[sectionIndex],
        items: [...updatedData[sectionIndex].items, newItem],
      };
      return updatedData;
    });

    setAddModalVisible(false);
  };

  // 아이템을 탭했을 때 -> 수정 모달 열기
  const handleEditPress = (item, sectionIndex, itemIndex) => {
    setEditItem({ ...item });
    setEditSectionIndex(sectionIndex);
    setEditItemIndex(itemIndex);
    setEditModalVisible(true);
  };

  // 수정 저장
  const handleSaveEdit = () => {
    const formattedDate =
      editItem?.expiration_date instanceof Date
        ? formatDate(editItem.expiration_date)
        : editItem.expiration_date || "";

    setSectionsData((prevData) => {
      const updatedData = [...prevData];
      const itemsCopy = [...updatedData[editSectionIndex].items];

      itemsCopy[editItemIndex] = {
        ...itemsCopy[editItemIndex],
        name: editItem.name,
        instruction: editItem.instruction,
        expiration_date: formattedDate,
      };
      updatedData[editSectionIndex] = {
        ...updatedData[editSectionIndex],
        items: itemsCopy,
      };
      return updatedData;
    });

    setEditModalVisible(false);
  };

  // 아이템 삭제
  const handleDeleteItem = () => {
    setSectionsData((prevData) => {
      const updatedData = [...prevData];
      const itemsCopy = [...updatedData[editSectionIndex].items];
      itemsCopy.splice(editItemIndex, 1);
      updatedData[editSectionIndex] = {
        ...updatedData[editSectionIndex],
        items: itemsCopy,
      };
      return updatedData;
    });
    setEditModalVisible(false);
  };

  // (3) 섹션 렌더링
  const renderSection = ({ item: sectionData, index: sectionIndex }) => {
    // 최대 3개만 미리보기
    const previewItems = sectionData.items.slice(0, 3);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{sectionData.section}</Text>

        {/* flexWrap + width: "30%" 로 한 줄에 최대 3개 */}
        <View style={localStyles.itemsContainer}>
          {previewItems.map((subItem, subIndex) => (
            <TouchableOpacity
              key={subItem.id}
              style={localStyles.itemBox}
              onPress={() => handleEditPress(subItem, sectionIndex, subIndex)}
            >
              <Text style={localStyles.itemName}>{subItem.name}</Text>
              <Text style={localStyles.itemDesc}>{subItem.instruction}</Text>
              <Text style={localStyles.itemDate}>
                {subItem.expiration_date || "-"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3개 초과 -> '더보기' 버튼 */}
        {sectionData.items.length > 3 && (
          <TouchableOpacity
            onPress={() =>
              handleShowMore(sectionData.section, sectionData.items)
            }
          >
            <Text style={styles.moreButton}>더보기...</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // (4) '더보기' 모달에서 모든 아이템 표시
  // FlatList를 3열로
  const renderModalContent = () => {
    const sectionIndex = sectionsData.findIndex(
      (sec) => sec.section === modalSectionTitle
    );

    return (
      <FlatList
        data={modalItems}
        keyExtractor={(item) => item.id}
        numColumns={3} // 한 줄에 최대 3개
        columnWrapperStyle={{
          justifyContent: "flex-start",
          // 만약 여백이 필요하면 아래처럼
          // marginBottom: 8,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={localStyles.itemBox}
            onPress={() => {
              setModalVisible(false);
              handleEditPress(item, sectionIndex, index);
            }}
          >
            <Text style={localStyles.itemName}>{item.name}</Text>
            <Text style={localStyles.itemDesc}>{item.instruction}</Text>
            <Text style={localStyles.itemDate}>
              {item.expiration_date || "-"}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  // 날짜 Picker (새 아이템)
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setDatePickerVisible(false);
    }
    if (selectedDate) {
      setNewItemExpirationDate(selectedDate);
    }
  };

  // 날짜 Picker (수정 모달)
  const [editDatePickerVisible, setEditDatePickerVisible] = useState(false);

  const handleEditDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setEditDatePickerVisible(false);
    }
    if (selectedDate) {
      setEditItem((prev) => ({
        ...prev,
        expiration_date: selectedDate,
      }));
    }
  };

  // 날짜 포맷 "yyyy-mm-dd"
  const formatDate = (dateObj) => {
    if (!(dateObj instanceof Date)) return dateObj;
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <View style={styles.container}>
      {/* 메인 목록 */}
      <FlatList
        data={sectionsData}
        keyExtractor={(section) => section.section}
        renderItem={renderSection}
        contentContainerStyle={styles.list}
      />

      {/* 화면 하단의 + 재료 추가 버튼 */}
      <View style={localStyles.bottomContainer}>
        <TouchableOpacity
          style={localStyles.addMainButton}
          onPress={handleOpenAddModal}
        >
          <Text style={localStyles.addMainButtonText}>+ 재료 추가</Text>
        </TouchableOpacity>
      </View>

      {/* (1) '더보기' 모달 */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>{modalSectionTitle}</Text>

            {renderModalContent()}

            <Button title="닫기" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* (2) '재료 추가' 모달 */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>재료 추가</Text>

            {/* 이름 */}
            <TextInput
              style={localStyles.input}
              placeholder="재료 이름"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            {/* 설명 */}
            <TextInput
              style={localStyles.input}
              placeholder="재료 설명"
              value={newItemInstruction}
              onChangeText={setNewItemInstruction}
            />

            {/* 카테고리 Picker */}
            <Text style={{ marginTop: 8, marginBottom: 4 }}>카테고리</Text>
            <View style={localStyles.pickerContainer}>
              <Picker
                selectedValue={newItemCategory}
                onValueChange={(val) => setNewItemCategory(val)}
                mode="dropdown"
                style={{ height: 50 }}
                dropdownIconColor="#333"
              >
                <Picker.Item label="냉동" value="냉동" />
                <Picker.Item label="냉장" value="냉장" />
                <Picker.Item label="실온" value="실온" />
                <Picker.Item label="조미료" value="조미료" />
              </Picker>
            </View>

            {/* 파기일 */}
            <Text style={{ marginTop: 8, marginBottom: 4 }}>파기일 선택</Text>
            <TouchableOpacity
              style={localStyles.dateButton}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={{ color: "#fff" }}>
                {newItemExpirationDate
                  ? formatDate(newItemExpirationDate)
                  : "날짜 선택"}
              </Text>
            </TouchableOpacity>
            {datePickerVisible && (
              <DateTimePicker
                value={newItemExpirationDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* 추가 & 취소 버튼 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <Button title="추가" onPress={handleAddNewItem} />
              <Button title="취소" onPress={() => setAddModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* (3) '아이템 수정' 모달 */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>아이템 수정</Text>

            {editItem && (
              <>
                {/* 이름 */}
                <TextInput
                  style={localStyles.input}
                  placeholder="재료 이름"
                  value={editItem.name}
                  onChangeText={(text) =>
                    setEditItem((prev) => ({ ...prev, name: text }))
                  }
                />

                {/* 설명 */}
                <TextInput
                  style={localStyles.input}
                  placeholder="재료 설명"
                  value={editItem.instruction}
                  onChangeText={(text) =>
                    setEditItem((prev) => ({ ...prev, instruction: text }))
                  }
                />

                {/* 파기일 */}
                <Text style={{ marginTop: 8, marginBottom: 4 }}>파기일</Text>
                <TouchableOpacity
                  style={localStyles.dateButton}
                  onPress={() => setEditDatePickerVisible(true)}
                >
                  <Text style={{ color: "#fff" }}>
                    {editItem.expiration_date instanceof Date
                      ? formatDate(editItem.expiration_date)
                      : editItem.expiration_date
                      ? editItem.expiration_date
                      : "날짜 선택"}
                  </Text>
                </TouchableOpacity>
                {editDatePickerVisible && (
                  <DateTimePicker
                    value={
                      editItem.expiration_date instanceof Date
                        ? editItem.expiration_date
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={handleEditDateChange}
                  />
                )}

                {/* 저장 & 삭제 & 닫기 */}
                <View style={{ marginTop: 16 }}>
                  <Button title="저장" onPress={handleSaveEdit} />
                </View>
                <View style={{ marginTop: 8 }}>
                  <Button title="삭제" color="red" onPress={handleDeleteItem} />
                </View>
                <View style={{ marginTop: 8 }}>
                  <Button
                    title="취소"
                    onPress={() => setEditModalVisible(false)}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ---------- 추가 스타일 ----------
const localStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  addMainButton: {
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addMainButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: "blue",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    paddingHorizontal: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  // (A) 섹션 미리보기 부분: 3개씩 FlexWrap
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // 왼쪽 정렬
    // 만약 행간,열간 간격이 필요하다면:
    // gap: 8,    // RN 0.71+ 지원
  },
  // (A) 한 개 아이템 박스
  itemBox: {
    width: "30%", // 한 행에 3개
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    marginRight: 8, // 필요 시 조정 (또는 gap 속성 사용)
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 12,
    color: "#999",
  },
});
