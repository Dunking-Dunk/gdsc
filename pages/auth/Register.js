import React, {useState} from "react";
import { Text, View, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc} from "firebase/firestore";
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';

import {db} from '../../firebaseConfig'
import Color from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";


const Register = () => { 
    const [register,setRegister] = useState({
        password: "",
        email: "",
        username: ""
    })
    const auth = getAuth()
    const [page,setPage] = useState(0)

    const inputHandler = (value,title) => {
        setRegister((state) => ({...state, [title]: value}))
    }

    const pageHandler = () => {
        if (page === 0) setPage(1)
        else setPage(0)
    }

    const submitHandler = () => {
        const {email, password, username} = register
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                username,
                email
              });
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Toast.show(errorMessage, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,})
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          console.log(result.assets[0].uri);
        }
      };


    return (
        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
        <View style={styles.textInputContainer}>

                {page === 0 ? (
                    <View style={{ width: '100%' }}>
                       <Text style={styles.name}>Vision</Text>
                       <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => inputHandler(text, 'username')} value={register.username} placeholderTextColor={Color.four} autoCorrect keyboardType="default"/>
                           <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => inputHandler(text, 'email')} value={register.email} placeholderTextColor={Color.four} autoCorrect keyboardType="email-address"/>
                           <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => inputHandler(text, 'password')} value={register.password} placeholderTextColor={Color.four} secureTextEntry={true}/>
                        <CustomButton style={styles.formButtons} color={Color.four} onPress={pageHandler}>
                               <Text style={{color: Color.one}}>Next</Text>
                       </CustomButton>
                   </View>
                ) :
                    (
                        <View style={{ width: '100%', height: '100%',justifyContent: 'center' }}>
                            <Text style={{textAlign: 'center', fontSize: 28, marginBottom: 5}}>Fill the detail about the blind person</Text>
                       <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => inputHandler(text, 'username')} value={register.username} placeholderTextColor={Color.four} autoCorrect keyboardType="default"/>
                            <TextInput style={styles.input} placeholder="Age" onChangeText={(text) => inputHandler(text, 'email')} value={register.email} placeholderTextColor={Color.four} autoCorrect keyboardType="default" />
                            <Button title="Pick an image from camera roll" onPress={pickImage} />
                            <View style={{marginTop: 15}}>
                            <CustomButton style={styles.formButtons}  color={Color.four} onPress={pageHandler}>
                               <Text style={{color: Color.one}}>Back</Text>
                                </CustomButton>
                                <CustomButton style={styles.formButtons}  color={Color.four} onPress={submitHandler}>
                               <Text style={{color: Color.one}}>Submit</Text>
                       </CustomButton>
                            </View>
                   </View>
                )
                }
             
           
        </View> 
    </KeyboardAvoidingView>
    )
}

export default Register



const styles = StyleSheet.create({
    form: {
        flex: 1,
        backgroundColor: Color.one,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: Color.four,
        fontSize: 100,
        marginBottom: 50,
        fontWeight: '600'
    },
    textInputContainer: {
        width: '90%',
        alignItems: 'center',
        padding: 20,
        height: '80%'
    },
    input: {
        width: '90%',
        height: 50,
        marginBottom: 20,
        borderBottomColor: Color.four,
        borderBottomWidth: 1,
        color: Color.four
    },
    formButtons: {
        marginTop: 20,
        width: '100%',
        backgroundColor: Color.four,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
