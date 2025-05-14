/* eslint-disable prettier/prettier */
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="book-open" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bookshelf" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="GeneralAiChat"
                options={{
                    title: "AI Chat",
                    tabBarIcon: ({ color, size }) => (
                    <Entypo name="chat" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    )
}