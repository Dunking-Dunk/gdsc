import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapViewDirections from 'react-native-maps-directions';

import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import VisionMarker from '../../components/Map/VisionMarker'
import { db } from "../../firebaseConfig";
import MapView from '../../components/Map/MapView'
import { doc, onSnapshot } from "firebase/firestore";
import useUserStore from "../../store/userStore";
import Loader from "../../components/Loader";
import Colors from "../../constants/Colors";
import useMapContext from "../../components/Map/useMapContext";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../components/Map/MapView";


const GOOGLE_MAPS_APIKEY ='AIzaSyAaCWjzUJ1XziqSuWycOTNorOmfe2swDIc';

const Home = () => {
    const currentUser = useUserStore((state) => state.currentUser)
    const userCoords = useUserStore((state) => state.userCoords)
    const { map, setMap } = useMapContext()

    const [navigate,setNavigate] = useState(false)
    const [visionUser, setVisionUser] = useState(null)
 
    useEffect(() => {
        if (currentUser)
 onSnapshot(doc(db, "visionUser", currentUser.visionUser), (doc) => {
    setVisionUser(doc.data())
});
    }, [currentUser])
    
    function visionCenter() {
        if (map)
        map.animateToRegion({
            latitude: visionUser.coords.latitude,
            longitude: visionUser.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
          });
    }

    function navigationCenter() { 
        setNavigate((state) => !state)
    }

    if (visionUser) {
        return (
            <View style={{flex: 1}}>
                <MapView>
                    <VisionMarker userCoords={visionUser.coords} />
                    {navigate && (
                    <MapViewDirections
                    origin={userCoords}
                    destination={visionUser.coords}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                                        strokeColor={Colors.three}
                                        
                  />
                    )}

                </MapView>
                <TouchableOpacity style={styles.visionCenter} onPress={visionCenter} >
                    <FontAwesome6 name="person" size={32} color={Colors.two}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationCenter} onPress={navigationCenter} >
                <FontAwesome5 name="route" size={32} color={Colors.two} />
                </TouchableOpacity>
            </View>
        )
    } else {
        return <Loader/>
    }

}

export default Home

const styles = StyleSheet.create({
    visionCenter: {
        position: 'absolute',
        bottom: 15,
        right: 80,
        zIndex: 2,
    },
    navigationCenter: {
        position: 'absolute',
        bottom: 15,
        right: 130,
        zIndex: 2,
    }
})