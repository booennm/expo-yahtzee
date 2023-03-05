import React from 'react';
import { Text, View } from 'react-native';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, NBR_OF_DICES, NBR_OF_THROWS } from '../constants/Game';
import styles from '../styles/Style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Rules() {

    return(
        <View style={styles.rules}>
            <Text style={styles.h2}>Rules of the game</Text>
            <Text style={styles.rule}>Get points by getting as many of the same
                dice value as you can with {NBR_OF_DICES} dice.
            </Text>
            <Text style={styles.rule}>Start your turn by throwing all of the dice. 
                Select what if any dice you want to lock and throw again. 
                You have {NBR_OF_THROWS} throws.
            </Text>
            <Text style={styles.rule}>When all the throws have been used you 
                must select what dice value to put the points in. A value can 
                be selected only once, and the game ends after all the 
                values have been used.</Text>
            <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                        name={"numeric-1-circle"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"numeric-2-circle"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"numeric-3-circle"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"numeric-4-circle"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"numeric-5-circle"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"numeric-6-circle"}
                        size={40}
                        color={"#8400b8"}
                />
            </View>
            <Text style={styles.example}>values</Text>
            <Text style={styles.rule}>
            The points for each turn is the sum of the dice value you choose.
            </Text>
            <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                        name={"dice-1"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"dice-4"}
                        size={40}
                        color={"#E7BB4C"}
                />
                <MaterialCommunityIcons
                        name={"dice-4"}
                        size={40}
                        color={"#E7BB4C"}
                />
                <MaterialCommunityIcons
                        name={"dice-6"}
                        size={40}
                        color={"#8400b8"}
                />
                <MaterialCommunityIcons
                        name={"dice-4"}
                        size={40}
                        color={"#E7BB4C"}
                />
            </View>
            <Text style={styles.example}>By selecting the value 4 here, you get 3x4=12 points to the value 4</Text>
            <Text style={styles.rule}>After getting {BONUS_POINTS_LIMIT} points you earn the bonus. The bonus is worth {BONUS_POINTS} points.</Text>
        </View>
    )
}