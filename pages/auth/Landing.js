import React, {useRef, useEffect} from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import LottieView from 'lottie-react-native';

import Color from '../../constants/Colors'
import CustomButton from '../../components/CustomButton'


const LandingPage = props => {
        const animation = useRef(null);

        useEffect(() => {
          // You can control the ref programmatically, rather than using autoPlay
          // animation.current?.play();
        }, []);

    return (
        <View style={styles.view}>
            <Text style={styles.title}>Vision</Text>
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
      
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/eye2.json')}
      />
            <View style={styles.buttonView}>
                <CustomButton onPress={() => { props.navigation.navigate('Register') }} color={Color.four} style={styles.button}>
                    <Text style={{color: Color.one}}>Register</Text>
                </CustomButton>
                <CustomButton onPress={() => { props.navigation.navigate('Login') }} color={Color.four} style={styles.button}>
                    <Text style={{color: Color.one}}>Login</Text>
                </CustomButton>
            </View>
        </View>
    )
        

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.one
    },
    buttonView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }, title: {
        fontSize: 120,
        fontWeight: '600',
        color: Color.four
    },
    button: {
        height: 50,
        width: 120,
        color: Color.one,
        backgroundColor: Color.four,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default LandingPage