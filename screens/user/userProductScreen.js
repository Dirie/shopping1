import React, { useState } from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import ProductItem from "../../components/shop/productItem";
import * as actionProducts from "../../store/actions/products";

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(actionProducts.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
export default UserProductScreen;
