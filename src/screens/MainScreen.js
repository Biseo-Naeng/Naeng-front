import React, { useState } from "react";
import {
  ScrollView,
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
        {
          id: "15",
          name: "삼겹살",
          instruction: "Pork Belly",
          expiration_date: "",
        },
        {
          id: "16",
          name: "닭가슴살",
          instruction: "Chicken Breast",
          expiration_date: "",
        },
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
        { id: "17", name: "햄", instruction: "Ham", expiration_date: "" },
        { id: "18", name: "샐러드", instruction: "Salad", expiration_date: "" },
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
      items: [
        { id: "12", name: "소금", instruction: "Salt", expiration_date: "" },
        { id: "13", name: "후추", instruction: "Pepper", expiration_date: "" },
        {
          id: "14",
          name: "간장",
          instruction: "Soy Sauce",
          expiration_date: "",
        },
      ],
    },
  ]);

  // ----- 조미료칸 펼치기/접기 -----
  const [seasoningExpanded, setSeasoningExpanded] = useState(false);
  const seasoningSectionIndex = sectionsData.findIndex(
    (sec) => sec.section === "조미료칸"
  );
  const seasoningSection =
    seasoningSectionIndex !== -1 ? sectionsData[seasoningSectionIndex] : null;

  // '전체보기' 모달 상태
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
  const handleShowMore = (sectionTitle, items) => {
    setModalSectionTitle(sectionTitle);
    setModalItems(items);
    setModalVisible(true);
  };

  const handleOpenAddModal = () => {
    setNewItemName("");
    setNewItemInstruction("");
    setNewItemCategory("냉동");
    setNewItemExpirationDate(null);
    setAddModalVisible(true);
  };

  const findSectionIndexByCategory = (data, category) => {
    const targetSectionName = categoryToSectionMap[category] || "기타";
    return data.findIndex((sec) => sec.section === targetSectionName);
  };

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

  const handleEditPress = (item, sectionIndex, itemIndex) => {
    setEditItem({ ...item });
    setEditSectionIndex(sectionIndex);
    setEditItemIndex(itemIndex);
    setEditModalVisible(true);
  };

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

  // 메인 섹션 중 조미료칸은 제외
  const mainSections = sectionsData.filter((sec) => sec.section !== "조미료칸");
  // 냉동실과 냉장실은 별도 컨테이너로 처리
  const fridgeSections = mainSections.filter(
    (sec) => sec.section === "냉동실" || sec.section === "냉장실"
  );
  const nonFridgeSections = mainSections.filter(
    (sec) => sec.section !== "냉동실" && sec.section !== "냉장실"
  );

  // 각 섹션은 고정 슬롯: 냉동실/냉장실은 6칸(2행 3열), 실온칸은 3칸(1행 3열)
  const renderSection = ({ item: sectionData, index: sectionIndex }) => {
    const maxSlots = sectionData.section === "실온칸" ? 3 : 6;
    const previewItems = sectionData.items.slice(0, maxSlots);
    while (previewItems.length < maxSlots) {
      previewItems.push(null);
    }
    return (
      <View style={[styles.section, { width: "100%" }]}>
        <Text style={styles.sectionTitle}>{sectionData.section}</Text>
        <View style={localStyles.itemsContainer}>
          {previewItems.map((subItem, subIndex) =>
            subItem ? (
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
            ) : (
              <View
                key={`empty-${subIndex}`}
                style={[localStyles.itemBox, { backgroundColor: "#f9f9f9" }]}
              />
            )
          )}
        </View>
        <TouchableOpacity
          style={localStyles.viewAllButton}
          onPress={() => handleShowMore(sectionData.section, sectionData.items)}
        >
          <Text style={localStyles.viewAllButtonText}>전체보기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 모달 전체보기에서 3개씩 그리드 보이도록 빈 슬롯 추가
  const renderModalContent = () => {
    const sectionIndex = sectionsData.findIndex(
      (sec) => sec.section === modalSectionTitle
    );
    const modalData = [...modalItems];
    while (modalData.length % 3 !== 0) {
      modalData.push(null);
    }
    return (
      <FlatList
        data={modalData}
        keyExtractor={(item, index) => (item ? item.id : `empty-${index}`)}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: "center" }}
        renderItem={({ item, index }) =>
          item ? (
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
          ) : (
            <View
              style={[localStyles.itemBox, { backgroundColor: "#f9f9f9" }]}
            />
          )
        }
      />
    );
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setDatePickerVisible(false);
    }
    if (selectedDate) {
      setNewItemExpirationDate(selectedDate);
    }
  };

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

  const formatDate = (dateObj) => {
    if (!(dateObj instanceof Date)) return dateObj;
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* 상단 Bar */}
      <View style={localStyles.topBar}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>내 냉장고</Text>
        <View style={localStyles.topRightSeasoningContainer}>
          <TouchableOpacity
            style={localStyles.seasoningToggleButton}
            onPress={() => setSeasoningExpanded(!seasoningExpanded)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>조미료</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 조미료칸 - 한 줄에 4개 배치, 데이터가 4의 배수가 되도록 빈 슬롯 추가 */}
      {seasoningExpanded && seasoningSection && (
        <View style={localStyles.seasoningListContainer}>
          <FlatList
            key={"seasoning-4"}
            data={(() => {
              const data = [...seasoningSection.items];
              while (data.length % 4 !== 0) {
                data.push(null);
              }
              return data;
            })()}
            keyExtractor={(item, index) => (item ? item.id : `empty-${index}`)}
            scrollEnabled={false}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "center" }}
            renderItem={({ item, index }) =>
              item ? (
                <TouchableOpacity
                  style={localStyles.seasoningItemBox}
                  onPress={() =>
                    handleEditPress(item, seasoningSectionIndex, index)
                  }
                >
                  <Text style={localStyles.itemName}>{item.name}</Text>
                  <Text style={localStyles.itemDesc}>{item.instruction}</Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    localStyles.seasoningItemBox,
                    { backgroundColor: "#f9f9f9" },
                  ]}
                />
              )
            }
          />
        </View>
      )}
      {/* 냉동실과 냉장실 개별 컨테이너를 하나의 그룹 컨테이너로 묶음 (상하 배치 및 테두리 적용) */}
      <View style={localStyles.fridgeGroupContainer}>
        {fridgeSections.map((section, idx) => (
          <View
            style={localStyles.fridgeSectionContainer}
            key={section.section}
          >
            {renderSection({ item: section, index: idx })}
          </View>
        ))}
      </View>
      {/* 나머지 섹션들 (예: 실온칸) */}
      <FlatList
        data={nonFridgeSections}
        keyExtractor={(section) => section.section}
        renderItem={renderSection}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
      />
      {/* 하단 재료 추가 버튼 */}
      <View style={localStyles.bottomContainer}>
        <TouchableOpacity
          style={localStyles.addMainButton}
          onPress={handleOpenAddModal}
        >
          <Text style={localStyles.addMainButtonText}>+ 재료 추가</Text>
        </TouchableOpacity>
      </View>
      {/* 전체보기 모달 */}
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
      {/* 재료 추가 모달 */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>재료 추가</Text>
            <TextInput
              style={localStyles.input}
              placeholder="재료 이름"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <TextInput
              style={localStyles.input}
              placeholder="재료 설명"
              value={newItemInstruction}
              onChangeText={setNewItemInstruction}
            />
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
      {/* 아이템 수정 모달 */}
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
                <TextInput
                  style={localStyles.input}
                  placeholder="재료 이름"
                  value={editItem.name}
                  onChangeText={(text) =>
                    setEditItem((prev) => ({ ...prev, name: text }))
                  }
                />
                <TextInput
                  style={localStyles.input}
                  placeholder="재료 설명"
                  value={editItem.instruction}
                  onChangeText={(text) =>
                    setEditItem((prev) => ({ ...prev, instruction: text }))
                  }
                />
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
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#eee",
  },
  topRightSeasoningContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seasoningToggleButton: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  seasoningListContainer: {
    marginHorizontal: 16,
    padding: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    maxHeight: 200,
    marginBottom: 8,
  },
  // 조미료 아이템: 한 줄에 4개 배치, 빈 슬롯도 포함하여 4의 배수로 채움
  seasoningItemBox: {
    width: "22%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 6,
    margin: 2,
    alignItems: "center",
  },
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
    padding: 6,
    marginBottom: 8,
    fontSize: 12,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  addMainButton: {
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addMainButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 8,
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
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  itemBox: {
    width: "30%", // 3열 배치
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 4,
    marginBottom: 4,
    marginHorizontal: 2,
  },
  itemName: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
    textAlign: "center",
  },
  itemDesc: {
    fontSize: 10,
    color: "#555",
    marginBottom: 2,
    textAlign: "center",
  },
  itemDate: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
  // 전체보기 버튼 스타일 (회색 배경)
  viewAllButton: {
    marginTop: 4,
    backgroundColor: "#808080",
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
  viewAllButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  // 냉동실과 냉장실 개별 컨테이너
  fridgeSectionContainer: {
    marginVertical: 4,
    marginHorizontal: 4,
    width: "95%",
  },
  // 냉동실과 냉장실 컨테이너 그룹 (상하 배치, 테두리 적용, 여백 제거)
  fridgeGroupContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 0,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
