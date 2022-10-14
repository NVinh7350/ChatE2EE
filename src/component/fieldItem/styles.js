import { StyleSheet , Dimensions} from "react-native";
import { color } from "../../utility";
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default styles = StyleSheet.create({
    containerItem: {
        height: heightScreen * 0.1,
        width: widthScreen ,
        flexDirection: 'row',
        paddingHorizontal: widthScreen*0.02,
    },
    textArea: {
        height: heightScreen * 0.08,
        width: widthScreen * 0.7 ,
        marginLeft: widthScreen*0.05,
        justifyContent:'center',
        paddingVertical: heightScreen*0.025,
        color: 'black',
    },
    textLarge: {
        fontSize: 17,
        color: 'black'
    },
    textMedium: {
        width:widthScreen * 0.905 ,
        fontSize: 14,
        textAlignVertical: 'bottom',
        color: 'black',
    }

})