import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput,TouchableOpacity,Alert,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './ExternalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const SignIn = () => {

    const navigation = useNavigation() 

    //Password Toggler

    const [hidePassword, setHidePassword] = useState(true);
    const [iconVisible, setIconVisible] = useState(false);
    const [valPassword, setValPassword] = useState('');
 
    const handlePassword = (item) => {
       setValPassword(item);
       setIconVisible(item.length > 0);
    };
 
    const togglePasswordVisibility = () => {

        setHidePassword(!hidePassword);

    };
 
 
    //User email collection
    const [userEmail,setUserEmail] = useState('')
 

    //API for Login
    const userLogin = async()=>{
          if(!userEmail || !valPassword){
            Alert.alert('Please fill both the fields');
            return;
        }
        try{
             let token = await fetch('http://10.0.2.2:1500/loginUser',{
             method:'POST',
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify({
                 email:userEmail,
                 password:valPassword
            })

        })
        if(token.status=='200'){
          token = await token.json();
          Alert.alert('User Logged In Successfully')
          await AsyncStorage.setItem("token",token.tokenData);
          await AsyncStorage.setItem("email",token.email)
          setUserEmail('');
          setValPassword('')
          navigation.navigate('HomeScreen')
        }

        else{
            return Alert.alert('User does not exist')
        }
    }
    catch(err){
       
    }
 }
 
    return (

        <ScrollView keyboardShouldPersistTaps={'always'}>

            <View style={styles.outerView}>

                <View style={styles.mainLogo}>
                   <Text style={styles.mainLogoStyles}>City Assist</Text>
                </View>
                <Text style={styles.mainText}>Login to Your Account</Text>
                <View style={styles.entryFiledView}>
                    <Icon name='user' size={22} color='cornflowerblue' style={{left:-25}} />
                    <TextInput

                        style={styles.textInputStyle}

                        placeholder='Enter your email Id'

                        placeholderTextColor='darkslategrey'

                        value={userEmail}

                        onChangeText={(text)=>setUserEmail(text)}

                    />

                </View>

                <View style={styles.entryFiledView}>

                    <Icon name='lock' size={22} color='cornflowerblue' />

                    <TextInput

                        style={[styles.textInputStyle,{right:-30}]}

                        placeholder='Enter your Password'

                        placeholderTextColor='darkslategrey'

                        secureTextEntry={hidePassword}

                        onChangeText={(val) => handlePassword(val)}

                        value={valPassword}

                    />

                    {iconVisible && (

                            <Icon

                                onPress={togglePasswordVisibility}

                                name={hidePassword ? 'eye' : 'eye-off'}

                                size={20}

                                color='cornflowerblue'

                            />

                    )}

                </View>

                <TouchableOpacity style={styles.forgotView}>

                    <Text style={styles.forgotText}>Forgot Password</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableStyle} onPress={userLogin}>

                    <Text style={styles.buttonStyle}>Login Account</Text>

                </TouchableOpacity>

                <View style={styles.registerView}>

                    <Text style={styles.noAccountText}>Don't have an Account</Text>
                     <TouchableOpacity onPress={()=>{navigation.navigate('RegisterScreen')}}>

                        <Text style={styles.registerText}>Register Now</Text>

                    </TouchableOpacity>

                </View>

            </View>

        </ScrollView>

    );

};
 
export default SignIn;