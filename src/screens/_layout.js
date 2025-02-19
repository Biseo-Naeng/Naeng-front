import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "MainScreen") {
            iconName = focused ? "cube" : "cube-outline";
          } else if (route.name === "RecipeScreen") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "CommunityScreen") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="MainScreen"
        options={{
          title: "메인",
          headerShown: false,
        }}
      />
      <Tabs.Screen name="RecipeScreen" options={{ title: "레시피" }} />
      <Tabs.Screen name="CommunityScreen" options={{ title: "커뮤니티" }} />
      <Tabs.Screen name="ProfileScreen" options={{ title: "내 정보" }} />
    </Tabs>
  );
}
