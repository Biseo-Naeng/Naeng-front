// styles/MainStyle.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  section: {
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    // 그림자 등 원하는 스타일 추가
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "30%", // 혹은 원하는 크기로
    marginRight: 10,
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 12,
    color: "#666",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
  },
  moreButton: {
    marginTop: 8,
    color: "blue",
    textDecorationLine: "underline",
  },
});
// Compare this snippet from src/styles/MainStyle.js:
// // src/styles/MainStyle.js
