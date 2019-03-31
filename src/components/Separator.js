// testing functional components :p
import React from 'react';
import {View} from "react-native";
//functional components are easy to test, no state manipulation 007bff
const Separator =()=> (
   
    <View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    }}
  />
);
export default  Separator;