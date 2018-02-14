import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class Details extends Component {


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

    renderPressure = (pressure) => {
        return (
            <View style={styles.singlePropertyViewStyle}>
                <Image 
                    style={styles.imageIcon}
                    source={ require('../utils/img/ic_pressure.png')}
                    resizeMode="cover"
                />
                <Text style={styles.propertyValueStyle}>{parseInt(pressure)} hPa</Text>
            </View>
    );
    }

    renderWind = (wind) => {
        const text = `${wind.speed}m/s ${this.getWindDirection(parseInt(wind.deg))}`;
        return (
            <View style={styles.singlePropertyViewStyle}>
                 <Image 
                    style={styles.imageIcon}
                    source={ require('../utils/img/ic_wind.png')}
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
                    source={ require('../utils/img/ic_humidity.png')}
                    resizeMode="cover"
                />
                <Text style={styles.propertyValueStyle}>{humidity}%</Text>
            </View>
        );
    }

    render() {
        const { wind, pressure, uv, humidity } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.label}>Details</Text>
                <View style={styles.innerContainerStyle}>
                    <View style={styles.propertyViewStyle}>
                        {this.renderWind(wind)}
                        {this.renderPressure(pressure)}
                        {this.renderHumidity(humidity)}
                    </View>
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
        padding: 5,
        marginTop: 10
    },
    innerContainerStyle: {
        flexDirection: 'column',
        marginTop: 5,
        marginBottom:5
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
    propertyViewStyle: {
        flexDirection: 'row',
        padding: 5,
        flex: 0.5
    },
    singlePropertyViewStyle: {
        flexDirection: 'column',
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    
    },
    propertyNameStyle: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '200'
    },
    propertyValueStyle: {
        marginTop: 10
    },
    label: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '500'
    },
    imageIcon: {
        width: 35,
        height: 35
    }
}
export default Details;