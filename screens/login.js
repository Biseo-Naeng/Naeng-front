// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   useWindowDimensions,
// } from "react-native";
// import { Link } from "expo-router";
// import styles from "../src/index_style"; // 스타일 가져오기

// export default function Login() {
//   const { width, height } = useWindowDimensions();
//   const frameSize = Math.sqrt(width * width + height * height);
//   const fontSize = frameSize * 0.07;
//   const marginHorizontal = width * 0.01;
//   const containerPadding = height * 0.01;

//   return (
//     <View style={[styles.container, { padding: containerPadding }]}>
//       <View style={[styles.titleContainer, { marginHorizontal }]}>
//         <Text style={[styles.title, { fontSize }]}>We’ll take</Text>
//         <Text style={[styles.title, { fontSize }]}>care of</Text>
//         <Text style={[styles.title, { fontSize }]}>your</Text>
//         <Text style={[styles.title, { fontSize }]}>refrigerator</Text>
//       </View>
//       <View style={[styles.loginContainer, { padding: containerPadding }]}>
//         <View style={styles.inputGroup}>
//           <Text>Email:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             keyboardType="email-address"
//           />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text>Password:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your password"
//             secureTextEntry
//           />
//         </View>
//         <Button title="Login" onPress={() => alert("Logged in")} />
//       </View>
//       <Link href="/signUpEmail" style={styles.button}>
//         <Text style={styles.buttonText}>Go to Signup</Text>
//       </Link>
//       {/* Main(임시) 버튼 추가 */}
//       <Link href="/main" style={[styles.button, { marginTop: 10 }]}>
//         <Text style={styles.buttonText}>Main(임시)</Text>
//       </Link>
//     </View>
//   );
// }
