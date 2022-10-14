import { Dimensions } from 'react-native';

export let uuid = '';
export const smallDeviceHeight = 650; 
export const heightScreen = Dimensions.get('window').height;
export const widthScreen = Dimensions.get('window').width;
export const setUniqueValue  = (u) => {
    uuid = u;
}