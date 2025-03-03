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
  // 1) data를 useState로 관리하도록 변경
  const [sectionsData, setSectionsData] = useState([
    {
      section: "냉동실",
      items: [
        { id: "1", name: "고기", label: "Meat" },
        { id: "2", name: "얼음", label: "Ice" },
        { id: "7", name: "만두", label: "Dumpling" },
        { id: "8", name: "새우", label: "Shrimp" },
      ],
    },
    {
      section: "냉장실",
      items: [
        { id: "3", name: "우유", label: "Milk" },
        { id: "4", name: "토마토", label: "Tomato" },
        { id: "9", name: "치즈", label: "Cheese" },
      ],
    },
    {
      section: "실온칸",
      items: [
        { id: "5", name: "라면", label: "Ramen" },
        { id: "6", name: "참기름", label: "Sesame Oil" },
        { id: "10", name: "통조림", label: "Canned Food" },
        { id: "11", name: "과자", label: "Snacks" },
      ],
    },
  ]);

  // 기존 모달(“더보기” 눌렀을 때 열리는 디테일 모달)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSectionTitle, setModalSectionTitle] = useState("");
  const [modalItems, setModalItems] = useState([]);

  // 2) 재료 추가를 위한 모달 상태
  const [addModalVisible, setAddModalVisible] = useState(false);
  // 어떤 섹션에 추가할 지 (예: "냉동실", "냉장실" 등)
  const [selectedSection, setSelectedSection] = useState("");
  // 새로 추가할 아이템의 정보 (이름, 라벨, 유통기한 등)
  const [newItemName, setNewItemName] = useState("");
  const [newItemLabel, setNewItemLabel] = useState("");
  const [newItemExpire, setNewItemExpire] = useState("");

  // 섹션 내 아이템 전체보기(더보기) 모달 열기
  const handleShowMore = (sectionTitle, items) => {
    setModalSectionTitle(sectionTitle);
    setModalItems(items);
    setModalVisible(true);
  };

  // 3) 재료 추가 모달 열기
  const handleOpenAddModal = (sectionName) => {
    setSelectedSection(sectionName);
    // 혹시 이전에 입력했던 데이터가 남아있다면 초기화
    setNewItemName("");
    setNewItemLabel("");
    setNewItemExpire("");
    setAddModalVisible(true);
  };

  // 4) 실제로 재료 추가 (새 아이템을 sectionsData에 삽입)
  const handleAddNewItem = () => {
    // 새 아이템
    const newItem = {
      id: Date.now().toString(), // 간단히 Date.now() 사용해 id 생성
      name: newItemName,
      label: newItemLabel,
      expire: newItemExpire, // 유통기한 필드 (사용자가 넣은 값)
    };

    // sectionsData를 업데이트
    setSectionsData((prevData) =>
      prevData.map((section) => {
        if (section.section === selectedSection) {
          return {
            ...section,
            items: [...section.items, newItem],
          };
        }
        return section;
      })
    );

    // 모달 닫기
    setAddModalVisible(false);
  };

  // 섹션(냉동실/냉장실/실온칸 등)을 FlatList로 렌더
  const renderSection = ({ item }) => {
    // 최대 3개만 보여주기
    const previewItems = item.items.slice(0, 3);

    return (
      <View style={styles.section}>
        {/* 섹션 제목 */}
        <Text style={styles.sectionTitle}>{item.section}</Text>

        {/* 아이템 미리보기 */}
        <View style={styles.itemsContainer}>
          {previewItems.map((subItem) => (
            <View key={subItem.id} style={styles.item}>
              <Text style={styles.itemLabel}>{subItem.label}</Text>
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

        {/* 재료 추가 버튼 */}
        <TouchableOpacity onPress={() => handleOpenAddModal(item.section)}>
          <Text style={localStyles.addButton}>+ 재료 추가</Text>
        </TouchableOpacity>
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
                  <Text style={styles.itemLabel}>{item.label}</Text>
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
            <Text style={localStyles.modalTitle}>
              {selectedSection}에 재료 추가
            </Text>

            {/* 재료 이름 입력 */}
            <TextInput
              style={localStyles.input}
              placeholder="재료 이름"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            {/* 라벨(영문명) 입력 */}
            <TextInput
              style={localStyles.input}
              placeholder="레이블(예: Meat, Milk)"
              value={newItemLabel}
              onChangeText={setNewItemLabel}
            />

            {/* 유통기한(임의) 입력 */}
            <TextInput
              style={localStyles.input}
              placeholder="유통기한 (예: 2025-12-31)"
              value={newItemExpire}
              onChangeText={setNewItemExpire}
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
  addButton: {
    marginTop: 8,
    color: "blue",
  },
});
