import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { TabNavigator } from 'react-navigation';
import _ from 'lodash';
import WelcomeScreen from './WelcomeScreen';
const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class ForecastScreen extends Component {

    static navigationOptions = {
        header: null
    };

    renderBlock = (item) => {

        let condition = [];
        let data = item.item;
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

    renderDay = (index) => {
        if (index == 0){
            return 'Today';
        } else if (index == 1){
            return 'Tomorrow';
        } else {
            const date = new Date();
            const day = date.getDay();
            const dayAfterTmrw = (day + index) > 6 ? (day + index) -6 - 1 : (day + index) ;
            return this.renderDate(dayAfterTmrw);
        }
    }

    convert24To12 = (time) => {
        switch(time){
          case '00:00:00':
              return '12am';
          case '03:00:00':
              return '3am';
          case '06:00:00':
              return '6am';
          case '09:00:00':
              return '9am';
          case '12:00:00':
              return '12pm';
          case '15:00:00':
              return '3pm';
          case '18:00:00':
              return '6pm';
          case '21:00:00':
              return '9pm';
          default:
              return '12am';
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

        return day;
    }

    renderHours = (item) => {
        const details = `${item.wind.speed} m/s, ${item.main.pressure} hpa`;
        return (
            <View style={styles.hoursBlock}>
                <View style={styles.timeBlock}>
                    <Text style={styles.textStyle}>{this.convert24To12(item.time)}</Text>
                    <Image
                            resizeMode="cover"
                            style={styles.iconImage}
                            source={{ uri: `${IMG_URL}${item.weather.icon}${IMG_EXT}`}}
                        />
                </View>
                <View style={styles.hoursDetailBlock}>
                    <View style={styles.timeBlock}>
                        <Text style={styles.hoursTempText}>{item.main.temp}°</Text>
                        <Text style={styles.hoursDescriptionText}>{item.weather.description}</Text>
                    </View>
                    <Text style={styles.hoursDetailsText}>{details}</Text>
                </View>
            </View>
        );
    }

    renderDayBlock = (list) => {
        console.log(list);
        return (
            <Card
                title={this.renderDay(list.id)}
            >
            
                <FlatList
                    data={list.list}
                    keyExtractor={item => item.time}
                    renderItem={({item}) => this.renderHours(item)}
                />
                
            </Card>
        );
    }

    renderDateRange = (list) => {
       const listLen = list.length;
       const startDate = list[0].date;
       const endDate = list[listLen - 1].date;
       const startDate_split = startDate.split("-");
       const endDate_split = endDate.split("-");
       const range = `${startDate_split[2]}/${startDate_split[1]} - ${endDate_split[2]}/${endDate_split[1]}`;
       return(
        <View style={styles.titleStyle}>
        <Text style={styles.textStyle}>{listLen} Days Forecast</Text>
        <Text>{range}</Text>
        </View>
       );
    }

    render() {
        const { params } = this.props.navigation.state;
        const { forecast } = params;
        this.renderDateRange(forecast);
        return(
            <View style={styles.container}>
                {this.renderDateRange(forecast)}
                <FlatList
                    data={forecast}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => this.renderDayBlock(item)}
                />
            <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 20
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        elevation: 5,
        backgroundColor: '#f8f8f8'
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
        color: '#444444',
        fontWeight: '300',
        padding: 10
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
    },
    dayBlock: {
        backgroundColor: '#f8f8f8',
        borderColor: '#ddd',
        borderWidth: 0.5,
    },
    hoursBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10
    },
    timeBlock: {
        flexDirection: 'row',
    },
    hoursDetailBlock:{
        flexDirection: 'column',
    },
    hoursTempText: {
        fontSize: 16,
        color: '#444444',
        fontWeight: '200'
    },
    hoursDescriptionText: {
        fontSize: 16,
        color: '#999',
        fontStyle: 'italic',
        marginLeft: 5
    },
    hoursDetailsText: {
        fontSize :16,
        color: '#444444',
        fontWeight: '200'
    }
}

export default ForecastScreen;