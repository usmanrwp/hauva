import React, { useState } from 'react'

import { View, Text, StatusBar, Image, Pressable, FlatList } from 'react-native'
import { iconPath } from '../Constants/icon'
import { Colors } from '../Constants/Colors'
import { fonts } from '../Constants/Fonts'
import Fonticon from '../Constants/FontIcon';

import { hp, wp } from '../Helpers/Responsiveness';

export default function CategoriesScreen(props) {

    const [CategoryData, setCategoryData] = useState(
        [{ "id": 1, title: "Eläinkauppa" },
        { "id": 2, title: "Eläinlääkäri" },
        { "id": 3, title: "Harrastuspaikka" },
        { "id": 4, title: "Hyvinvointi ja hoitolat" },
        { "id": 5, title: "Kauppa" },
        { "id": 6, title: "Koirahotelli" },
        { "id": 7, title: "Koirakoulu" },
        { "id": 8, title: "Koirakuvaaja" },
        { "id": 9, title: "Koirapuisto" },
        { "id": 10, title: "Koirasovellus" },
        { "id": 11, title: "Lenkkeily ja patikointi" },
        { "id": 12, title: "Muut palvelut" },
        { "id": 13, title: "Ravintola" },
        { "id": 14, title: "Uimapaikka" },
        ]
    )
    const [SelectedIds, setSelectedIds] = useState("")

    const addCategories = async (item) => {
        setSelectedIds(item.title)
    }

    const filterMapData = () => {
        alert(JSON.stringify(SelectedIds))
        
        if (SelectedIds !== "") {
            props.navigation.navigate("MapScreen", { category: SelectedIds })
        } else {
            props.navigation.navigate("MapScreen")
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.BtnBlue} barStyle="light-content" />
            <View style={{
                backgroundColor: Colors.BtnBlue, borderBottomLeftRadius: 35, borderBottomRightRadius: 35,
                height: wp(45), position: "absolute", width: "100%"
            }}>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 28, marginLeft: 18, }}>{"Kategoriat"}</Text>
                    <Text style={{ fontFamily: fonts.BeVietnamPro_Regular, color: "#fff", fontSize: 12, marginLeft: 18, marginTop: -3 }}>{"Valitse kategoria"}</Text>
                </View>
            </View>

            <View style={{ flex: 1, marginTop: "20%" }}>
                <Image source={iconPath.doggo} style={{ width: wp(88), height: wp(50), borderRadius: 20, alignSelf: "center" }} />

                <FlatList
                    data={CategoryData}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: 15 }}
                    contentContainerStyle={{}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => addCategories(item)}
                            style={{
                                backgroundColor: SelectedIds === item?.title ? Colors.BtnBlue : "#F2F4FF", marginTop: 8, height: 60, marginHorizontal: wp(6), justifyContent: "center", borderRadius: 10,
                                flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                            }}>
                            <Text style={{ fontFamily: fonts.BeVietnamPro_Bold, color: SelectedIds === item?.title ? "#fff" : "#000", fontSize: 16, marginLeft: 18, }}>{item?.title}</Text>
                            <Fonticon type={"MaterialIcons"} name={"done"} size={wp(7)} color={SelectedIds === item?.title ? "#fff" : "#F2F4FF"}
                                style={{ marginRight: 10 }}
                            />
                        </Pressable>
                    )} />

            </View>
            <Pressable
                // onPress={() => props.navigation.goBack()}
                onPress={() => filterMapData()}
                style={{
                    backgroundColor: Colors.BtnBlue, alignItems: "center", justifyContent: "center", height: 50,
                    borderRadius: 35, alignSelf: "center",
                    paddingHorizontal: wp(5), flexDirection: "row", marginVertical: 20,
                }}>
                <Image source={iconPath.threeLineIcon} style={{ width: 15, height: 15, resizeMode: "contain" }} />
                <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 18, marginLeft: 5, marginTop: -4 }}>{"Kategoriat"}</Text>
            </Pressable>

        </View>
    )
}