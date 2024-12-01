import React from "react";
import { View, TouchableOpacity } from 'react-native';
import SignUp from "./screens/Register";
import SignIn from "./screens/Login";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";
import ComplaintFiling from "./screens/ComplaintFiling";
import AsyncStorage from "@react-native-async-storage/async-storage";


// App Component Starts
const App = () => {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerLeft:null}}>
        <Stack.Screen name='LoginScreen' component={SignIn} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='RegisterScreen' component={SignUp}></Stack.Screen>
        <Stack.Screen name='HomeScreen' component={Home} options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: 'rgb(33, 117, 202)',
          },
          title: 'City Assist',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 35,
            fontFamily: 'sans-serif',
            fontWeight: '600',
            textAlign: 'center',
            padding: 15
          },
          statusBarColor: 'rgb(33, 117, 202)',
          headerTitleAlign: 'center',
          headerLeft:null,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('ComplaintFilingScreen')}>
                <Icon name="plus" size={26} color="white" />
              </TouchableOpacity>
            </View>
          )
        })}></Stack.Screen>
        <Stack.Screen name='ComplaintFilingScreen' component={ComplaintFiling} options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




// issue total ga display avvali
// edit appudu previous data ravali daanni edit cheyali
//