import React,{Component} from 'react';
import { connect } from 'react-redux';
import { View,Dimensions,ScrollView,RefreshControl} from 'react-native';
import { Container, Content, Button, Text,Grid,Col,Row } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import PT from "prop-types";
import {styles} from "./Styles.js";


export class Home extends Component{
    static propTypes={
        city: PT.string,
        temp: PT.string,
        maxtemp: PT.string,
        mintemp: PT.string,
        desc: PT.string,
        humidity: PT.string,
        pressure: PT.string,
        date: PT.string,
        isRefreshing: PT.bool
    }

    constructor(props){
        super(props);
        this.state = {
                refreshing:false
        }
    }

    componentDidMount(){
        if(!this.props.date){
            Realm.open({
                schema: [{name: 'City', properties: {name: 'string'}}]
            }).then(realm => {
                realm.write(() => {
                    let city = realm.objects('City');
                    if(city.length>0){
                        //realm.create('City', {name: 'Beijing'});
                        this.props.getWeatherData(city[0].name);
                    }else{
                        this.props.getWeatherData();
                    }    
                });
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

     refreshHandle = ()=>{
        this.props.getWeatherData();
    }

    render(){
        const {city,temp,maxtemp,mintemp,desc,humidity,pressure,date,isRefreshing} = this.props;
        return <Container style={{backgroundColor:'red'}}>
            <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing} 
                            onRefresh={this.refreshHandle}
                        />
            }>
            {
            !!this.props.date && (<Grid style={{height:Dimensions.get('window').height-50}}>
                    <Row style={{height: 60,justifyContent:'flex-end'}}>
                        <Button transparent onPress={()=>{this.props.navigation.navigate("Setting")}}
                            style={{ width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center' }}>
                            <Icon name='gear' style={{fontSize:46}} />
                        </Button>
                    </Row>
                    <Row style={styles.cityWrapper}>     
                            <Text style={styles.cityText}>{city}</Text>
                    </Row>
                    <Row style={{height:160, justifyContent:'center', alignItems:'center'}}>
                            <View style={styles.tempArea}>
                                <View style={styles.curTemp}><Text style={styles.curTempText}>{temp}°C</Text></View>
                                <View style={styles.rangeTemp}>
                                    <View style={styles.topTemp}><Text style={styles.topTempText}>{maxtemp}°C</Text></View>
                                    <View style={styles.botTemp}><Text style={styles.botTempText}>{mintemp}°C</Text></View>
                                </View>
                            </View>
                    </Row>
                    <Row style={{  justifyContent:'center', alignItems:'center'}}>
                        <View style={ styles.others}>
                            <View style={styles.othersDesc}><Text style={styles.othersDescText}>{desc}</Text></View>
                            <View style={styles.othersHumidity}><Text style={styles.othersHumidityText}>습도:{humidity}%</Text></View>
                            <View style={styles.othersPressure}><Text style={styles.othersPressureText}>기압:{pressure}hPa</Text></View>
                        </View>
                    </Row>
                    <Row style={{  alignItems:'flex-end',justifyContent:'center'}}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:36,fontWeight:'400',}}>{date}</Text>
                        </View>
                    </Row>
                    <Row style={{ }}>

                    </Row>
                </Grid>)
            }
            </ScrollView>
        </Container>
    }
}

export default connect((gState,ownProps)=>{
        const {city,temp,maxtemp,mintemp,desc,humidity,pressure,date,isRefreshing} = gState;
        return {city,temp,maxtemp,mintemp,desc,humidity,pressure,date,isRefreshing};
    },(dispatch)=>{
        return { 
            getWeatherData: (city='seoul') => {
                dispatch({ type:'GET_WEATHER_DATA', city:city });
            }
        }
    })(Home);