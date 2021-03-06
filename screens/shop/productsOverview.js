import React, { Component } from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/productItem";
import * as cartActions from "../../store/actions/cart";

export default productOverViewScreen = props => {
  const { navigation } = props;
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectHandler = (id, title) => {
    props.navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title
    });
    // props.navigation.setOptions({ title: "Product Detail" });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectHandler(itemData.item.id, itemData.item.title);
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
