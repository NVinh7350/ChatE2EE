import { StyleSheet , Dimensions} from "react-native";
import { color } from "../../utility";
const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default styles = StyleSheet.create({
    containerMessage:{
        backgroundColor: color.GRAY_CLOUD,
        borderRadius:20,
        justifyContent:"space-around",
        marginVertical:heightScreen*0.005,
        marginHorizontal: widthScreen * 0.025,
    },
    textMessage:{
        color: color.BLACK,
        fontSize: 16,
        marginVertical: heightScreen*0.005,
        fontWeight: "500",
        maxWidth:widthScreen*0.7,
        padding: 8,
    }
})