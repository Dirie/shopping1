import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDtailScreen = props => {
  const { productId } = props.route.params;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  const dispatch = useDispatch();

  props.navigation.setOptions({ title: props.route.params.productTitle });

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.action}>
        <Button
          style={styles.button}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  action: {
    marginVertical: 20,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "open-sans"
  }
});
export default ProductDtailScreen;
