import React, {useContext, useState}  from 'react';
import {ScrollView, Text, View, Button, TextInput} from 'react-native'
import UserSelectProfile from './UserSelectProfile';
import UserContext from './../../UserContext';
import style from './../../styles/'
import {UserProfile} from './../data/UserProfile';

export default function UserSelectList({navigation}) {

  const { signIn, state } = useContext(UserContext);
  const [toSearch, setToSearch] = useState(null);

  return (
    <View style={style.loginContainer}>
      <View>
        <Text 
          style={{
            alignSelf:"center",
            fontSize:30
          }}>
          {state.name ? state.name : null}
        </Text>
        <Text 
          style={{
            alignSelf:"center",
            fontSize:20
          }}>
          {state.email ? state.email : "Sélectionnez un compte"}
        </Text>
        <Text
          style={{
            alignSelf:"center",
            fontSize:15
          }}>
          {state.matricule ? state.matricule : null}
        </Text>
      </View>
      <View
        style={{ height:450, marginBottom:37 }}>
        <TextInput
          style={{ borderColor:"lightgray", borderWidth:1, height:40, backgroundColor:"#eaeaea", color:"black", fontSize:15}}
          onChangeText={(txt) => setToSearch(txt)}
          placeholder="Cherchez votre nom/prénom"
        />
        <ScrollView
          style={{ width:370 }}>
          {toSearch == null ?    
          UserProfile.map((userProfile, key) =>
            <UserSelectProfile
              name={userProfile.name}
              email={userProfile.email}
              matricule={userProfile.matricule} 
              key={key}
            />)
            : UserProfile.filter((userProfile) =>
              (userProfile.name.indexOf(toSearch) != -1) || (userProfile.email.indexOf(toSearch) != -1)).map((userProfile, key) => 
            <UserSelectProfile
              name={userProfile.name}
              email={userProfile.email}
              matricule={userProfile.matricule} 
              key={key}
            />
            )
          }
        </ScrollView>
        <View>
          <Button 
            title='Connexion' 
            onPress={() => {
              signIn(state.email, state.matricule, state.name);
              navigation.navigate("Accueil");
            }}/>
        </View>
      </View>
    </View>
  )
}
