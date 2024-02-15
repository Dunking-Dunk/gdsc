import  React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { RootSiblingParent } from 'react-native-root-siblings';

import CustomHeaderButton from './components/headerButton';
import Main from './pages/Main'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Landing from './pages/auth/Landing';


const Stack = createNativeStackNavigator()
const auth = getAuth();

function Auth() {
  return (
      <Stack.Navigator initialRouteName='Landing' screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Landing" component={Landing}  options={{ headerShown: false }}  />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}



function Navigation() {

  const onLogout = () => {
    signOut(auth)
  }

  return (
    <Stack.Navigator >
      <Stack.Screen name='Main' component={Main} options={{
            headerTitle: "Vision",
            headerTitleStyle: {
              marginLeft: 50
            },
            headerRight: () => <HeaderButtons  HeaderButtonComponent={CustomHeaderButton}>
                <Item title="logout" iconName='log-out' onPress={onLogout}/>
            </HeaderButtons >
          }}/>
    </Stack.Navigator>
  )
}


export default function App() {
  const userContext = useContext(null)
  const [loading, setLoading] = useState({ loggedIn: false, loaded: false })
  const {loggedIn, loaded} = loading

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading({ loggedIn: true, loaded: true })
      } else {
        setLoading({ loggedIn: false, loaded: true })
      }
  
    })
  }, [])


  return (
    <RootSiblingParent>
          <NavigationContainer>
      {loggedIn ? <Navigation/>:  <Auth/>}
 
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
