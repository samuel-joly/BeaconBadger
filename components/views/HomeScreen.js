import React, { useEffect } from 'react';
import {View, Button, Text} from 'react-native'
import LoggedMain from './LoggedMain'
import UserContext from './../../UserContext'
import style from './../../styles/'

export default function HomeScreen({navigation})
{
  const {isSignIn, state} = React.useContext(UserContext);
  const [signedIn, setSignedIn] = React.useState(false);

  useEffect(() => {
    isSignIn();
  },[]);

  return (
    <View style={style.loginContainer}>
      {state.isLogged ? 
        <LoggedMain />
        :
        <Button
          title="Selectionnez un compte" 
          onPress={() => navigation.navigate("Connexion")}
        />
      }
    </View>
  )
}

