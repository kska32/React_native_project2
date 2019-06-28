import React,{Component} from 'react';
import { connect } from 'react-redux';
import { View,Dimensions} from 'react-native';
import { Container, Content, Button, Text, Form, Item, Header,Grid,Col,Row,Input,Title } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import PT from "prop-types";
import {styles, uStyles} from "./Styles.js";
const Realm = require('realm');

export class Setting extends Component{
    constructor(props){
        super(props);
        this.state = {
            City:''
        }
    }

    componentDidMount() {
        Realm.open({
            schema: [{name: 'City', properties: {name: 'string'}}]
        }).then(realm => {
            realm.write(() => {
                let city = realm.objects('City');
                if(city.length===0){
                    realm.create('City', {name: 'Beijing'});
                }else{
                    this.setState({City:city[0].name});
                }    
            });
        }).catch((err)=>{
            console.log(err);
        })
    }

    saveBtHandle = ()=>{
        this.props.saveCityName(this.state.City);
        this.props.navigation.navigate("Home");
    }

    render(){
        const {City} = this.state;
        return <Container>
            <Content>
                <Grid style={{height:Dimensions.get('window').height-50}}>
                    <Row style={{justifyContent:'flex-end',alignItems:'center'}}>
                        <Button transparent onPress={()=>{this.props.navigation.navigate("Home")}}
                                    style={{right:0, width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center' }}>
                            <Icon name='close' style={{fontSize:46}} />
                        </Button>
                    </Row>
                    <Row style={{alignItems:'center'}}>
                        <Content contentContainerStyle={{justifyContent:'center',paddingLeft:50,paddingRight:50,borderRadius:10}}>
                            <View style={{marginBottom:5}}><Text style={{fontSize:16,fontWeight:'600'}}>Weather Location:</Text></View>
                            <Input placeholder="Enter Your City Name In English" value={City} onChangeText={(v)=>{this.setState({City:v})}} 
                                    style={{borderWidth:2,borderColor:'grey',borderStyle:'solid',marginBottom:20,borderRadius:10}}/> 
                            <Button full style={{borderRadius:10}} onPress={this.saveBtHandle}>
                                    <Text> Save </Text>
                            </Button>
                        </Content>
                    </Row>
                    <Row >
                        
                    </Row>
                </Grid>
               
            </Content>
        </Container>
    }
}

export default connect((gState,ownProps)=>{
    return {City:gState.City};
},(dispatch)=>{
return { 
    saveCityName: (cityName) => {
        dispatch({ type: 'SAVE_CITY_NAME', City:cityName});
    }
}
})(Setting);

