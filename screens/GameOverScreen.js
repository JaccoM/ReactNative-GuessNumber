import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';

import BodyText from '../components/Shared/BodyText';
import TitleText from '../components/Shared/TitleText';
import MainButton from '../components/Shared/MainButton';

const GameOverScreen = props => {
    return (
        <View style={[DefaultStyles.screen, styles.screen]}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    /* source={
                        require('../assets/success.png')
                    } */
                    source={{
                        uri: 'https://new-manager-training.com/wp-content/uploads/2016/08/accomplishment-reached-top-of-mountain.jpg'
                    }}
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed{' '}
                    <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
                    to guess the number{' '}
                    <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15,
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
    }
});

export default GameOverScreen;