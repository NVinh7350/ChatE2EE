import { StyleSheet , Dimensions} from "react-native";
import { color } from "../../utility";
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default StyleSheet.create({
    containerDataEntry: {
        height: heightScreen * 0.05,
        width: widthScreen * 0.9,
        marginHorizontal: widthScreen * 0.05,
        marginTop: heightScreen * 0.025,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: color.WHITE,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: widthScreen * 0.045,
        height: heightScreen * 0.0225,
        width: widthScreen * 0.045
    },
    textDataEntry: {
        marginLeft:widthScreen * 0.045,
        height: heightScreen * 0.06,
        width: widthScreen * 0.63 ,
        fontSize: 16,
        fontFamily: 'sans-serif-medium',
        color: color.BLACK,
    },
});