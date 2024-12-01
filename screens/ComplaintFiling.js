import React,{useState} from "react";
import {ScrollView,Text,TextInput,TouchableOpacity,View,Alert} from 'react-native'
import styles from "./ExternalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ComplaintFiling = ()=>{
    const [userIssue,setUserIssue] = useState('')
    const [issueDescription,setIssueDescription] = useState('')
    const [issueLocality,setIssueLocality] = useState('');
    const [userMobile,setUserMobile] = useState()

    //validate User mobile
    const pattern = /^[0-9]{10}$/
    //POST API for posting a new Task
async function fileComplaint(){
    try{
        if(!pattern.test(userMobile)){
            return Alert.alert('Please Enter a Valid Mobile Number')
        }
        if((!userIssue || !issueDescription || !issueLocality || !userMobile)){
            return Alert.alert('Please Fill All the Fields')
        }
        const getUserMail = await AsyncStorage.getItem('email')
        let newComplaint = await fetch('http://10.0.2.2:1500/fileComplaint',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:getUserMail,
                issue:userIssue,
                issueDescription:issueDescription,
                location:issueLocality,
                mobile:userMobile
            })
        })
        if(newComplaint){
            newComplaint = await newComplaint.json();
            setUserIssue('');
            setIssueDescription('');
            setIssueLocality('');
            setUserMobile('')
        }

    }
    catch(err){ 
        console.log(`Error Occured in getting all the complaints`,err)
    }
};
    return(
        <ScrollView keyboardShouldPersistTaps={'always'}>
             <View style={{justifyContent:'center',marginTop:100}}>
             <Text style={styles.mainText}>File Your Complaint Here</Text>
             <View style={styles.entryFiledView}>
             <TextInput placeholder="Enter the Issue" placeholderTextColor='darkslategrey' value={userIssue} onChangeText={(text)=>setUserIssue(text)} style={styles.textInputStyle}></TextInput></View>
            <View style={styles.entryFiledView}>
            <TextInput placeholder="Enter the Issue Description" placeholderTextColor='darkslategrey' value={issueDescription} onChangeText={(text)=>setIssueDescription(text)} style={styles.textInputStyle} multiline={true}></TextInput>
            </View>
          <View style={styles.entryFiledView}>
          <TextInput placeholder="Enter the locality" placeholderTextColor='darkslategrey' value={issueLocality} onChangeText={(text)=>setIssueLocality(text)} style={styles.textInputStyle} multiline={true}></TextInput>
          </View>
           <View style={styles.entryFiledView}>
           <TextInput placeholder="Enter your Mobile Number" placeholderTextColor='darkslategrey' value={userMobile} onChangeText={(text)=>setUserMobile(text)} style={styles.textInputStyle}></TextInput>
           </View>
            <TouchableOpacity style={styles.touchableStyle} onPress={()=>fileComplaint()}>
                <Text style={styles.buttonStyle}>Submit the Issue</Text>
            </TouchableOpacity>
             </View>
        </ScrollView>
    )
}


export default ComplaintFiling