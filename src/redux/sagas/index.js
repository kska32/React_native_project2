import { put, call, take, fork, takeEvery,takeLatest, select, all} from 'redux-saga/effects';

import axios from 'axios';
import day from 'dayjs';


function* getWeatherData(){
    yield takeLatest('GET_WEATHER_DATA', function*(action){
        //let res = yield call(axios.post,'https://sparrowapp-86b6a.firebaseapp.com/weather',{city:'seoul'});
                    //Cloud Functions for Firebase - getaddrinfo ENOTFOUND
                    //Because of Spark Plan which is free. it is not allow request to external.
        yield put({type:'REFRESH', isRefreshing: true});
        let {city} = yield select();
        if(city===undefined) city = action.city;  

        try{
            let res = yield call(axios.post,'http://10.0.2.2:5000/weather',{city:city});
            let rd = res.data;
            let finalData = {
                city: rd.name.toUpperCase(),
                temp: (Number(rd.main.temp)-273.15).toFixed(1),
                maxtemp: (Number(rd.main.temp_max)-273.15).toFixed(1),
                mintemp: (Number(rd.main.temp_min)-273.15).toFixed(1),
                humidity: String(rd.main.humidity),
                pressure: String(rd.main.pressure),
                desc: rd.weather[0].description,
                date: day(Number(rd.dt)*1000).format('YYYY/MM/DD'),
            }
            yield put({type:'REFRESH', isRefreshing: false});
            yield put({type:'UPDATE', wdata: finalData});
        }catch(err){
            yield put({type:'REFRESH', isRefreshing: false});
            yield put({type:'ERROR', error: "The city name is incorrect~!"});
        }
    });
}

function* saveCityName(){
    yield takeLatest('SAVE_CITY_NAME', function*(action){
            let realm = yield Realm.open({
                schema: [{name: 'City', properties: {name: 'string'}}]
            })
            realm.write(() => {
                let city = realm.objects('City');
                city[0].name = action.City;
            });
            let city = realm.objects('City');
            yield put({type:'UPDATE', wdata:{city:action.City}});
            alert("Saved...OK.")
    });
}



export function* rootSaga() {
    yield all([getWeatherData(),saveCityName()]);
}