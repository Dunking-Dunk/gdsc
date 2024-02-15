import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {db} from '../../firebaseConfig'
import { Text, View } from "react-native";

const Profile = () => {
    const [profile, setProfile] = useState(null)

    useEffect(() => {   
    async function helper() {      
        const docRef = doc(db, "caregiver");
        const docSnap = await getDoc(docRef);
        console.log(docSnap)
        setProfile(docSnap)
    }
    helper()
    }, [])
    print(profile)
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Profile</Text>
        </View>
    )
}

export default Profile