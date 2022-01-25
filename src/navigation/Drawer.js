import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NavigateScreen from "../screens/NavigateScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import SpecificSharingScreen from "../screens/SpecificSharingScreen";
import BottomSheetView from "../components/BottomSheetView";
import RecoveryPasswordScreen from '../screens/RecoveryPasswordScreen';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
            drawerLabelStyle: {marginLeft: 15, fontSize: 15},
            drawerActiveBackgroundColor: '#1e90ff',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            headerShown: false
            }}>
            <Drawer.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen 
            name='Login' 
            component={LoginScreen} />
            <Drawer.Screen 
            name='Edit Profile' 
            component={ProfileScreen} />
            <Drawer.Screen 
            name="Navigate"
            component={NavigateScreen} />
            <Drawer.Screen 
            name="Share Parking"
            component={SpecificSharingScreen} />
          
        </Drawer.Navigator>
    )
}

export default DrawerNav;