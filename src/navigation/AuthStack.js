import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';


const Stack = createNativeStackNavigator();

const AuthStack = ({ isSignout }) => {
    return (
        <Stack.Navigator initialRouteName = "Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} options=
            {{
                title: 'Login', 
                animationTypeForReplace: isSignout ? 'pop' : 'push'
            }} />
            <Stack.Screen name="Password Recovery" component={PasswordRecoveryScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
        </Stack.Navigator> 
    )
}

export default AuthStack;


