import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  UserSelectList: {
    display:"flex",
    flexDirection:"column",
    marginBottom:10,
    backgroundColor:"lightgrey",
  },
  UserSelectProfile: {
    fontSize:30,
    textAlign:"center",
    color:"black",
    margin:2,
    borderRadius:5,
    borderWidth:1,
    borderColor:"grey",
    padding:10
  },
  UserSelectProfileClicked : {
    fontSize:30,
    color:"white",
    margin:2,
    textAlign:"center",
    borderRadius:5,
    borderWidth:1,
    borderColor:"grey",
    padding:10
  },
  loginContainer: {
    justifyContent:"space-around",
    height:"100%",
    alignItems:"center",
    alignSelf:"center"
  },
})
