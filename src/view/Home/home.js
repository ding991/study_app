import React, {Component} from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';
import Swiper from 'react-native-swiper'
import httpClient from 'assets/httpClient'
import AliyunPush from 'react-native-aliyun-push';
import {Notifications} from 'react-native-notifications';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        Notifications.registerRemoteNotifications();

        Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
            console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
            completion({alert: false, sound: false, badge: false});
        });

        Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
            console.log(`Notification opened: ${notification.payload}`);
            completion();
        });
        this.state = {
            bannerData: [],
        }
    }
    handleAliyunPushMessage = (e) => {
        console.log("Message Received. " + JSON.stringify(e))
        Notifications.postLocalNotification({
            body: e.body,
            title: e.title,
            category: e.type,
            link: 'saas',
            fireDate: new Date()
        })
    }
    componentDidMount() { //监听推送事件
        AliyunPush.getDeviceId().then((deviceId)=>{
            console.log("deviceId:"+deviceId)
        })
        .catch((error)=>{
            console.log("getDeviceId() failed", error)
        })
        console.log('handleAliyunPushMessage')
        AliyunPush.addListener(this.handleAliyunPushMessage)
    }

    componentWillUnmount() { //移除监听
        AliyunPush.removeListener(this.handleAliyunPushMessage)
    }
    // const [bannerData, setBannerData] = useState([])
    //e结构说明:
    //e.type: "notification":通知 或者 "message":消息
    //e.title: 推送通知/消息标题
    //e.body: 推送通知/消息具体内容
    //e.actionIdentifier: "opened":用户点击了通知, "removed"用户删除了通知, 其他非空值:用户点击了自定义action（仅限ios）
    //e.extras: 用户附加的{key:value}的对象
    // useEffect(() => {
        // httpClient.$get('/banner', {type: 3}).then(res => {
        //     setBannerData(res.banners)
        // })
        // console.log('连接阿里云推送', AliyunPush, 'push')
        //监听推送事件
    //     const handleAliyunPushMessage = (e) => {
    //         console.log('监听时间')
    //         console.log("Message Received. " + JSON.stringify(e))
    //     }
    //     AliyunPush.addListener(handleAliyunPushMessage)
    //     return () => {
    //         AliyunPush.removeListener(handleAliyunPushMessage)
    //     }
    // }, [])
    
    // return (
    //     <SafeAreaView>
    //         <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
    //             <View style={{justifyContent: 'center', alignItems: 'center', height: 300}}>
    //                 <Swiper style={styles.wrapper} width={300}>
    //                     {
    //                         bannerData.map((item, index) => {
    //                             return (<View key={index} style={styles.container}>
    //                                 <Image source={{uri: item.pic}} style={styles.image}></Image>
    //                             </View>)
    //                         })
    //                     }
    //                 </Swiper>
    //             </View>
    //             <View style={styles.container}>
    //             </View>
    //         </View>
    //     </SafeAreaView>
    // )
    render() {
        return (
            <SafeAreaView>
                <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: 300}}>
                        <Swiper style={styles.wrapper} width={300}>
                            {
                                this.state.bannerData.map((item, index) => {
                                    return (<View key={index} style={styles.container}>
                                        <Image source={{uri: item.pic}} style={styles.image}></Image>
                                    </View>)
                                })
                            }
                        </Swiper>
                    </View>
                    <View style={styles.container}>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = {
    wrapper: {
        // width: 200,
        // paddingLeft: 16,
        paddingRight: 16,
        height: 300,
    },
    container: {
        height: 200,
        width: 300,
    },
    slide: {
        height: 200,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: "cover",
    },
    text: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    }
  }