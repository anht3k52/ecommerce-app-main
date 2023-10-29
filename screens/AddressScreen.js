import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const handleDeleteAddress = (index) => {
    // Tạo một bản sao của danh sách địa chỉ
    const updatedAddresses = [...addresses];

    // Sử dụng index để xóa địa chỉ khỏi danh sách
    updatedAddresses.splice(index, 1);

    // Cập nhật lại danh sách địa chỉ
    setAddresses(updatedAddresses);
  };
    const navigation = useNavigation();
  const [name, setName] = useState("");
  const [sdt, setsdt] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [khuvuc, setkhuvuc] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const {userId,setUserId} = useContext(UserType)
  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }

    fetchUser();
  },[]);
  console.log(userId)
  const handleAddAddress = () => {
      const address = {
          name,
          sdt,
          houseNo,
          street,
          khuvuc,
          postalCode
      }
      
  

      axios.post("http://10.0.61.254:8080/addresses",{userId,address}).then((response) => {
          Alert.alert("Thành Công","Thêm địa chỉ thành công");
          setName("");
          setsdt("");
          setHouseNo("");
          setStreet("");
          setkhuvuc("");
          setPostalCode("");

          setTimeout(() => {
            navigation.goBack();
          },500)
      }).catch((error) => {
           Alert.alert("Lỗi","Lỗi thêm địa chỉ")
          console.log("error",error)
      })
  }
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
        Thêm địa chỉ mới
        </Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder="Việt Nam"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Họ và tên
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="nhập tên của bạn"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Số điện thoại
          </Text>

          <TextInput
            value={sdt}
            onChangeText={(text) => setsdt(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="nhập số điện thoại"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Căn hộ,Số nhà,Tòa nhà,Công ty
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Khu vực, Đường phố, thôn
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="VD: 96 ngõ 2 Hoàng Quốc Việt"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Khu Vực</Text>
          <TextInput
            value={khuvuc}
            onChangeText={(text) => setkhuvuc(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Ví dụ gần trường đại học điện lực"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mã code</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Nhập mã code"
          />
        </View>

        <Pressable
        key="address"
        onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Thêm địa chỉ</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
