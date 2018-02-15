import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import { code } from '../utils/country_code';

const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class ListCity extends Component {


   
    getCountry = (country_code) => {
        let countryName = "";
        code.map(country => {
            if (country.code === country_code){
                countryName = country.name;
            }
        });

        return countryName;
    }

    getWindDirection = (deg) => {
        if (deg < 45/2) {
            return 'E';
        }
        if (deg > 45/2 && deg < ( 45 + 45/2 ) ) {
            return 'NE';
        }
        if (deg > (45 + 45/2) && deg < (90 + 45/2 )){
            return 'N'
        }
        if (deg > (90 + 45/2) && deg < (135 + 45/2)){
            return 'NW';
        }
        if (deg > (135 + 45/2) && deg < (180 + 45/2)){
            return 'W';
        }
        if (deg > (180 + 45/2) && deg < (225 + 45/2)){
            return 'SW';
        }
        if (deg > (225 + 45/2) && deg < (270 + 45/2)){
            return 'S';
        }
        if (deg > (270 + 45/2) && deg < (315 + 45/2)){
            return 'SE';
        }
        if (deg > (315 + 45/2)){
            return 'E';
        }
    }

   

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

        const { theme } = this.props;
        const { main, name, sys, weather, wind } = this.props.data;
        const country = this.getCountry(sys.country);
        const temp = parseInt(main.temp);

        return(
            <View style={styles.card}>
                <View style={styles.cityStyle}>
                    <Text style={[styles.countryNameStyle,{ color: theme[0] }]}>{name}</Text>
                    <View style={styles.cityTempStyle}>
                        <Image 
                            style={styles.iconStyle}
                            source={{ uri: `${IMG_URL}${weather[0].icon}${IMG_EXT}`}}
                        />
                        <Text style={styles.tempStyle}>{temp}°</Text>
                    </View>
                    <Text style={styles.descriptionText}>{weather[0].description}</Text>
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

const styles = StyleSheet.create({
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
});

export default ListCity;