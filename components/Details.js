import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getWindDirection } from '../utils/commonUtils';

class Details extends Component {


    renderPressure = (pressure) => {
        return (
            <View style={styles.singlePropertyViewStyle}>
                <Image 
                    style={styles.imageIcon}
                    source={ require('../utils/img/ic_pressure_white.png')}
                    resizeMode="cover"
                />
                <Text style={styles.propertyValueStyle}>{parseInt(pressure)} hPa</Text>
            </View>
    );
    }

    renderWind = (wind) => {
        const text = `${wind.speed}m/s ${getWindDirection(parseInt(wind.deg))}`;
        return (
            <View style={styles.singlePropertyViewStyle}>
                 <Image 
                    style={styles.imageIcon}
                    source={ require('../utils/img/ic_wind_white.png')}
                    resizeMode="cover"
                />
                <Text style={styles.propertyValueStyle}>{text}</Text>
            </View>
        );
    }

    renderHumidity = (humidity) => {
        return (
            <View style={styles.singlePropertyViewStyle}>
                 <Image 
                    style={styles.imageIcon}
                    source={ require('../utils/img/ic_humidity_white.png')}
                    resizeMode="cover"
                />
                <Text style={styles.propertyValueStyle}>{humidity}%</Text>
            </View>
        );
    }

    render() {
        const { wind, pressure, uv, humidity } = this.props;
        return(
            <LinearGradient colors={this.props.theme} style={styles.container}>
                <View style={styles.innerContainerStyle}>
                   
                   {this.renderWind(wind)}
                   {this.renderPressure(pressure)}
                   {this.renderHumidity(humidity)}
             
               </View>
            </LinearGradient>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
    },
    innerContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    detailsTextStyle: {
        fontSize: 12,
        color: 'white',
    },
    propertyViewStyle: {
        padding: 5,
        flex: 0.5
    },
    singlePropertyViewStyle: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    
    },
    propertyNameStyle: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '200',
        
    },
    propertyValueStyle: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 15,
        color: 'white',
        fontWeight: '100',
        justifyContent: 'center'
    },
    label: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '100'
    },
    imageIcon: {
        width: 35,
        height: 35
    }
}
export default Details;