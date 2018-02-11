import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import _ from 'lodash';
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
        const { params } = this.props.navigation.state;
        const { forecast } = params;
        return(
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                <Text style={styles.textStyle}>5 Days Forecast</Text>
                <Text>2/6 - 2/10</Text>
                </View>
                <FlatList
                    data={forecast}
                    keyExtractor={item => item.id}
                    renderItem={item => this.renderBlock(item)}
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
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center'
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

export default ForecastScreen;