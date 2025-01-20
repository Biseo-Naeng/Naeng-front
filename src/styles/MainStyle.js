import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#e7eef7",
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // 웹 표준 boxShadow 사용
    elevation: 3,
  },
  itemLabel: {
    fontSize: 14,
    color: "#999",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // 웹 표준 boxShadow 사용
    elevation: 5,
  },
  addIcon: {
    fontSize: 30,
    color: "#fff",
  },
});

export default styles;
