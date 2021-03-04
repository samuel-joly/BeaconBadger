import React, {useContext}  from 'react';
import {View} from 'react-native'
import UserContext from '../../UserContext'
import UserSelectList from './UserSelectList'
import style from '../../styles/'

export default function ConnexionScreen({navigation})
{
  return (
      <View style={style.loginContainer}>
        <UserSelectList/>
      </View>
  )
}
