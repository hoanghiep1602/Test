import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import SignUp from './SignUp';
import HomeScreen from './Homescreen';
import API from './Api';
import APIedit from './EditApi';
import List from './List';
import ResetPW from './ResetPW';



const Stack = createStackNavigator();
 
function MyStack () 
{
  return (
     <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login}  options={{headerShown:false}} />
      <Stack.Screen name="Signup" component={SignUp}  options={{headerShown:false}}  />
       <Stack.Screen name="List" component={List}  options={{headerShown:false}}/>
     <Stack.Screen name="Api" component={API}  options={{headerShown:false}} />
     <Stack.Screen name="EditAPI" component={APIedit}  options={{headerShown:false}} />

    <Stack.Screen name="ResetPW" component={ResetPW}  options={{headerShown:false}} />
     
      
    </Stack.Navigator>

  );

}
export default function App() {
  return (
     <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}
  

