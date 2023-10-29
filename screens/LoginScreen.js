import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useState,useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
    .post("http://10.0.61.254:8080/login", user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");
      
      // Hiển thị thông báo khi đăng nhập thành công
      Alert.alert("Đăng nhập thành công", "Bạn đã đăng nhập thành công!");
    })
    .catch((error) => {
      if (error.response) {
        // Xử lý lỗi từ phía máy chủ (có phản hồi từ máy chủ)
        console.log("Lỗi phản hồi từ máy chủ:", error.response.data);
        
        // Hiển thị thông báo khi có lỗi phản hồi từ máy chủ
        Alert.alert("Lỗi đăng nhập", "Sai tài khoản hoặc mật khẩu đăng nhập. Vui lòng thử lại .");
      } else if (error.request) {
        // Không có phản hồi từ máy chủ (yêu cầu không được gửi đi)
        console.log("Không có phản hồi từ máy chủ. Yêu cầu không được gửi đi.");
        
        // Hiển thị thông báo khi không có phản hồi từ máy chủ
        Alert.alert("Lỗi đăng nhập", "Yêu cầu không được gửi đi. Vui lòng kiểm tra kết nối mạng của bạn.");
      } else {
        // Lỗi khác xảy ra trong quá trình thiết lập yêu cầu
        console.error("Lỗi:", error.message);
        
        // Hiển thị thông báo khi có lỗi khác xảy ra
        Alert.alert("Lỗi đăng nhập", "Có lỗi không xác định khi đăng nhập. Vui lòng thử lại sau.");
      }
    });
  
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor:"white" ,alignItems: "center",marginTop:50 }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={require("../assets/logo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Đăng nhập tài khoản của bạn
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="nhập email của bạn"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="nhập mật khẩu của bạn"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Giữ luôn đăng nhập</Text>

          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Quên mật khẩu
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </Pressable>

        <Pressable
        key="register"
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Bạn chưa có tài khoản? Đăng ký
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
