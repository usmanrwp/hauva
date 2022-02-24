import React, { useState, useEffect } from 'react'
import { View, Text, Linking, Image, Pressable, StyleSheet, ScrollView } from 'react-native'

import { iconPath } from '../Constants/icon'
import { Colors } from '../Constants/Colors'
import { fonts } from '../Constants/Fonts'
import { wp } from '../Helpers/Responsiveness';

import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';

export default function LocationDetails(props) {

    const [rating, setRating] = useState(0)
    const [avgRatingAll, setAvgRatingAll] = useState(0)
    const [totalRating, setTotalRating] = useState(5)

    useEffect(() => {
        //   alert(JSON.stringify(props?.route?.params?.item._id))
        //   alert(JSON.stringify(props?.route?.params?.item.lat))
        //   alert(JSON.stringify(props?.route?.params?.item?.reviews))
        let arrnew = [{ stars: 5 }, { stars: 4 }, { stars: 3 }, { stars: 5 }, { stars: 3 }, { stars: 5 }]
        let totalRating = 0
        props?.route?.params?.item?.reviews.map((item) => {
            totalRating = totalRating + item?.stars
        })
        let avgRating = totalRating / props?.route?.params?.item?.reviews?.length
        if (!isNaN(avgRating)) {
            setAvgRatingAll(avgRating)
            setTotalRating(5)
        }else{
            setTotalRating(0)
        }
        //    alert(avgRating)

    }, [])

    const rateService = (val) => {
        let params = {}
        params["id"] = props?.route?.params?.item?._id;
        params["stars"] = val;
        try {
            axios({
                method: 'POST',
                url: "https://api.hauva.net/rate",
                data: params,
            })
                .then(async (response) => {
                    // alert(JSON.stringify(response.data))
                })
                .catch((error) => {
                    // alert(JSON.stringify(error))
                })
        } catch (error) {
            // alert(JSON.stringify(error))
        }
    }

    const openMapUrl = () => {
        let url = `https://www.google.com/maps/dir/?api=1&destination=${props?.route?.params?.item?.lat},${props?.route?.params?.item?.lng}&dir_action=navigate`
        Linking.openURL(url)
    }


    return (
        <View style={{ flex: 1, paddingHorizontal: wp(5) }}>
            <Pressable onPress={() => props.navigation.goBack()}>
                <Image source={iconPath.backBtn} style={{ width: wp(10), height: wp(10), marginTop: wp(4) }} />
            </Pressable>

            <Text style={styles.titleStyle}>{props?.route?.params?.item?.otsikko}</Text>
            {/* <Image source={iconPath.Adimages} style={styles.picStyle} /> */}
            <View style={{ marginVertical: 15 }}>
                <Stars count={5}
                    default={rating}
                    spacing={wp(4)}
                    update={(val) => { setRating(val), rateService(val) }}
                    fullStar={<Icon name={'star'} size={40} color={"#FFC107"} />}
                    emptyStar={<Icon name={'star-outline'} size={40} color={"#000"} />} />
            </View>
            <View style={{ marginVertical: 5, alignItems: "center" }}>
                <Stars count={5}
                    default={avgRatingAll}
                    spacing={wp(1)}
                    disabled
                    fullStar={<Icon name={'star'} size={20} color={"#FFC107"} />}
                    emptyStar={<Icon name={'star-outline'} size={20} color={"#000"} />} />
                <Text style={{ color: "#000" }}>{avgRatingAll + "/"+ totalRating}</Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <Pressable style={styles.cardContainer}>
                    <Text style={styles.btnTextHeading}>{"Kuvaus"}</Text>
                    <Text style={styles.btnText}>{props?.route?.params?.item?.kuvaus}</Text>
                </Pressable>

                <Pressable style={styles.cardContainer}>
                    <Text style={styles.btnTextHeading}>{"Sijainti"}</Text>
                    <Text style={styles.btnText}>{props?.route?.params?.item?.osoite}</Text>
                </Pressable>

                <Pressable style={styles.cardContainer}>
                    <Text style={styles.btnTextHeading}>{"Kategoria"}</Text>
                    <Text style={styles.btnText}>{props?.route?.params?.item?.kategoria}</Text>
                </Pressable>
            </ScrollView>

            <Pressable onPress={() => openMapUrl()}
                style={styles.btnContainer}>
                <Image source={iconPath.WhitePin} style={{ width: 23, height: 23, resizeMode: "contain" }} />
                <Text style={{ fontFamily: fonts.BeVietnamPro_Medium, color: "#fff", fontSize: 18, marginLeft: 5, marginTop: -4 }}>{"Katso sijainti"}</Text>
            </Pressable>

        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#F2F4FF", marginTop: wp(4), justifyContent: "center", borderRadius: 10,
        justifyContent: "center", paddingLeft: wp(6), paddingVertical: 8
    },
    btnContainer: {
        backgroundColor: Colors.BtnBlue, alignItems: "center", justifyContent: "center", height: 50,
        borderRadius: 35, alignSelf: "center",
        paddingHorizontal: wp(5), flexDirection: "row", marginTop: wp(6), marginBottom: 30
    },
    btnTextHeading: { fontFamily: fonts.BeVietnamPro_Bold, color: "#000", fontSize: 15 },
    btnText: { fontFamily: fonts.BeVietnamPro_Light, color: "#000", fontSize: 14 },
    titleStyle: { fontFamily: fonts.BeVietnamPro_Bold, color: "#000", fontSize: 28, marginTop: wp(5), alignSelf: "center" },
    picStyle: { width: wp(50), height: wp(45), borderRadius: 20, alignSelf: "center", marginTop: wp(9), }
})