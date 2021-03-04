import React, {useContext} from 'react';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer";
import {Text, View, StyleSheet} from 'react-native';
import UserContext from '../UserContext';

const drawer = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
    marginVertical:10
  },
  text:{
    fontSize:15,
    color:"black"
  },
  errorText:{
    padding:2,
    color:"white",
    backgroundColor:"#f48d6e",
    borderRadius:3
  },
  drawerItem: {
    backgroundColor:"#f45d49",
  }
})

export default function DrawerContent(props) {
  const {state, signOut} = useContext(UserContext);

  return (
    <DrawerContentScrollView>
        <View style={drawer.container}>
          {state.isLogged ?
            <Text style={drawer.text}>{state.email}</Text>
            :
            <Text style={drawer.errorText}>Déconnecté</Text>
          }
        </View>
        <DrawerItemList {...props}/>

      <View
        style={{
          flex:1,
          height:"100%",
          justifyContent:"flex-end",
        }}>
        {state.isLogged ? 

          <DrawerItem
            style={drawer.drawerItem}
            labelStyle={{color:"white"}}
            label="Déconnexion"
            onPress={()=> {
              signOut();
              props.navigation.toggleDrawer();
            }}/>
            :
            null
        }
      </View>
    </DrawerContentScrollView>
  )

}
