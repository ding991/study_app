import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {Text, View} from 'react-native';

export default function FirendScreen() {
    const [messages, setMessages] = useState([])
    const [ddendumTime, setAddendumTime] = useState(60)

    useEffect(() => {
        const newMessage = [{
            _id: ddendumTime,
            text: `Hello developer${ddendumTime}`,
            createdAt: new Date(),
            user: {
                _id: ddendumTime,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        }]
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
        let timer = setTimeout(() => {
            setAddendumTime(prevCount => prevCount - 1)
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [ddendumTime])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)} 
            user={{
                _id: 1,
            }}
        />
    )
} 