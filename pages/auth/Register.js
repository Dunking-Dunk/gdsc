import React, {useState} from "react";
import { Text, View, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc} from "firebase/firestore";

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

    const inputHandler = (value,title) => {
        setRegister((state) => ({...state, [title]: value}))
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
         console.log(errorMessage)
        });
    }


    return (
        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
        <View style={styles.textInputContainer}>
            <Text style={styles.name}>Vision</Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => inputHandler(text, 'username')} value={register.username} placeholderTextColor={Color.four} autoCorrect keyboardType="default"/>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => inputHandler(text, 'email')} value={register.email} placeholderTextColor={Color.four} autoCorrect keyboardType="email-address"/>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => inputHandler(text, 'password')} value={register.password} placeholderTextColor={Color.four} secureTextEntry={true}/>
                    <CustomButton style={styles.formButtons}  color={Color.four} onPress={submitHandler}>
                        <Text style={{color: Color.one}}>Register</Text>
                </CustomButton>
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
        width: '80%',
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
