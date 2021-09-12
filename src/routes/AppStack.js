import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login';
import Register from '../screens/Register';
import ForgotPasswordFirstStep from '../screens/ForgotPasswordFirstStep'
import ForgotPasswordSecondStep from '../screens/ForgotPasswordSecondStep'
import Home from '../screens/Home'

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Login" component={Login} />
                <Screen name="Register" component={Register} />
                <Screen name="ForgotPasswordFirstStep" component={ForgotPasswordFirstStep} />
                <Screen name="ForgotPasswordSecondStep" component={ForgotPasswordSecondStep} />
                <Screen name="Home" component={Home} />
            </Navigator>
        </NavigationContainer>
    );
};

export default AppStack;