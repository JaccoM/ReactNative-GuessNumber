import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

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

const renderListItem = (listLength, itemData) =>
    (
        <View style={styles.listItem}>
            <BodyText>Round: {listLength - itemData.index}</BodyText>
            <BodyText>Guess: {itemData.item}</BodyText>
        </View>
    );

const GameScreen = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

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
        setPastGuesses(currPastGuesses => [nextNumber.toString(), ...currPastGuesses])
    };

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={[DefaultStyles.screen, styles.screen]}>
                <TitleText>Opponent's Guess</TitleText>
                <View style={styles.controlsContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons
                            name="ios-remove"
                            size={24}
                            color="white"
                        />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons
                            name="ios-add"
                            size={24}
                            color="white"
                        />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={[DefaultStyles.screen, styles.screen]}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{ ...styles.buttonContainer, ...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 } }}>
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
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
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
        width: 400,
        maxWidth: '90%',
    },
    controlsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "80%",
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem:
    {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default GameScreen;