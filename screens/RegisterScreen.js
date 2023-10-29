import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
   Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://10.0.61.254:8080/register", user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
         Alert.alert(
         "Đăng ký thành công",
          "Bạn đã đăng ký thành công"
         );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
         Alert.alert(
           "Lỗi đăng ký",
          "Đã xảy ra lỗi khi đăng ký"
         );
        console.log("đăng ký thất bại", error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center",marginTop:50  }}
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
            Đăng ký tài khoản của bạn
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
            <Ionicons
              name="ios-person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="nhập tên của bạn"
            />
          </View>

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
                fontSize: password ? 16 : 16,
              }}
              placeholder="nhập email của bạn"
            />
          </View>
        </View>

        <View>
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
                fontSize: email ? 16 : 16,
              }}
              placeholder="nhập mật khẩu của bạn"
            />
          </View>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
  key="registerButton" // Thêm key vào đây
  onPress={handleRegister}
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
    Đăng ký
  </Text>
</Pressable>


        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Bạn đã có sẵn một tài khoản? Đăng nhập
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
