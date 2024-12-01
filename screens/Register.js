import { ScrollView,View, Text,TextInput, TouchableOpacity,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import styles from './ExternalStyles'
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
//component
const SignUp = () => {
    const navigation = useNavigation()

    //Address Validation
    const [collectAddress,setCollectAddress] = useState('')
 
    //email Validation
    const [collectEmail,setCollectEmail] = useState('');
    const [validEmail,setValidEmail] = useState('')
    //Email Regex
    const emailPattern = /^([a-zA-Z0-9_\-\^])+@([a-z0-9_-])+\.[a-z]{2,4}$/
    //function for handling Email
    function handleEmail(value){
        setCollectEmail(value);
        if(value.length>0){
            setValidEmail(emailPattern.test(value))
        }
    }
    //Password Regex
    const passwordPattern = /^(?=(?:.*[A-Za-z]){1})(?=(?:.*[0-9]){1})(?=(?:.*[@_*%^]){1})[A-Za-z0-9@_*%^]{8,15}$/
 
    //Password Validation 
    const [collectPassword,setCollectPassword] = useState('');
    const [validPassword,setValidPassword] = useState('');
    const [comparePassword,setComparePassword]= useState('')
    //password handler function
    function handlePassword(value){
        setCollectPassword(value);
        setComparePassword(value)
        if(value.length>0){
            setValidPassword(passwordPattern.test(value))
        }
    }
 
    //confirm password handler
    const [confirmPassword,setConfirmPassword] =useState('');
    const [lengthCheck,setLengthCheck] = useState('')
    //confirm password handler function
    function handleConfirmPassword(value){
        setConfirmPassword(value);
        if(value.length>0){
            setLengthCheck(true)
        }
    }
 
    // Login Navigation Function
    function LoginNavigation(){
        navigation.navigate('LoginScreen')
    }
 
    //Create Account API
    async function createAccount(){
        if(!collectEmail || !collectAddress || !collectPassword || !confirmPassword){
            return Alert.alert('Please Fill All the Fields')
        }
       try{
        let resultMessage = await fetch('http://10.0.2.2:1500/createAccount',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                    email:collectEmail,
                    password:collectPassword,
                    address:collectAddress
                }
            )
        })
        if(resultMessage){
            console.log('Process Completed');
            console.log(resultMessage);
            resultMessage = await resultMessage.json();
            console.log(resultMessage);
            setCollectEmail('');
            setCollectPassword('');
            setConfirmPassword('');
            setCollectAddress('')
            Alert.alert('User Created Successfully')
            LoginNavigation()
        }
       }
       catch(err){
        console.log(`Process Unsuccessful ${err}`);
       }
    }
    return (

        
<ScrollView keyboardShouldPersistTaps={'always'}>
<View style={styles.outerView}>
<View style={styles.mainLogo}>
<Text style={styles.mainLogoStyles}>City Assist</Text>
</View>
<Text style={styles.mainText}>Register Your Account</Text>
<View style={styles.entryFiledView}><Icon name='at-sign' size={22} color='cornflowerblue'></Icon><TextInput maxLength={30} style={styles.textInputStyle} placeholder='Enter your Email' placeholderTextColor='darkslategrey' onChangeText={(text)=>handleEmail(text)} value={collectEmail}></TextInput></View>
            {
                collectEmail.length>0?  (validEmail? null: <Text style={styles.warningText}>Enter Valid Email</Text>):null
            }
<View style={styles.entryFiledView}><Icon name='lock' size={22} color='cornflowerblue'></Icon><TextInput style={styles.textInputStyle} placeholder='Enter your Password' placeholderTextColor='darkslategrey' value={collectPassword} onChangeText={(text)=>handlePassword(text)}
                maxLength={15}></TextInput></View>
            {
                collectPassword.length>0? ((validPassword && collectPassword.length>8 )? null: <Text style={styles.warningText}>Please Enter a valid password</Text>):null
            }
<View style={styles.entryFiledView}><Icon name='lock' size={22} color='cornflowerblue'></Icon><TextInput style={styles.textInputStyle} placeholder='Confirm your Password' placeholderTextColor='darkslategrey' value={confirmPassword} onChangeText={(text)=>handleConfirmPassword(text)}></TextInput></View>
            {
               lengthCheck? (comparePassword===confirmPassword? null: <Text style={styles.warningText}>Passwords are not matching</Text>):null
            }
<View style={styles.entryFiledView}><Icon name='home' size={22} color='cornflowerblue'></Icon><TextInput maxLength={30} style={styles.textInputStyle} placeholder='Enter your Address' placeholderTextColor='darkslategrey' onChangeText={(text)=>setCollectAddress(text)} value={collectAddress}></TextInput></View>
            {
                (collectAddress.length>0 && collectAddress.length<3)? <Text style={styles.warningText}>Please Enter Valid UserName</Text>:null
            }
<TouchableOpacity style={styles.touchableStyle} onPress={()=>createAccount()}>
<Text style={styles.buttonStyle}>Create Account</Text>
</TouchableOpacity>
</View>
</ScrollView>
)
}
 
//exports 
export default SignUp