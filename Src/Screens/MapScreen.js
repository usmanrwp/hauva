import React, { useState, useEffect } from 'react'

import {
    View, Text, StatusBar, Image, Pressable,
    StyleSheet, Modal, FlatList
} from 'react-native'

import { iconPath } from '../Constants/icon'
import { Colors } from '../Constants/Colors'
import { fonts } from '../Constants/Fonts'
import { wp } from '../Helpers/Responsiveness';
import { useFocusEffect } from '@react-navigation/core'
import MapView, { Marker } from "react-native-maps";
import Fonticon from '../Constants/FontIcon';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';

export default function MapScreen(props) {

    const [region, setRegion] = useState({
        latitude: 60.2643615,
        longitude: 24.8961969,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })

    const [markers, setMarkers] = useState([
        {
            latitude: 33.5834025,
            longitude: 73.0737121,
        },
        {
            latitude: 33.5892042,
            longitude: 73.0762801,
        },
        {
            latitude: 33.5866177,
            longitude: 73.0706976,
        },
    ])

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

    const [allMapData, setAllMapData] = useState([])

    const [filterModal, setFilterModal] = useState(false)

    const [SelectedIds, setSelectedIds] = useState("")

    const [statusBarColor, setStatusBarColor] = useState("#fff")


    useEffect(() => {
        getAllAddress("Koirapuisto")
        Geocoder.init("AIzaSyC8uzc-VUCpu4LKln_puqRrBbrmWdTIJC4");
        CheckLocation()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            // alert(props?.route?.params?.category)
        }, [])
    );

    const CheckLocation = () => {

        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .then((data) => {
                getCurrentLoc()
            })
            .catch((err) => {
                if (err.code === "ERR00") {
                    CheckLocation()
                } else {
                    console.log(JSON.stringify(err.code))
                }
            });
    }

    const getCurrentLoc = async () => {
        Geolocation.getCurrentPosition(
            async position => {
                // alert(JSON.stringify(position))
                setRegion({
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            },
            error => {
                console.log("locations ", JSON.stringify(error))
            },
            { enableHighAccuracy: true, timeout: 2000 }
        );
    }

    const getAllLatlongs = (allData) => {
        let NewallLatlongsArray = []
        let allLatlongsArray = allData

        allLatlongsArray.forEach(async (item, index) => {
            await Geocoder.from(item?.osoite)
                .then(json => {
                    var location = json.results[0].geometry.location;
                    // NewallLatlongsArray.push({
                    //     id: item._id,
                    //     lat: location?.lat,
                    //     lng: location?.lng
                    // })
                    // item.lat = location?.lat
                    // item.lng = location?.lng
                    let params = {}
                    params['id'] = item._id
                    params['lat'] = location?.lat
                    params['lng'] = location?.lng
                    // postAllLatLngs(params)
                })
                .catch(error => console.warn("bbnbnnb " + JSON.stringify(error)));
            if (index == allLatlongsArray?.length - 1) {
                setAllMapData(allLatlongsArray)
                // alert("ok")
                // postAllLatLngs(NewallLatlongsArray)
                // alert(JSON.stringify(NewallLatlongsArray[0])+" "+ JSON.stringify(NewallLatlongsArray.length -1))
                // alert(index+"jhjhj "+JSON.stringify(allLatlongsArray[allLatlongsArray.length -1]))
            }
        })
    }

    const postAllLatLngs = (params) => {

        try {
            axios({
                method: 'POST',
                url: "https://hauva.herokuapp.com/update",
                data: params,
            })
                .then(async (response) => {
                    // alert(JSON.stringify(response.data))
                })
                .catch((error) => {
                    alert(JSON.stringify(error))
                })
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    const getAllAddress = (category) => {
        try {
            axios({
                // url: "https://api.hauva.net/category?category=Uimapaikka",
                url: "https://api.hauva.net/category?category=" + category,
                method: 'GET',
            })
                .then((response) => {
                    setAllMapData(response?.data?.response)
                    // alert(JSON.stringify(response?.data?.response))
                    // getAllLatlongs(response?.data?.response)
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    const addCategories = async (item) => {
        setSelectedIds(item?.title)
        getAllAddress(item?.title)
        setTimeout(() => {
            setFilterModal(false)
        }, 1000);
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={statusBarColor} barStyle={statusBarColor === "#fff" ? "dark-content" : "light-content"} />
            <View style={{ marginTop: 12 }}>
                <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#000", fontSize: 28, marginLeft: 18, marginTop: 20 }}>{"Kartta"}</Text>
                <Text style={{ fontFamily: fonts.BeVietnamPro_Regular, color: "#323652B2", fontSize: 12, marginLeft: 18, marginTop: -3 }}>{"Napauta paikkaa saadaksesi lisätietoja "}</Text>
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={region}>
                    <>
                        <Marker coordinate={{ latitude: region?.latitude , longitude: region?.longitude }}
                            style={{ alignItems: "center" }}>
                            {/* <View style={{ backgroundColor: "black", alignSelf: "center", borderRadius: 5 }}>
                                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>{marker?.otsikko}</Text>
                                </View> */}
                            <Image source={iconPath.mapMarkerRed} style={{ height: 27, width: 27, resizeMode: "contain" }} />
                        </Marker>
                        {allMapData?.map((marker) =>
                            marker?.osoite !== null ?
                                <Marker coordinate={{ latitude: marker?.lat ? marker?.lat : 0.000000, longitude: marker?.lng ? marker?.lng : 0.000000 }}
                                    onPress={() => props.navigation.navigate("LocationDetails", { item: marker })}
                                    style={{ alignItems: "center" }}>
                                    {/* <View style={{ backgroundColor: "black", alignSelf: "center", borderRadius: 5 }}>
                                    <Text style={{ color: "#fff", paddingHorizontal: 5 }}>{marker?.otsikko}</Text>
                                </View> */}
                                    <Image source={iconPath.blueMarkerImg} style={{ height: 30, width: 30, resizeMode: "contain" }} />
                                </Marker> : null
                        )}
                    </>
                </MapView>
            </View>
            <Pressable
                // onPress={() => props.navigation.navigate("CategoriesScreen")}
                onPress={() => { setFilterModal(true), setStatusBarColor(Colors.BtnBlue) }}
                style={{
                    backgroundColor: Colors.BtnBlue, alignItems: "center", justifyContent: "center", height: 50,
                    borderRadius: 35, alignSelf: "center", marginTop: wp(8),
                    position: "absolute", bottom: "10%", paddingHorizontal: wp(5), flexDirection: "row"
                }}>
                <Image source={iconPath.threeLineIcon} style={{ width: 15, height: 15, resizeMode: "contain" }} />
                <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 18, marginLeft: 5, marginTop: -4 }}>{"Kategoriat"}</Text>
            </Pressable>


            <Modal
                transparent={false}
                animationType={'none'}
                // visible={true}
                visible={filterModal}
                onRequestClose={() => { setFilterModal(false), setStatusBarColor("#fff") }}>
                <Pressable style={styles.modalBackground}>
                    {/* <StatusBar backgroundColor={"#fff"} barStyle="dark-content" /> */}
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
                        onPress={() => setFilterModal(false)}
                        style={{
                            backgroundColor: Colors.BtnBlue, alignItems: "center", justifyContent: "center", height: 50,
                            borderRadius: 35, alignSelf: "center",
                            paddingHorizontal: wp(5), flexDirection: "row", marginVertical: 20,
                        }}>
                        <Image source={iconPath.threeLineIcon} style={{ width: 15, height: 15, resizeMode: "contain" }} />
                        <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 18, marginLeft: 5, marginTop: -4 }}>{"Kategoriat"}</Text>
                    </Pressable>


                </Pressable>
            </Modal>


        </View>
    )
}
const styles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        // backgroundColor: 'green',
    },
    activityIndicatorWrapper: {
        backgroundColor: "white",
        // height: wp(40),
        width: "100%",
        borderRadius: 10,
        marginTop: wp(19),
        padding: 5,
        paddingVertical: wp(5)
    }

})