/* eslint-disable prettier/prettier */
import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home", headerShown: false }} />
            <Tabs.Screen name="library" options={{ title: "Library"}} />
            <Tabs.Screen name="GeneralAiChat" options={{ title: "AI Chat" }} />
        </Tabs>
    )
}