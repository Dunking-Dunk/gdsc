import React from "react";

import { Text, View } from "react-native";
import MapView from '../../components/Map/MapView'

const Home = () => {
    return (
        <View style={{flex: 1,}}>
                   <MapView/>
        </View>
    )
}

export default Home