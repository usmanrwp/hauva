import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import IntroScreen from '../Screens/IntroScreen'
import MapScreen from '../Screens/MapScreen'
import CategoriesScreen from '../Screens/CategoriesScreen'
import LocationDetails from '../Screens/LocationDetails'

const Stack = createNativeStackNavigator();

function AccountStack(props) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="IntroScreen" component={IntroScreen} />
                <Stack.Screen name="MapScreen" component={MapScreen} />
                <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
                <Stack.Screen name="LocationDetails" component={LocationDetails} />
            </Stack.Navigator>
        </>
    );
}
export default AccountStack;