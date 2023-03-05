import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, ScrollView } from 'react-native';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, NBR_OF_DICES, NBR_OF_THROWS } from '../constants/Game';
import Header from './Header';
import Footer from './Footer';
import Rules from './Rules';
import styles from '../styles/Style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function EnterName() {

    const [playerName, setPlayerName] = useState('');
    const [hasName, setHasName] = useState(false);

    function handlePlayerName(value) {

        if( value.trim().length > 0 ) {
            setHasName(true);
            Keyboard.dismiss();
        }
    }

    return(
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
                    onPress={() => navigation.navigate('Gameboard',{player: playerName})}
                    style={[styles.button, {marginVertical: 10}]}
                >
                    <Text style={styles.buttonText}>PLAY</Text>
                </Pressable>
            </View>
            </>
            }
            <Footer />
        </View>
    )
}