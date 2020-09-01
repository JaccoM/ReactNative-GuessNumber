import React, {
    useState,
    useEffect
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';

import BodyText from '../components/Shared/BodyText';
import TitleText from '../components/Shared/TitleText';
import MainButton from '../components/Shared/MainButton';

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

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

    return (
        <ScrollView>
            <View style={[DefaultStyles.screen, styles.screen]}>
                <TitleText>The Game is Over!</TitleText>
                <View style={{
                    ...styles.imageContainer, ...{
                        width: availableDeviceWidth * 0.6,
                        height: availableDeviceWidth * 0.6,
                        borderRadius: (availableDeviceWidth * 0.6) / 2,
                        marginVertical: availableDeviceHeight / 30,
                    }
                }}>
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
                <View style={{
                    ...styles.resultContainer,
                    ...{ marginVertical: availableDeviceHeight / 60 }
                }}>
                    <BodyText style={{
                        ...styles.resultText,
                        ...{ fontSize: availableDeviceHeight < 400 ? 16 : 20 }
                    }}>
                        Your phone needed{' '}
                        <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
                    to guess the number{' '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
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
    },
    resultText: {
        textAlign: "center",
    }
});

export default GameOverScreen;