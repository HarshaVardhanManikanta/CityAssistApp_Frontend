import React,{useState} from "react";
import {View,Modal,TextInput,Text,TouchableHighlight,StyleSheet,Button,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
const UpdateModal = ({showModal,closeModal,setCatchId})=>{
    const [hideModal,setHideModal] = useState(showModal)
    
    //Catching the updated issue
  const [updateUserIssue,setUpdateUserIssue] = useState('')

  //updateAPI
  const updateIssue = async ()=>{
    try{
        if(!updateUserIssue){
            return Alert.alert('Field cannot be Empty')
        }
        let updatedIssue = await fetch('http://10.0.2.2:1500/updateIssue',{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                replaceIssue:updateUserIssue,
                updateIssueId:setCatchId
            })
        });
        updatedIssue? console.log('Request Successful'):console.log('Unable to make a request')
        updatedIssue = await updatedIssue.json();
        console.log(updatedIssue.updateMessage);
        setUpdateUserIssue('')
    }
    catch(err){
        console.log(`Data Cannot be Updated,${err}`)
    }
  }


   return(
    <View style={styles.outerView}>
    <Modal transparent={true} visible={hideModal}> 
       <View style={styles.modalContainer}>
          <Icon name='x' size={20} color='darkslategrey' style={styles.closeIcon} onPress={()=>{closeModal();setHideModal(false)}}></Icon>
          <TextInput placeholder='Enter Updated Issue' style={styles.textInputStyle} value={updateUserIssue} multiline={true} onChangeText = {(text)=>setUpdateUserIssue(text)}></TextInput>
          <TouchableHighlight onPress={updateIssue}>
            <Text style={styles.buttonStyle}>Update Issue</Text>
           </TouchableHighlight>
        </View>
    </Modal>
</View>
   )
}

//exports
export default UpdateModal

//internal styles
const styles = StyleSheet.create({
    outerView:{
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 40,
        marginTop:250,
        marginLeft:20,
        marginRight:20,
        elevation:5,
    },
    textInputStyle:{
      borderColor:'lightblue',
      borderWidth:1,
      borderRadius:5,
      padding:10,marginBottom:10,
      fontSize:21,
      color:'purple',
    },
    buttonStyle:{
        color:'white',
        backgroundColor:'green',
        borderColor:'rgba(0,0,0,0)',
        borderRadius:5,
        padding:10,
        fontSize:20,
        textAlign:'center'
    },
    closeIcon:{
        marginBottom:10,
        textAlign:'right',
        right:-20,
        top:-15
    }
})