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
} from "react-native";
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
        { id: "1", name: "고기", instruction: "Meat" },
        { id: "2", name: "얼음", instruction: "Ice" },
        { id: "7", name: "만두", instruction: "Dumpling" },
        { id: "8", name: "새우", instruction: "Shrimp" },
      ],
    },
    {
      section: "냉장실",
      items: [
        { id: "3", name: "우유", instruction: "Milk" },
        { id: "4", name: "토마토", instruction: "Tomato" },
        { id: "9", name: "치즈", instruction: "Cheese" },
      ],
    },
    {
      section: "실온칸",
      items: [
        { id: "5", name: "라면", instruction: "Ramen" },
        { id: "6", name: "참기름", instruction: "Sesame Oil" },
        { id: "10", name: "통조림", instruction: "Canned Food" },
        { id: "11", name: "과자", instruction: "Snacks" },
      ],
    },
    {
      section: "조미료칸",
      items: [],
    },
  ]);

  // 기존 '더보기' 모달 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSectionTitle, setModalSectionTitle] = useState("");
  const [modalItems, setModalItems] = useState([]);

  // 재료 추가 모달 상태
  const [addModalVisible, setAddModalVisible] = useState(false);

  // 새 재료를 위한 State (user_id 제외)
  const [newItemName, setNewItemName] = useState(""); // 재료 이름
  const [newItemInstruction, setNewItemInstruction] = useState(""); // 재료 설명
  const [newItemCategory, setNewItemCategory] = useState(""); // "냉동", "냉장", "실온", "조미료"
  const [newItemExpirationDate, setNewItemExpirationDate] = useState(""); // 파기일

  // 섹션 내 아이템 전체보기(더보기) 모달 열기
  const handleShowMore = (sectionTitle, items) => {
    setModalSectionTitle(sectionTitle);
    setModalItems(items);
    setModalVisible(true);
  };

  // 재료 추가 모달 열기
  const handleOpenAddModal = () => {
    // 이전에 입력했던 데이터가 남아있다면 초기화
    setNewItemName("");
    setNewItemInstruction("");
    setNewItemCategory("");
    setNewItemExpirationDate("");
    setAddModalVisible(true);
  };

  // 카테고리에 맞춰 재료를 넣어야 할 섹션의 index를 찾는 함수
  const findSectionIndexByCategory = (data, category) => {
    const targetSectionName = categoryToSectionMap[category] || "기타";
    return data.findIndex((sec) => sec.section === targetSectionName);
  };

  // 실제로 재료 추가 (새 아이템을 sectionsData에 삽입)
  const handleAddNewItem = () => {
    const newItem = {
      id: Date.now().toString(), // 간단히 Date.now() 사용
      name: newItemName,
      instruction: newItemInstruction,
      expiration_date: newItemExpirationDate,
    };

    setSectionsData((prevData) => {
      // 어떤 섹션에 넣을지 결정
      const sectionIndex = findSectionIndexByCategory(
        prevData,
        newItemCategory
      );

      // 만약 기존 섹션이 없다면, '기타' 섹션을 새로 만들어줄 수도 있음
      if (sectionIndex === -1) {
        // '기타' 섹션이 없으면 새로 추가
        return [...prevData, { section: "기타", items: [newItem] }];
      }

      // 해당 섹션에 새 아이템 삽입
      const updatedData = [...prevData];
      updatedData[sectionIndex] = {
        ...updatedData[sectionIndex],
        items: [...updatedData[sectionIndex].items, newItem],
      };
      return updatedData;
    });

    setAddModalVisible(false);
  };

  // 섹션(냉동실/냉장실/실온칸/조미료칸)을 FlatList로 렌더
  const renderSection = ({ item }) => {
    // 최대 3개 미리보기
    const previewItems = item.items.slice(0, 3);

    return (
      <View style={styles.section}>
        {/* 섹션 제목 */}
        <Text style={styles.sectionTitle}>{item.section}</Text>

        {/* 아이템 미리보기 */}
        <View style={styles.itemsContainer}>
          {previewItems.map((subItem) => (
            <View key={subItem.id} style={styles.item}>
              <Text style={styles.itemLabel}>{subItem.instruction}</Text>
              <Text style={styles.itemName}>{subItem.name}</Text>
            </View>
          ))}
        </View>

        {/* 아이템이 3개 초과일 때에만 '더보기' 버튼 표시 */}
        {item.items.length > 3 && (
          <TouchableOpacity
            onPress={() => handleShowMore(item.section, item.items)}
          >
            <Text style={styles.moreButton}>더보기...</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 메인 목록 */}
      <FlatList
        data={sectionsData}
        keyExtractor={(item) => item.section}
        renderItem={renderSection}
        contentContainerStyle={styles.list}
      />

      {/* 화면 하단에 재료 추가 버튼 하나 두기 */}
      <View style={localStyles.bottomContainer}>
        <TouchableOpacity
          style={localStyles.addMainButton}
          onPress={handleOpenAddModal}
        >
          <Text style={localStyles.addMainButtonText}>+ 재료 추가</Text>
        </TouchableOpacity>
      </View>

      {/* (1) '더보기'를 눌렀을 때 표시되는 모달 */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>{modalSectionTitle}</Text>

            {/* 전체 아이템 표시 */}
            <FlatList
              data={modalItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>{item.instruction}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              )}
            />

            {/* 닫기 버튼 */}
            <Button title="닫기" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* (2) '재료 추가' 버튼을 눌렀을 때 표시되는 모달 (폼) */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>재료 추가</Text>

            {/* 재료 이름 */}
            <TextInput
              style={localStyles.input}
              placeholder="재료 이름"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            {/* 재료 설명 */}
            <TextInput
              style={localStyles.input}
              placeholder="재료 설명"
              value={newItemInstruction}
              onChangeText={setNewItemInstruction}
            />

            {/* 카테고리 (냉동, 냉장, 실온, 조미료) */}
            <TextInput
              style={localStyles.input}
              placeholder="카테고리 (예: 냉동, 냉장, 실온, 조미료)"
              value={newItemCategory}
              onChangeText={setNewItemCategory}
            />

            {/* 파기일 (유통기한, expiration_date) */}
            <TextInput
              style={localStyles.input}
              placeholder="파기일 (예: 2025-12-31)"
              value={newItemExpirationDate}
              onChangeText={setNewItemExpirationDate}
            />

            {/* '추가' 및 '취소' 버튼 */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button title="추가" onPress={handleAddNewItem} />
              <Button title="취소" onPress={() => setAddModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 모달 등을 위한 추가 스타일
const localStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // 어두운 반투명 배경
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxHeight: "70%",
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
    // 메인 화면 하단(또는 상단)에 고정하기 위한 스타일 예시
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
});
