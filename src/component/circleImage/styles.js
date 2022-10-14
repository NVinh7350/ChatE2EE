import { StyleSheet , Dimensions} from "react-native";
import { color } from "../../utility";
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default StyleSheet.create({
    containerImage :{
        height: heightScreen * 0.075,
        aspectRatio: 1,
        borderRadius: 100,
    },
    image :{
        height: '100%',
        aspectRatio: 1,
        borderRadius: 100,
    }
})