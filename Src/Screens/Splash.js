import { View, Text, Image, StatusBar
 } from 'react-native'
import React from 'react'
import { iconPath } from '../Constants/icon'
import { Colors } from '../Constants/Colors'

export default function App(props) {
  return (
    <View style={{ flex: 1, backgroundColor:Colors.blueColor }}>
    <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content"/> 
      <Image source={iconPath.babyLogo} style={{width:"100%", height:"100%", resizeMode:"contain"}}/>
      <Image source={iconPath.gradientImage} style={{width:"100%", height:"35%",  position:"absolute", bottom:"0%",  resizeMode:"stretch"}}/>
      <Image source={iconPath.placeMarker} style={{width:50, height:50, resizeMode:"contain", position:"absolute", bottom:"15%", alignSelf:"center",}}/>
    </View>
  )
}