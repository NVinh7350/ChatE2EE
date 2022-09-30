import { StyleSheet , Dimensions} from "react-native";
import { color } from "../../utility";
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default StyleSheet.create({
    boxDataEntry: {
        height: heightScreen * 0.05,
        marginHorizontal: widthScreen * 0.05,
        marginTop: heightScreen * 0.025,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: color.WHITE,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: '5%',
        height: '45%',
        width: '5%'
    },
});