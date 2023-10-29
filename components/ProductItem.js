import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart,removeFromCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    if (isAddedToCart) {
      // Nếu đã thêm vào giỏ hàng, xóa sản phẩm khỏi giỏ hàng
      dispatch(removeFromCart(item));
      setIsAddedToCart(false);
    } else {
      // Nếu chưa thêm vào giỏ hàng, thêm sản phẩm vào giỏ hàng
      dispatch(addToCart(item));
      setIsAddedToCart(true);
    }
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>đ{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} sao
        </Text>
      </View>

      <Pressable
        onPress={() => handleAddToCart(item)}
        style={{
          backgroundColor: isAddedToCart ? "red" : "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white" }}>
          {isAddedToCart ? "Đã thêm " : "Thêm"}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
