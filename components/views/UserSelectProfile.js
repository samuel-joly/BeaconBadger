import React, {useContext} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {View, StyleSheet} from 'react-native';
import UserContext from './../../UserContext';


const profile = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#d1d1d1",
    marginVertical:10,
    borderRadius:10,
  },
})
export default function UserSelectProfile(props) {
  const {setEmail, setMatricule, setName} = useContext(UserContext);

  return(
    <TouchableOpacity onPress={() => {
      setEmail(props.email);
      setMatricule(props.matricule);
      setName(props.name);
    }}>
      <View style={profile.container}>
        <Text style={{borderRadius:10,padding:10, fontSize:25,  textAlign:"center"}}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  )
}
