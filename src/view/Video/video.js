import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

export default function HomeScreen() {
    useEffect(() => {
        console.log('xxxxx');
    }, [])
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>video!</Text>
        </View>
    )
} 