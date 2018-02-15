import React, { Component } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import { code } from '../utils/country_code';
import { IMG_URL, PNG_EXT, getWeekDay } from '../utils/commonUtils';
import { getBannerColor } from '../utils/theme';

class WeatherCard extends Component {
   

    render() {
        const { cityDetailsStyle,
            cityDescriptionStyle,
            cityNameStyle,
            cityTempStyle,
            countryNameStyle,
            tempStyle,
            ruleStyle,
            additionalDesStyle,
            humidityInfoStyle,
            tempRangeStyle   } = styles;

        
        const { id, date, list} = this.props.data;
        const theme = getBannerColor(id);
        const { main, time, weather, wind } = list[0];
        const temp = parseInt(main.temp);
        const day = getWeekDay(id);
        const imgUrl = `${IMG_URL}${weather.icon}${PNG_EXT}`;
        return(
            <View style={styles.card}>
                <View style={styles.cityStyle}>
                    <Text style={[styles.countryNameStyle,{ color: theme[0] }]}>{day}</Text>
                    <View style={styles.cityTempStyle}>
                        <Image 
                            style={styles.iconStyle}
                            source={{ uri: imgUrl }}
                        />
                        <Text style={styles.tempStyle}>{temp}°</Text>
                    </View>
                    <Text style={styles.descriptionText}>{weather.description}</Text>
                </View>
                    <LinearGradient colors={theme} style={styles.cityDescriptionStyle}>
                        <View style={styles.cityTempStyle}>
                            <Image 
                                style={styles.smallIcon}
                                source={require('../utils/img/ic_wind_white.png')}
                            />
                            <Text style={styles.detailsText} >{wind.speed} m/s</Text>
                        </View>
                        <View style={styles.cityTempStyle}>
                            <Image 
                                    style={styles.smallIcon}
                                    source={require('../utils/img/ic_pressure_white.png')}
                            />
                            <Text style={styles.detailsText} >{parseInt(main.pressure)} hPa</Text>
                        </View>
                        <View style={styles.cityTempStyle}>
                            <Image 
                                    style={styles.smallIcon}
                                    source={require('../utils/img/ic_humidity_white.png')}
                            />
                            <Text style={styles.detailsText} >{main.humidity}%</Text>
                        </View>
                    </LinearGradient>
            </View>
        );
    }
}

const styles = {
    card: {
        flexDirection: 'row',
        flex: 1,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
        height: 180,
        margin: 20
    },
    cityStyle: {
        flexDirection: 'column',
        flex: 0.65,
        padding: 10
    },
    cityDescriptionStyle: {
        flex: 0.35,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5
    },
    cityTempStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 15,
    },
    cityNameStyle: {
        fontSize: 25,
        color: '#222222',
    },
    countryNameStyle: {
        fontSize: 20,
        marginLeft: 10
    },
    tempStyle: {
        fontSize: 35,
        color: '#666666'
    },
    ruleStyle:{
        height: 1,
        backgroundColor: '#f2f2f2',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    additionalDesStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10
    },
    humidityInfoStyle: {
        justifyContent: 'flex-start'
    },
    tempRangeStyle: {
        justifyContent: 'flex-end'
    },
    iconStyle: {
        height: 60,
        width: 60
    },
    detailsText: {
        fontSize: 16,
        fontWeight: '300',
        color: 'white',
        marginLeft: 8
    },
    smallIcon: {
        height: 35,
        width: 35
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '100',
        color: '#666666',
        fontStyle: 'italic',
        marginTop: 5,
        marginLeft: 10
    }
};

export default WeatherCard;