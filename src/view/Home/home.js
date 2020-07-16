import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Swiper from 'react-native-swiper'
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function HomeScreen() {
    useEffect(() => {
        console.log('xxxxx');
    }, [])
    return (
        <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 400}}>
                <Swiper style={styles.wrapper} width={300} loop={true}>
                    <View testID="Hello" style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View testID="Beautiful" style={styles.slide2}> 
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View testID="Simple" style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>header头部</Text>
            </View>
        </View>
    )
}

const styles = {
    wrapper: {
        // width: 200,
        // paddingLeft: 16,
        paddingRight: 16,
        height: 300,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    }
  }