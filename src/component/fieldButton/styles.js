import { StyleSheet , Dimensions} from "react-native";
import { color } from "../../utility";
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default StyleSheet.create({
    containerButton: {
        width: widthScreen * 0.9,
        height: heightScreen * 0.05,
        marginHorizontal: widthScreen * 0.05,
        marginTop: heightScreen * 0.025,
        borderRadius: 5,
        elevation: 4,
        backgroundColor: color.BLUE_DARK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: widthScreen * 0.045,
        height: heightScreen * 0.0225,
        width: widthScreen * 0.045
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.WHITE,
    },
});