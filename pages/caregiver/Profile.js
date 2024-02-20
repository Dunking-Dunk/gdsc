import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import {View, Text, Image, StyleSheet }from 'react-native'
import {db} from '../../firebaseConfig'
import useUserStore from "../../store/userStore";

import Loader from '../../components/Loader'
import Colors from "../../constants/Colors";

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const currentUser = useUserStore((state) => state.currentUser)
    
    useEffect(() => {   
    async function helper() {      
        const docRef = doc(db, "visionUser", currentUser.visionUser);
        const docSnap = await getDoc(docRef);
        setProfile(docSnap.data())
        }
            helper()
    }, [])

    if (profile) {
        return (
            <View style={{flex: 1, paddingVertical: 15}}>
                <View style={styles.profile}>
                    <Image source={{ uri: profile.image }} style={styles.profileImage} />
                    <View style={styles.profileDetail}>
                        <Text style={styles.name}>{profile.name}</Text>
                        <View style={styles.row}>
                            <Text style={styles.header}>Age:</Text>
                        <Text style={styles.text}>{profile.age}</Text>
                        </View>
            
                    </View>
                </View>
            </View>
        )  
    }else return <Loader/>

}

export default Profile

const styles = StyleSheet.create({
    profile: {
        margin: 10,
        padding: 10,
        backgroundColor: Colors.two,
        borderRadius: 20,
        flexDirection: 'row'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    profileDetail: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
    },
    name: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.one
    }, 
    text: {
        fontSize: 18,
        fontWeight: '400'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    header: {
        fontWeight: 'bold',
    }
})