import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Image, 
    FlatList} from 'react-native';
import _ from 'lodash';
const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class Forecast extends Component {


    openForeCastScreen = (list) => {
        this.props.navigation.navigate('forecast',{forecast: list});
    }

    getForecastReport = (forecast) => {
        let report = [];
        let count = 0;
        console.log(forecast.length);
        forecast.map((data,index_out) => {

            let dateTime = data.dt_txt;
            let split_dateTime = dateTime.split(" ");
            let date = split_dateTime[0];
            let time = split_dateTime[1];
            let split_date = date.split("-");
            let year = split_date[0];
            let mon = split_date[1];
            let day = split_date[2];


            if ( report.length > 0) {
                let f = 0;
                _.map(report, (reportData,index_inner) => {
                    if (reportData.date === date){
                        f = 1;
                        reportData.list.push({ time, main: data.main,weather: data.weather[0], wind: data.wind });
                    } 
                });
                if ( f === 0){
                    let list = [];
                    list.push({ time, main: data.main, weather: data.weather[0], wind: data.wind });
                    report.push({id: count++, date, list });
                }
            } else {
                let list = [];
                list.push({ time, main: data.main, weather: data.weather[0], wind: data.wind });
                report.push({id: count++, date, list });
            }
        });

        return report;
    }

    renderBlock = (item) => {

        let condition = [];
        let data = item.item;
        if (data.id < 3) {
            let temp_min = data.list[0].main.temp_min;
            let temp_max = data.list[0].main.temp_max;
            console.log(data);
    
            for ( let i = 0; i < data.list.length; i++ ){
                const slice = data.list[i];
                condition.push({ weather: slice.weather, wind: slice.wind});
                if (slice.main.temp_max > temp_max){
                    temp_max = slice.main.temp_max;
                }
                if (slice.main.temp_min < temp_min){
                    temp_min = slice.main.temp_min;
                }
            }
    
            
            temp_min = Math.round((temp_min + 0.00001) * 100 ) / 100 ;
            temp_max = Math.round((temp_max + 0.00001) * 100 ) / 100 ;
    
            return(
                <View style={styles.rowStyle}>
                 <View style={[ styles.singleRow,{ alignItems: 'flex-start'} ] }>
                 {this.renderDay(data.id)}
                 </View>
                    <View style={[styles.singleRow,{ alignItems: 'center'}]}>
                    <View style={styles.statusFrame}>
                        <Image
                            resizeMode="cover"
                            style={styles.iconImage}
                            source={{ uri: `${IMG_URL}${condition[0].weather.icon}${IMG_EXT}`}}
                        />
                        <Text style={styles.textStyle}>{condition[0].weather.main}</Text>
                    </View>
                    </View>
                    <View style={[styles.singleRow, {alignItems: 'flex-end'}]}>
                    <Text style={styles.textStyle}>{(temp_min)}°/{(temp_max)}°</Text>
                    </View> 
                   </View>
            );
        } 

        return <View />;
        
    }

    renderDay = (index) => {
        if (index == 0){
            return(
                <Text style={styles.textStyle}>Today</Text>
            );
        } else if (index == 1){
            return(
                <Text style={styles.textStyle}>Tommorrow</Text>
            );
        } else {
            const date = new Date();
            const day = date.getDay();
            const dayAfterTmrw = (day + index) > 6 ? (day + index) -6 - 1 : (day + index) ;
            return this.renderDate(dayAfterTmrw);
        }
    }

    renderDate = (num) => {
        
        let day = "";
        switch(num) {
            case 0: 
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
                break;
            default:
                day = "Today";
        }

        return (
            <Text style={styles.textStyle}>{day}</Text>
        );
    }

    render() {
        console.log(this.props.data);
        const list = this.getForecastReport(this.props.data);
        return(
            <View style={styles.container}>
               
               <FlatList
                    data={list}
                    keyExtractor={item => item.date}
                    renderItem={item => this.renderBlock(item)}
               />

               <TouchableOpacity
                    onPress={() => this.openForeCastScreen(list)} 
               >
                <View  style={styles.labelStyle}>
                <Text style={styles.forecastLabel}>5 Days Forecast</Text>
                </View>
                   
               </TouchableOpacity>

            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 10,   
    },
    singleRow:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 16,
        color: '#444444'
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#999999'
    },
    labelStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10   
    },
    labelTextStyle: {
        fontSize: 14,
        color: '#444444'
    },
    iconImage: {
        width: 50,
        height: 50
    },
    statusFrame: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forecastLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666'
    }
}

export default Forecast;