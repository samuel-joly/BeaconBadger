import React, {
  useState ,
  useEffect,
} from 'react';
import { 
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  View ,
  DeviceEventEmitter
} from 'react-native';
import Beacons from 'react-native-beacons-manager';


export default function LoggedMain({navigation}) {
  const [scanning, setScanning] = useState(true);
  const [beacon, setBeacon] = useState(null);
  const [beaconInRangeStatus, setBeaconInRangeStatus] = useState(null);
  const [rssi, setRssi] = useState(null);
  const [proximity, setProximity] = useState(null);
  const [distance, setDistance] = useState(null);

  const region = {
    identifier:"P ID 0054A3",
    uuid:"0102030405060708090A0B0C0D0E0F10",
  }

  useEffect(()=>{
    Beacons.detectIBeacons();
    Beacons
      .startRangingBeaconsInRegion(region) 
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
    Beacons
      .startMonitoringForRegion(region)
      .then(() => console.log('Beacons monitoring started succesfully'))
      .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));

    const beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        if(data.beacons.length > 0) {
          setBeacon(data.beacons[0]);
          setDistance(data.beacons[0]["distance"]);
          setProximity(data.beacons[0]["proximity"]);
          setRssi(data.beacons[0]["rssi"]);
        }
      }
    );

    const beaconsDidEnter = DeviceEventEmitter.addListener(
      'regionDidEnter',
      () => {
        setBeaconInRangeStatus('Entrée dans la zone du beacon');
      }
    );

    const regionDidExit = DeviceEventEmitter.addListener(
      'regionDidExit',
      () => {
        setBeaconInRangeStatus('Sortie de la zone du beacon');
      }
    );

    if(!scanning) {
      beaconsDidRange.remove();
      beaconsDidEnter.remove();
      regionDidExit.remove();
      Beacons
        .stopRangingBeaconsInRegion(region) 
        .then(() => console.log('Beacons ranging stopped succesfully'))
        .catch(error => console.log(`Beacons ranging not stopped, error: ${error}`));
      Beacons
        .stopMonitoringForRegion(region)
        .then(() => console.log('Beacons monitoring stopped succesfully'))
        .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`));
    }

    return () => {
      beaconsDidRange.remove();
      beaconsDidEnter.remove();
      regionDidExit.remove();
      Beacons
        .stopRangingBeaconsInRegion(region) 
        .then(() => console.log('Beacons ranging stopped succesfully'))
        .catch(error => console.log(`Beacons ranging not stopped, error: ${error}`));
      Beacons
        .stopMonitoringForRegion(region)
        .then(() => console.log('Beacons monitoring stopped succesfully'))
        .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`));
    }
  },[scanning])

  return (
    <View style={scanner.flexCol}>
      <View style={scanner.border}>
        <TouchableOpacity 
          style={scanner.scanBtn}
          onPress={() =>{
            setScanning(!scanning)
            setBeaconInRangeStatus('');
          }}>
          {
            scanning ?
              (
                <View style={scanner.rowCenter}>
                  <Text style={scanner.text}>
                    Scan en cour 
                  </Text>
                  <ActivityIndicator size='large' color='#000000' style={{margin:10}}/>
                </View>
              ) 
              :
              (
                <Text 
                  style={scanner.text}>
                  Start scan
                </Text>
              )
          }

        </TouchableOpacity>
        <Text style={scanner.infoText}>{beaconInRangeStatus}</Text>
      </View>
      <View style={scanner.scrollable}>
        {beacon ?
            (
              <View style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <View style={scanner.rowCenter}><Text>rssi :</Text><Text>{rssi}</Text></View>
                <View style={scanner.rowCenter}><Text>Distance :</Text><Text>{distance}</Text></View>
                <View style={scanner.rowCenter}><Text>Proximity :</Text><Text>{proximity}</Text></View>
              </View>
            )
            :
          (<Text style={{textAlign:"center"}}>Pas de beacon détecté</Text>)
        }
      </View>
      <View style={scanner.bottom} >
        <TouchableOpacity style={scanner.connectBtn} >
          <Text style={scanner.text}>Badger</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const scanner = StyleSheet.create({
  scanBtn:{
    backgroundColor:"lightgreen",
    padding:5,
    margin:5,
    fontSize:40,
    width:400,
    borderRadius:5,
    borderWidth:0
  },
  connectBtn:{
    backgroundColor:"lightblue",
    color:"white",
    fontSize:40,
    padding:5,
    borderRadius:5,
    borderWidth:0,
    width:400,
  },
  text:{
    textAlign:"center",
    fontSize:25,
    display:"flex",

  },
  border:{
    height:50,
    width:"100%",
    marginVertical:5
  },
  bottom:{
    position:"absolute",
    bottom:60,
    left:5
  },
  scrollable:{
    flex:1,
    maxHeight:600,
    justifyContent:"center",
    alignItems:"center"
  },
  rowCenter:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
  },
  flexCol:{
    flex:1,
    flexDirection:"column"
  },
  infoText:{
    textAlign:"center",
    color:"green"
  }
})

