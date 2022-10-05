import React, {useState} from "react";
import { StyleSheet , View, Image, TouchableOpacity, TextInput} from "react-native";
import { color } from "../../utility";
import styles from "./styles";
const FieldInput = ({
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ref,
  onSubmitEditing,
  getRef,
  fieldStyle,
  inputStyle,
  uriIconTitle,
  buttonIcon,
  uriIconOff,
  uriIconOn,
}) => {
    let [eye, setEye] = useState(buttonIcon);
    return (
    <View style={[ styles.containerDataEntry, fieldStyle ]}>
        {/* ICON LEFT */}
        <Image 
        style={[ styles.icon ]}
        source={ uriIconTitle }
        ></Image>
        {/* TEXT INPUT */}
        <TextInput
        style={[styles.textDataEntry, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={eye}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType={"next"}
        ref={ref}
        getRef={getRef}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={color.GRAY_BLAND}
      />
        {/* check right have BUTTON ICON RIGHT  */}
        {
            buttonIcon && 
            <TouchableOpacity 
            style= {styles.icon}
            onPress= {() => setEye(!eye)}
            >
                <Image 
                style={ {height: '100%', width: '100%'} }
                source={ eye ? uriIconOff : uriIconOn }
                ></Image>
            </TouchableOpacity>
        }
    </View>
  );
};

export default FieldInput;