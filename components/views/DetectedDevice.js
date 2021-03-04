import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function DetectedDevice(props)
{
  
  function connectTo(device)
  {
    device.connect()
      .then((dev) =>{
        return dev.discoverAllServicesAndCharacteristics();
      })
      .then((dev) => {
        console.log(`detected____: ${dev}`, dev);
      }).catch((err) => {
        console.log(`Custom BLE error : ${err}`);
      })
        console.info(device.discoverAllServicesAndCharacteristics());
  }


  return (

    <TouchableOpacity
      onPress={()=>{
        connectTo(props.device);
      }}
      style={{marginVertical:5, backgroundColor:"lightgrey", padding:5, borderRadius:3, width:250 }}
    >
      <Text
        style={{fontSize:15, textAlign:"center"}}>{props.device["name"]} - {props.device["localName"]} - {props.device["id"]}</Text>
    </TouchableOpacity>
  )
}
