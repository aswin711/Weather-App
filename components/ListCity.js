import React, { Component } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import _ from 'lodash';
import { code } from '../utils/country_code';

const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class ListCity extends Component {


    getCountry = (country_code) => {
        let countryName = "";
        code.map(country => {
            if (country.code === country_code){
                console.log(country);
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

        const { main, name, sys, weather, wind } = this.props.data;
        const country = this.getCountry(sys.country);
        const temp = parseInt(main.temp);
        console.log(country);

        return(
           <Card>
               <View style={{ flex: 1, flexDirection: 'column'}}>
               <View style={cityDetailsStyle}>
                    <View style={cityDescriptionStyle}>
                        <Text style={cityNameStyle}>{name}</Text>
                        <Text style={countryNameStyle}>{country}</Text>
                    </View>
                    <View style={cityTempStyle}>
                        <Image
                        style={styles.iconStyle}
                        source={{ uri: `${IMG_URL}${weather[0].icon}${IMG_EXT}`}}
                        />
                        <Text style={tempStyle}>{temp}°</Text>
                    </View>
                </View>
                <View style={ruleStyle}/>
                <View style={additionalDesStyle}>
                    <Text style={humidityInfoStyle}>
                    Humidity {main.humidity}% | {wind.speed} m/s | {this.getWindDirection(wind.deg)}</Text>
                    <Text style={tempRangeStyle}>{main.temp_min}°/{main.temp_max}°</Text>
                </View>

               </View>
                 
           </Card>
        );
    }
}

const styles = {
    cityDetailsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cityDescriptionStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cityTempStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityNameStyle: {
        fontSize: 25,
        color: '#222222'
    },
    countryNameStyle: {
        fontSize: 16,
        color: '#999999'
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
        height: 30,
        width: 30
    }
};

export default ListCity;