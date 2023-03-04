import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../styles/Style';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT, SCOREBOARD_KEY } from '../constants/Game';
import { Col, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';

let board = [];

export default function Gameboard({route}) {

    const [playerName, setPlayerName] = useState('');
    const [started, setStarted] = useState(false);
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill());
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(false));
    const [totalPoints, setTotalPoints] = useState(0);
    const [bonusGot, setBonusGot] = useState(false);
    const [triggerEndCheck, setTriggerEndCheck] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        if( playerName === '' && route.params?.player ) {
            setPlayerName(route.params.player);
            getScoreboardData();
        }
    }, []);

    useEffect(() => {
        setTotalPoints(getTotal());
        setTriggerEndCheck(triggerEndCheck ? false : true);
    }, [dicePointsTotal]);

    useEffect(() => {
        if( selectedDicePoints.every(x => x) ) {
            setStatus("Game over");
            setGameOver(true);
            savePlayerPoints();
        }
    }, [triggerEndCheck]);
    

    const row = [];
    for( let i=0; i<NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={70}
                    color={getDiceColor(i)}
                />
            </Pressable>
        );
    }
    
    const initialRow = []
    for( let i=0; i<NBR_OF_DICES; i++) {
        initialRow.push(
            <MaterialCommunityIcons
                name={"checkbox-blank"}
                key={"row" + i}
                size={70}
                color={"white"}
            />
        );
    }

    const pointRow = [];
    for( let spot = 0; spot < MAX_SPOT; spot++ ) {
        pointRow.push(
            <Col key={"points" + spot}>
                <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    const buttonRow = [];
    for( let diceButton = 0; diceButton < MAX_SPOT; diceButton++ ) {
        buttonRow.push(
            <Col key={"buttonRow" + diceButton}>
                <Pressable 
                    key={"buttonRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}
                >
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonRow" + diceButton}
                        size={60}
                        color={getDicePointsColor(diceButton)}
                    />
                </Pressable>
            </Col>
        )
    }

    function getDiceColor(i) {
            return selectedDices[i] ? "#E7BB4C" : "white";
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "#E7BB4C" : "white";
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function getTotal() {
        let points = [...dicePointsTotal];
        for(let i=0; i<MAX_SPOT; i++) {
            if(points[i] == undefined) {
                points[i] = 0;
            }
        }
        
        let total = points.reduce((partial, a) => partial + a, 0);

        return total;
    }

    function selectDicePoints(i) {
        if(started && !selectedDicePoints[i]) {
            let selected = [...selectedDices];
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if(!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0);
                points[i] = nbrOfDices * (i + 1);
                setDicePointsTotal(points);
            }
            selected.fill(false);
            setSelectedDices(selected);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            setStatus(points[i] + ' points set to value ' + (i+1));
            setStarted(false);

            return points[i];
        }
    }

    function throwDices() {

        if( nbrOfThrowsLeft > 0 ) {
            let spots = [...diceSpots];
            for ( let i=0; i<NBR_OF_DICES; i++) {
                if( !selectedDices[i] ) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    spots[i] = randomNumber;
                }
            }

            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
            setDiceSpots(spots);
            setStarted(true);
            setStatus("Select and throw dices again");
        }else {
            setStatus("No throws left, select value for points");
        }
    }

    function restart() {
        setStarted(false);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill());
        setDiceSpots(new Array(NBR_OF_DICES).fill(false));
        setTotalPoints(0);
        setBonusGot(false);
        setGameOver(false);
        setScores([]);
        getScoreboardData();
    }

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if( jsonValue !== null ) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }
        }catch (error) {
            console.log(error.message);
        }
    }

    const savePlayerPoints = async () => {

        const date = new Date();

        const playerPoints = {
            name: playerName,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            points: totalPoints
        }

        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        }catch (error) {
            console.log(error.message);
        }
    }

    return(
        <>
        <Header/>
        <View style={styles.gameboard}>
            {!started ?
            <View style={styles.flex}>{initialRow}</View>
            :
            <View style={styles.flex}>{row}</View>
            }
            {!gameOver &&
                <Text style={styles.throws}>Throws left: {nbrOfThrowsLeft}</Text>
            }
            <Text style={styles.gameinfo}>{status}</Text>
            {!gameOver ?
            <Pressable style={styles.button} onPress={throwDices}>
                <Text style={[styles.buttonText, {color: "white"}]}>THROW DICES</Text>
            </Pressable>
            :
            <Pressable style={styles.button} onPress={restart}>
                <Text style={[styles.buttonText, {color: "white", fontSize: 18}]}>RESTART</Text>
            </Pressable>
            }
            <Text style={styles.total}>Total: {totalPoints}</Text>
            <Text style={styles.bonus}>You are {BONUS_POINTS_LIMIT - totalPoints} points away from bonus</Text>
            <View style={styles.dicepoints}><Grid>{pointRow}</Grid></View>
            <View style={styles.dicepoints}><Grid>{buttonRow}</Grid></View>
            <Text style={{marginTop: 10, color: "white"}}>Player: {playerName}</Text>
        </View>
        <Footer/>
        </>
    )
}