import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import UpdateModal from "./UpdateModal";
const Home = ()=>{
    const [complaintList,setComplaintList] = useState([])
   
    //Update Modal Handling
    //Modal State 
  const [showModal,setShowModal] = useState(false)
  const closeModal = ()=>{
    setShowModal(false)
  }
 
  //catching Id for update
  const [catchId,setCatchId] = useState('')


    //GET API for getting all the complaints
    async function getComplaintsList(){
        try{
            const getUserMail = await AsyncStorage.getItem('email')
            let allComplaints = await fetch(`http://10.0.2.2:1500/getComplaintsList/${getUserMail}`);
            if(allComplaints){
                allComplaints = await allComplaints.json();
                setComplaintList(allComplaints)
            }
        }
        catch(err){ 
            console.log(`Error Occured in getting all the complaints`,err)
        }
};

//useEffect for getting Complaints Data
useEffect(()=>{
  getComplaintsList()
},[complaintList])

//Id for delete API
const [deleteCatchId,setDeleteCatchId] = useState('')

//Delete API for deleting Issue
const deleteIssue = async()=>{
    try{
      let deletedIssue = await fetch('http://10.0.2.2:1500/deleteIssue',{
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              deleteIssueId:deleteCatchId
          })
      });
      deletedIssue? console.log('Request Successful'):console.log('Unable to make a request')
      deletedIssue = await deletedIssue.json();
      console.log(deletedIssue);
  }
  catch(err){
      console.log(`Data Cannot be Updated,${err}`)
  }
  }
  

    return(
        <View>
            {
                complaintList.map((item,index)=>{
                    return(
                        <View key={index} style={styles.complaintView}>
                            <Text style={styles.complaintTextStyle}>{item.issue}</Text>
                            <Icon name='edit' size={20} color='green' onPress={()=>{setShowModal(true);setCatchId(item._id)}}></Icon>
                            <Icon name='trash' size={20} color='red' onPress={()=>{setDeleteCatchId(item._id);deleteIssue()}}></Icon>
                            {
                              showModal? <UpdateModal showModal={showModal} closeModal={closeModal} setCatchId={catchId}></UpdateModal>:null
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

export default Home

//internal styles

const styles = StyleSheet.create({
    complaintView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:10,
        borderColor:'transparent',
        margin:10,
        padding:20
    },
    complaintTextStyle:{
        color:'rgb(40, 133, 184)',
        fontSize:20,
        fontFamily:'sans-serif'
    }

})