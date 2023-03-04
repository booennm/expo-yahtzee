import React from 'react';
import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabelStyle: {color: "#bb4ce7"},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={"#bb4ce7"} size={35} />
            )
          }}
        />
        <Tab.Screen
          name="Gameboard"
          component={Gameboard}
          options={{
            tabBarLabelStyle: {color: "#bb4ce7"},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name={focused ? "dice-5" : "dice-5-outline"} color={"#bb4ce7"} size={35} />
            )
          }}  
        />
        <Tab.Screen
          name="Scoreboard"
          component={Scoreboard}
          options={{
            tabBarLabelStyle: {color: "#bb4ce7"},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name={focused ? "book-open" : "book-open-outline"} color={"#bb4ce7"} size={35} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
