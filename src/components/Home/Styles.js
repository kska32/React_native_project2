import { StyleSheet} from 'react-native';

export let uStyles = StyleSheet.create({
    border:{
        borderWidth: 1,
        borderColor: 'blue',
        borderStyle: 'solid',
        borderRadius: 5
    }
})

export let styles = StyleSheet.create({
    cityWrapper:{
        justifyContent:'center',
        alignItems: 'center'
    },
    cityText:{
        fontSize: 40,
        fontWeight: '700'
    },

    tempArea:{
        width: 240,
        flexDirection: 'row',
        alignItems: 'center',
        ...uStyles.border,
        borderRadius: 10,
        borderColor: '#000'
    },

    curTemp:{
        flex:5,
        justifyContent:'center',
        alignItems:'center'
    },
        curTempText:{
            fontSize: 52,
            letterSpacing: -3,
            fontWeight:'600'
        },

    rangeTemp:{
        flex:2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botTemp:{
        flex:1
    },
        botTempText:{
            fontWeight: '600',
        },
    topTemp:{
        fontWeight: '600',
        flex:1
    },
        topTempText:{
            fontWeight: '600',
        },
    
    others:{
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    othersDesc:{
        
    },
        othersDescText:{
            fontSize: 25,
            marginBottom: 5,
            fontWeight: '600'
        },
    
    othersHumidity:{

    },
        othersHumidityText:{
            fontSize: 20,
            marginBottom: 5,
            fontWeight: '600'
        },
    othersPressure:{

    },
        othersPressureText:{
            fontSize: 20,
            marginBottom: 5,
            fontWeight: '600'
        } 
})
