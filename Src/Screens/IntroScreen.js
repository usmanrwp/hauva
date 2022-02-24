import {
    View, Text, Image, StatusBar, ImageBackground, Pressable
} from 'react-native'
import React from 'react'
import { iconPath } from '../Constants/icon'
import { Colors } from '../Constants/Colors'
import { fonts } from '../Constants/Fonts'
import { wp } from '../Helpers/Responsiveness';

export default function IntroScreen(props) {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.blueColor }}>
            <Image source={iconPath.babyLogo} style={{ flex: 1, resizeMode: "contain", width: "90%", height: "90%", position: "absolute", alignSelf: "center" }} />
            <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content" />
            <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 30, marginLeft: 12, marginTop: 20 }}>{"Hauva"}</Text>
            <Image source={iconPath.gradientImage} style={{ width: "100%", height: "35%", position: "absolute", bottom: "0%", resizeMode: "stretch" }} />
            <View style={{ position: "absolute", bottom: "9%", width: "100%" }}>
                <Text style={{
                    fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 30, marginLeft: wp(5), marginTop: 20,
                    textAlign: "left", marginRight: wp(20)
                }}>{"Etsitkö paikkoja missä voit käydä hauvasi kanssa?"}</Text>
                <Pressable onPress={() => props.navigation.navigate("MapScreen")}
                    style={{
                        backgroundColor: Colors.BtnBlue, alignItems: "center", justifyContent: "center", height: 50,
                        borderRadius: 35, width: wp(90), alignSelf: "center", marginTop: wp(8)
                    }}>
                    <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 18, }}>{"Jep! Aloitetaan"}</Text>
                </Pressable>
            </View>
        </View>
    )
}