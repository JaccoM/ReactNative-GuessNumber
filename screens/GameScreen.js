import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DefaultStyles from '../constants/default-styles';

import TitleText from '../components/Shared/TitleText';
import BodyText from '../components/Shared/BodyText';
import MainButton from '../components/Shared/MainButton';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { text: 'Sorry', style: 'cancel' }
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(currRounds => currRounds + 1);
        setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses])
    };

    return (
        <View style={[DefaultStyles.screen, styles.screen]}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons
                        name="ios-remove"
                        size={24}
                        color="white"
                    />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons
                        name="ios-add"
                        size={24}
                        color="white"
                    />
                </MainButton>
            </Card>
            <ScrollView>
                {pastGuesses.map(guess => (
                    <View key={guess}>
                        <Text>{guess}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    },
});

export default GameScreen;