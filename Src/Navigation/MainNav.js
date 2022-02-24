import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import Splash from '../Screens/Splash'
import HomeStack from './HomeStack'
import { Colors, AppTheme } from '../Constants/Colors';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

function MainNav(props) {

    const isLogin = useSelector(state => state.AuthReducer.isLogin);

    useEffect(() => { setTimeout(() => { setTimePassed(true) }, 3000) })
    const [timePassed, setTimePassed] = useState(false);
    return (
        <>
            <StatusBar backgroundColor={Colors.white}
                barStyle={'dark-content'} />
            {!timePassed ?
                <Splash />
                :
                <NavigationContainer
                    theme={AppTheme}
                >
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="HomeStack" component={HomeStack} />
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </>
    );
}
export default MainNav;