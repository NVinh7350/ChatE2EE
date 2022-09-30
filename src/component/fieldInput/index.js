import React, {useState} from "react";
import { StyleSheet , View, Image, TouchableOpacity} from "react-native";
import  Input  from "../input"
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
  uriIconTitle,
  buttonIcon,
  uriIconOff,
  uriIconOn,
}) => {
    let [eye, setEye] = useState(buttonIcon);
    return (
    <View style={[ styles.boxDataEntry ]}>
        <Image 
        style={[ styles.icon ]}
        source={ uriIconTitle }
        ></Image>
        <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={eye}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType={"next"}
        ref={ref}
        getRef={getRef}
        onSubmitEditing={onSubmitEditing}
      />
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