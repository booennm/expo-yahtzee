import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Keyboard } from 'react-native';
import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import Rules from './components/Rules';
import Header from './components/Header';
import Footer from './components/Footer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './styles/Style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {

  const Tab = createBottomTabNavigator();

  const [playerName, setPlayerName] = useState('');
  const [hasName, setHasName] = useState(false);
  const [allowNavigation, setAllowNavigation] = useState(false);

  function handlePlayerName(value) {

      if( value.trim().length > 0 ) {
          setHasName(true);
          Keyboard.dismiss();
      }
  }

  return (
    <>
    {!allowNavigation ?
      <View style={styles.container}>
            <Header />
            { !hasName ?
            <View style={styles.inputbox}>
                <Text style={styles.h2}>Enter your name for the scoreboard</Text>
                <TextInput
                    onChangeText={setPlayerName}
                    autoFocus={true}
                    style={styles.input}
                    selectionColor={'white'}
                />
                <Pressable
                    onPress={() => handlePlayerName(playerName)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>OK</Text>
                </Pressable>
            </View>
            :
            <>
            <ScrollView>
                <Rules/>
            </ScrollView>
            <View style={{alignItems: 'center', marginTop: 5}}>
                <Text style={styles.h3}>Good luck, {playerName}!</Text>
                <Pressable
                    onPress={() => setAllowNavigation(true)}
                    style={[styles.button, {marginVertical: 10}]}
                >
                    <Text style={styles.buttonText}>PLAY</Text>
                </Pressable>
            </View>
            </>
            }
            <Footer />
        </View>
    :
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Gameboard"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabelStyle: {color: "#bb4ce7"},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={"#bb4ce7"} size={35} />
            )
          }}
          initialParams={{player: playerName}}
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
          initialParams={{player: playerName}}
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
    }
    </>
  );
}
