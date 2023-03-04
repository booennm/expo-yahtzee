import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOREBOARD_KEY, NBR_OF_SCOREBOARD_ROWS } from '../constants/Game';
import { DataTable } from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Style';

export default function Scoreboard({navigation}) {
    const [scores, setScores] = useState([]);
    const [page, setPage] = useState(0);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getCurrentData();
    }, [scores, page])
    

    function getCurrentData() {
        const startingPoint = page * NBR_OF_SCOREBOARD_ROWS;
        const data = scores.slice(startingPoint, startingPoint + NBR_OF_SCOREBOARD_ROWS);

        const emptyCell = {
            name: '',
            date: '',
            time: '',
            points: null
        }

        for(let i=0; i<NBR_OF_SCOREBOARD_ROWS; i++) {
            if(data[i] == null) {
                data[i] = emptyCell;
            }
        }

        setCurrentData(data);
    }

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if( jsonValue !== null ) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
                setScores(tmpScores);
            }
        }catch (error) {
            console.log(error.message);
        }
    }

    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY).then(
                setScores([]),
                setCurrentData([])
            );
        }catch (error) {
            console.log(error);
        }
    }

    const maxPages = Math.ceil((scores.length / NBR_OF_SCOREBOARD_ROWS));

    return(
        <>
        <Header/>
        <View style={styles.scoreboard}>
            {currentData.length == 0 ?
            <Text>Loading scores</Text>
            :
            <>
            <DataTable style={styles.datatable}>
                <DataTable.Header>
                    <DataTable.Title>Player</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Time</DataTable.Title>
                    <DataTable.Title numeric>Points</DataTable.Title>
                </DataTable.Header>
                
                {currentData.map((player, i) => (
                    <DataTable.Row key={i}>
                        <DataTable.Cell>{player.name}</DataTable.Cell>
                        <DataTable.Cell>{player.date}</DataTable.Cell>
                        <DataTable.Cell>{player.time}</DataTable.Cell>
                        <DataTable.Cell numeric>{player.points}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={maxPages}
                    onPageChange={page => setPage(page)}
                    label={page+1 + " of " + maxPages}
                />
            </DataTable>
            <Pressable style={styles.scoreButton} onPress={clearScoreboard}>
                <Text style={[styles.buttonText, {fontSize: 16}]}>CLEAR SCOREBOARD</Text>
            </Pressable>
            </>
            }
        </View>
        <Footer/>
        </>
    )
}