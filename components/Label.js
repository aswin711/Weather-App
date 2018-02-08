import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class Label extends Component {
    render() {
        const { city, temp, status } = this.props;
        //30°
        return(
            <View style={styles.container}>
                <Image 
                    style={styles.imageStyle}
                    source={require('../utils/img/banner.png')}
                />
                <View style={styles.detailsStyle}>
                    <Text style={styles.smallTextStyle}>{ city }</Text>
                    <Text style={styles.largeTextStyle}>{ temp }°</Text>
                    <View style={styles.statusFrame}>
                    <Image
                        style={styles.iconImage}
                        source={{ uri: `${IMG_URL}${status.icon}${IMG_EXT}`}}
                    />
                    <Text style={styles.smallTextStyle}>{ status.main }</Text>
                    </View>
                    
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
       position: 'relative',
       height: 310,
    },
    imageStyle: {
        position: 'absolute',
        height: 310
    },
    detailsStyle: {
        position: 'absolute',
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    smallTextStyle: {
        fontSize: 16,
        color: 'white',
        marginLeft: 5
    },
    largeTextStyle: {
        fontSize: 60,
        color: 'white',
        fontWeight: '100'
    },
    iconImage: {
        width: 50,
        height: 50
    },
    statusFrame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default Label;