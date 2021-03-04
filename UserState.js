import React, { useReducer} from 'react'
import axios from 'axios';
import UserContext, {UserInit} from './UserContext'
import UserReducer from './components/UserReducer'
import {SIGN_IN, SIGN_OUT,SET_EMAIL, SET_NAME, SET_TOKEN, SET_MATRICULE} from './components/types'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserState(props) {

  const [state,dispatch] = useReducer(UserReducer,UserInit);
  const axios = require('axios');

  function setToken(token) {
    dispatch({type:SET_TOKEN, payload:token})
  }

  function setEmail(email) {
    dispatch({type:SET_EMAIL, payload:email});
  }

  function setName(name) {
    dispatch({type:SET_NAME, payload:name});
  }

  function setMatricule(matri) {
    dispatch({type:SET_MATRICULE, payload:matri});
  }

  async function signIn(email, matricule, name) {
      try {
        const parseData = JSON.stringify({email, matricule, name});
        await AsyncStorage.setItem('user', parseData)
      } catch(e) {
        console.error(e);
      }
      dispatch({type:SIGN_IN, payload:{email, matricule, name}});
  }

  async function isSignIn(){
    try {
      let user = await AsyncStorage.getItem('user');
      user = user != null ? JSON.parse(user) : null;
      if(user != null) {
        signIn(user.email, user.matricule, user.name);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
    }
  }

   function getToken() {
    var req = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:auth="http://auth.hq.services.horoquartz.fr/" xmlns:xsd="http://www.horoquartz.fr/services/hq/auth/xsd" xmlns:core="http://www.horoquartz.fr/ws/core"> <soapenv:Header/>  <soapenv:Body>  <auth:getToken>  <tokenRequest> <!--Optional:--> <xsd:user>samuel</xsd:user> <!--Optional:--> <xsd:password>123456</xsd:password> <!--Optional:--> <xsd:clientCode>?</xsd:clientCode> <!--Zero or more repetitions:--> <xsd:parameters> <!--Optional:--> <core:key>?</core:key> <!--Optional:--> <core:value>?</core:value> </xsd:parameters> </tokenRequest> </auth:getToken> </soapenv:Body> </soapenv:Envelope>';
    try {
      axios
        .post('http://saturnewebforma.mamp.fr/t3-services/services/SelfServices?wsdl',
          req, {
            headers: {
              'Content-Type':'text/xml',
            }
          })
        .then((data) => console.log(data))
        .catch((e) => console.error("Axios req err:", e));
    } catch(err) {
      console.error(err)
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.setItem('user',"");
      dispatch({type:SIGN_OUT, payload:false});
    } catch(e) {
      console.error(e);
    }
  }

  

  return (
    <UserContext.Provider value = {{state, dispatch, setToken, setEmail, setName, setMatricule, signIn, signOut, isSignIn, getToken }}>
      {props.children}
    </UserContext.Provider>
  )
}
