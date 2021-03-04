import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {UserSelectList, HomeScreen} from './components/views/'
import DrawerContent from './components/DrawerContent'
import UserState from './UserState'
import UserContext from './UserContext'


const Drawer = createDrawerNavigator()
export default function App() {
  return (
    <UserState>
      <UserContext.Consumer>
        {context => {
          return (
            <>
              <NavigationContainer >
                <Drawer.Navigator 
                  drawerContentOptions={{
                    activeTinetColor:"#eaeaea",
                    activeBackgroundColor:"#fefefe",
                    itemStyle: {marginVertical:0}
                  }}
                  initialRouteName='Accueil'
                  drawerContent={props=> <DrawerContent {...props}/>}
                  screenOptions={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor:"#eaeaea"
                    },
                    headerTintiColor:"#fefefe",
                  }}
                >
                  <Drawer.Screen 
                    name="Accueil"
                    component={HomeScreen}
                    option={{drawerLabel:"Home"}}
                    />

                  {!context.state.isLogged ?     
                    <Drawer.Screen
                      name="Connexion"
                      options={{drawerLabel:"Connexion"}}
                      component={UserSelectList} />

                      :
                      null
                  }
                </Drawer.Navigator>
              </NavigationContainer>
            </>
          )
        }}
      </UserContext.Consumer>
    </UserState>
  )
}
