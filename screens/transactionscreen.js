import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hascamerapermissions:null,
            scanned:false,
            scanneddata:'',

        }    }
getcamerapermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
        hascamerapermissions:status==="granted",
        buttonstate:'clicked',
        scanned:false
    });
}
handleBarCodeScanned=async({type,data})=>{
    this.setState({
        scanned:true,
        scanneddata:data,
        buttonstate:'normal'
    });
}
    render(){
        const hascamerapermissions=this.state.hascamerapermissions;
        const scanned=this.state.scanned;
        const buttonstate=this.state.buttonstate;
        if(buttonstate==="clicked" && hascamerapermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            );
        }
        else if(buttonstate==="normal"){
            return(
            <View style={styles.container}>
                <Text style={styles.displaytext}>{
                hascamerapermissions===true?this.state.scanneddata:"request camera permissions"}</Text>
        
          
        <TouchableOpacity onPress={this.getcamerapermissions}style={styles.scanbutton}><Text style={styles.buttontext}>Scan QR code</Text></TouchableOpacity>
            </View>
        );
    }
}
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displaytext:{
        fontSize:15
    },
    scanbutton:{
        backgroundColor:'#2196F3',
        padding:10,
        margin:10
    }
})