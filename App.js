import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from './config';

import { Login, Signup, Welcome, Dashboard} from "./src";
//import { HeaderX } from "./components/HeaderX";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
        name="Welcome" 
        component={Welcome}
        options={{
           headerShown: false
         }} 
        />
        
        <Stack.Screen
        name="Login" 
        component={Login}
        options={{
            headerShown: false
          }
        } 
        />
         <Stack.Screen
        name="Signup" 
        component={Signup}
        options={{
            headerShown: false
          }
        } 
        />        
      </Stack.Navigator>
    );
  }

  return(
    <Stack.Navigator>
      <Stack.Screen
      name="Dashboard" 
      component={Dashboard}
      options={{
        headerShown: false
      }} 
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
