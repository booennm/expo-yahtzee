import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, ScrollView } from 'react-native';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, NBR_OF_DICES, NBR_OF_THROWS } from '../constants/Game';
import Header from './Header';
import Footer from './Footer';
import Rules from './Rules';
import styles from '../styles/Style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Home({route}) {

    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        if( playerName === '' && route.params?.player ) {
            setPlayerName(route.params.player);
        }
    }, []);

    return(
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <Rules/>
            </ScrollView>
            <View style={{alignItems: 'center', marginTop: 5}}>
                <Text style={styles.h3}>Good luck, {playerName}!</Text>
                <Pressable
                    onPress={() => navigation.navigate('Gameboard')}
                    style={[styles.button, {marginVertical: 10}]}
                >
                    <Text style={styles.buttonText}>PLAY</Text>
                </Pressable>
            </View>
            <Footer />
        </View>
    )
}