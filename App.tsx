/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function QRScanner({enableTorch, defaultTorchOn, enableZoom, defaultZoom, onScannedData} : any): React.JSX.Element {
const cameraRef: any = useRef(null);
const [zoomvalue, setzoomvalue] = useState(defaultZoom);
const [Torch, setTorch] = useState(defaultTorchOn);
const onPress = () => {
  if (Torch) {
    setTorch(false);
  }
  else {
     setTorch(true);
  }
};
  const _handleBarCodeRead = (e:any) => {
    onScannedData && onScannedData(e.data);
  };
  const zoominPress = () =>{
    switch (Platform.OS) {
      case 'ios':
        if (zoomvalue >= 0 && zoomvalue < 0.1){
          setzoomvalue(zoomvalue + 0.025);
        }
        break;
      case 'android':
        if (zoomvalue >= 0 && zoomvalue < 1){
          setzoomvalue(zoomvalue + 0.25);
        }
      default:
        break;
    }
  };
  const zoomoutPress = () =>{
    switch (Platform.OS) {
      case 'ios':
        if (zoomvalue > 0.025 && zoomvalue <= 0.1){
          setzoomvalue(zoomvalue - 0.025);
        }
        break;
      case 'android':
        if (zoomvalue > 0 && zoomvalue <= 1){
          setzoomvalue(zoomvalue - 0.25);
        }
      default:
        break;
    }
  };
    return (
      <View style={{ flex: 1 }}>
          <RNCamera
            ref={(ref) => (cameraRef.current = ref)}
            style={{ flex: 1}}
            zoom = {zoomvalue}
            captureAudio={false}
            onBarCodeRead={(e) => _handleBarCodeRead(e)}
            androidCameraPermissionOptions={null}
            androidRecordAudioPermissionOptions={null}
            flashMode=  {Torch ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          >
          <View style={styles.rectangleContainer}>
            <View style={{ flexDirection:'row', alignSelf:'center' }}>
              <View style={styles.topLeft} />
              <View style={styles.topRight} />
            </View>
            <View style={{ flexDirection:'row', alignSelf:'center' }}>
              <View style={styles.bottomLeft} />
              <View style={styles.bottomRight} />
            </View>
          </View>
          </RNCamera>
          <View style={styles.torchbutton}>
          { enableTorch && (<View style={{ flexDirection:'row', alignSelf:'flex-end' , paddingLeft:300 , bottom: 125 }}>
            <MaterialCommunityIcon name= {Torch ? 'flashlight' : 'flashlight-off'}  backgroundColor="transparent" color= "white" size={50} style={{paddingRight:0}} onPress={onPress} />
          </View>)}
        {enableZoom && Platform.OS == 'android' && (<View style={{ flexDirection:'row', alignSelf:'center' , bottom: 100 }}>
        <FeatherIcon name="zoom-out" backgroundColor="transparent" color= {zoomvalue == 0 ? 'black' : 'white'} size={50} style={{paddingRight:0}} onPress={zoomoutPress} />
            <EntypoIcon name="dot-single" color= {zoomvalue >= 0 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.25 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.5 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.75 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 1 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
          <FeatherIcon name="zoom-in" backgroundColor="transparent" color={zoomvalue == 1 ? 'black' : 'white'} size={50} style={{paddingLeft:0}} onPress={zoominPress} />
        </View> )}
        {enableZoom  && Platform.OS == 'ios' && (<View style={{ flexDirection:'row', alignSelf:'center' , bottom: 100 }}>
        <FeatherIcon name="zoom-out" backgroundColor="transparent" color= {zoomvalue == 0 ? 'black' : 'white'} size={50} style={{paddingRight:0}} onPress={zoomoutPress} />
            <EntypoIcon name="dot-single" color= {zoomvalue >= 0 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.025 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.05 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.075 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
            <EntypoIcon name="dot-single" color={zoomvalue >= 0.1 ? 'red' : 'white'} size={25} style={{paddingTop:10}} />
          <FeatherIcon name="zoom-in" backgroundColor="transparent" color={zoomvalue == 1 ? 'black' : 'white'} size={50} style={{paddingLeft:0}} onPress={zoominPress} />
        </View> )}
        </View>
    </View>
    );
}
QRScanner.defaultProps = {
  enableTorch: true,
  enableZoom: true,
  defaultZoom: 0,
  defaultTorchOn: false,
};
const styles = StyleSheet.create({
  torchbutton:{
    position: 'absolute',
    bottom: 10,
    justifyContent: 'space-between',
    alignItems:'center',
    alignSelf: 'center',
  },
  rectangleContainer: {
    flexDirection: 'row',
    height:'60%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  topLeft: {
    top: 0,
    left: 20,
    width: 50,
    height: 50,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#099DDB',
  },
  topRight: {
    top: 0,
    right: -75,
    width: 50,
    height: 50,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#099DDB',
  },
  bottomLeft: {
    top: 100,
    left: -80,
    width: 50,
    height: 50,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#099DDB',
  },
  bottomRight: {
    top: 100,
    right: 25,
    width: 50,
    height: 50,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#099DDB',
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});
export default QRScanner;
