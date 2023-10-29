import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
// Trong tệp AddAddressScreen.js

const User = require("../api/models/user"); // import User từ tệp cụ thể 

// Các mã khác 



const AddAddressScreen = () => {

  const handleDeleteAddress = async (index, addressId) => {
    try {
      // Gửi yêu cầu xóa địa chỉ đến máy chủ
      await axios.delete(`http://10.0.61.254:8080/addresses/${addressId}`);

      // Tạo một bản sao của danh sách địa chỉ và loại bỏ địa chỉ đã xóa
      const updatedAddresses = [...addresses];
      updatedAddresses.splice(index, 1);

      // Cập nhật danh sách địa chỉ và thông báo thành công
      setAddresses(updatedAddresses);
      Alert.alert("Thành công", "Xóa địa chỉ thành công");
    } catch (error) {
      Alert.alert("Lỗi", "Lỗi xóa địa chỉ: " + error.message);
      console.error("error", error);
    }
  };
  
  
  
  
  
  const navigation = useNavigation();
  const [addresses, setAddresses,addressId] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  console.log("userId", userId);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.61.254:8080/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("addresses", addresses);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Tìm kiếm" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Địa chỉ của bạn</Text>

        <Pressable
        key ="addbutton"
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Thêm địa chỉ mới</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.khuvuc}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Vietnam, Bangalore
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {item?.sdt}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Sửa</Text>
                </Pressable>

                <Pressable
          key={item._id}
          onPress={() => {
            handleDeleteAddress(userId, item.id, setAddresses); // Truyền item.id vào hàm handleDeleteAddress
          }}
  style={{
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: "#D0D0D0",
  }}
>
  <Text>Xóa</Text>
</Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Đặt làm mặc định</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
