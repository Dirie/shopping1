import "react-native-gesture-handler";
import React, { useState } from "react";
import { Platform, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";

import ProductOverview from "./screens/shop/productsOverview";
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import CartScreen from "./screens/shop/CartScreen";

import CustomHeaderButton from "./components/UI/HeaderButton";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import Colors from "./constants/Colors";
import OrderScreen from "./screens/shop/orderScreen";
import UserProductScreen from "./screens/user/userProductScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  const StackScreenOptions = {
    headerTitleStyle: {
      color: "white",
      fontFamily: "open-sans-bold"
    },
    BackTitleStyle: {
      fontFamily: "open-sans"
    },
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : ""
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
  };

  const ProductStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="ProductOverview"
        screenOptions={StackScreenOptions}
      >
        <Stack.Screen
          name="ProductOverview"
          component={ProductOverview}
          options={({ navigation, route }) => ({
            headerTitle: "All Products",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => {
                    navigation.navigate("CartScreen");
                  }}
                />
              </HeaderButtons>
            )
          })}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ headerTitle: "All carts" }}
        />
      </Stack.Navigator>
    );
  };

  const OrderStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={StackScreenOptions}>
        <Stack.Screen
          name="OrdersScreen"
          component={OrderScreen}
          options={({ navigation, route }) => ({
            headerTitle: "All Orders",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            )
          })}
        />
      </Stack.Navigator>
    );
  };

  const AdminStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={StackScreenOptions}>
        <Stack.Screen
          name="AdminScreen"
          component={UserProductScreen}
          options={({ navigation, route }) => ({
            headerTitle: "",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            )
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="slide"
          initialRouteName="Home"
          drawerContentOptions={{ activeTintColor: Colors.primary }}
        >
          <Drawer.Screen
            name="Products"
            component={ProductStackNavigator}
            options={{
              drawerIcon: drawerConfig => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              )
            }}
          />
          <Drawer.Screen
            name="Orders"
            component={OrderStackNavigator}
            options={{
              drawerIcon: drawerConfig => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-list" : "ios-list"}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              )
            }}
          />
          <Drawer.Screen
            name="Admin"
            component={AdminStackNavigator}
            options={{
              drawerIcon: drawerConfig => (
                <Ionicons
                  name={Platform.OS === "android" ? "md-create" : "ios-create"}
                  size={23}
                  color={drawerConfig.tintColor}
                />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
