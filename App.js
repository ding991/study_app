import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen, MineScreen, FirendScreen, VideoScreen } from './src/view/index'
import { init } from 'rongcloud-react-native-imlib';
import { connect, ErrorCode } from 'rongcloud-react-native-imlib';
// import httpClient from './src/assets/httpClient'

const Tab = createBottomTabNavigator();

const IconData = {
    发现音乐: 'musical-notes-outline',
    我的音乐: 'person-outline',
    朋友: 'people-sharp',
    视频: 'caret-back-circle-sharp',
};

export default function App() {
    function onSuccess(userId) {
        console.log("连接成功：" + userId);
    }
    
    function onError(errorCode) {
        console.log("连接失败：" + errorCode);
    }
    
    function onTokenIncorrect() {
        console.log("Token 不正确或已过期");
    }
    
    useEffect(() => {
        init('kj7swf8oknzz2')
        connect(
            '9QR6Xi9ipmd3XlgbC8+qVeZ0DJISbmC0e5XN/JTprKI=@7hd1.cn.rongnav.com;7hd1.cn.rongcfg.com',
            onSuccess,
            onError,
            onTokenIncorrect
        );
    }, [])
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            const iconName = IconData[route.name];
                            return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarVisible: true,
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="发现音乐" component={HomeScreen} />
                    <Tab.Screen name="我的音乐" component={MineScreen} />
                    <Tab.Screen name="朋友" component={FirendScreen} />
                    <Tab.Screen name="视频" component={VideoScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
