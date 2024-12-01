 
import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    outerView:{
       flex:1,
       marginTop:40
    },
    mainLogo:{
       flexDirection:'row',
       justifyContent:'center',
       marginBottom:70,
       marginTop:50
    },
    mainLogoStyles:{
        fontSize:60,
        color:'rgb(33, 117, 202)',
        fontFamily:'sans-serif',
        fontWeight:'700'
    },
    mainText:{
       color:'rgb(40, 133, 184)',
       fontSize:28,
       fontFamily:'sans-serif',
       fontWeight:'700',
       textAlign:'center'
    },
    entryFiledView:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
       marginTop:20,
       borderWidth:1.5,
       borderColor:'rgb(0, 151, 167)',
       width:300,
       left:50,
       marginBottom:15
    },
    textInputStyle:{
       color:'black',
       fontSize:18,
       alignItems:'center',
       justifyContent:'flex-start'
    },
    forgotView:{
       flexDirection:'row',
       justifyContent:'flex-end',
       marginBottom:10
    },
    forgotText:{
        fontSize:18,
        color:'rgb(40, 133, 184)',
        right:30,
        fontWeight:'600'
    },
    buttonStyle:{
      color:'white',
      backgroundColor:'green',
      fontSize:20,
      textAlign:'center',
      padding:10,
      marginTop:10,
      borderRadius:10,
      width:200,
      marginBottom:10
    },
    touchableStyle:{
      flexDirection:'column',
      alignItems:'center',
 
    },
    warningText:{
      color:'red',
      fontSize:15,
      textAlign:'center'
    },
    registerView:{
        flexDirection:'row',
        margin:10,
        alignItems:'center',
        justifyContent:'center'
    },
    registerText:{
        color:'rgb(40, 133, 184)',
        fontSize:20,
        marginLeft:5,
        fontWeight:'600'
    },
    noAccountText:{
        color:'darkslategrey',
        fontSize:20
    }
   })
   export default styles