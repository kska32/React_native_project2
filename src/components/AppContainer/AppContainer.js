import React,{Component} from 'react';
import {View,TextInput,Image} from 'react-native';
import {createStackNavigator,createAppContainer } from "react-navigation";

import HomeScreen from "../Home/Home.js";
import SettingScreen from "../Setting/Setting.js";

const AppNavigator = createStackNavigator(
    {
        Home: ({navigation})=>{
            return (<HomeScreen navigation={navigation} city="Seoul" temp="35" maxtemp="39.5"  mintemp="32.3" 
                    desc="Few Clowds" humidity="35" pressure="1021"  date="2019.06.23"/>)
        },
        Setting: ({navigation})=>{
            return (<SettingScreen navigation={navigation} />)
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions:{
            header: null
        },
        transitionConfig : () => ({
            transitionSpec: {
                duration: 0
            }
        })
    }
)

export default  createAppContainer(AppNavigator)
