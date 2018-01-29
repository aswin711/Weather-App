import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

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
                    <Text style={styles.smallTextStyle}>{ status }</Text>
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
        flexDirection: 'column'
    },
    smallTextStyle: {
        fontSize: 16,
        color: 'white'
    },
    largeTextStyle: {
        fontSize: 35,
        color: 'white'
    }
}

export default Label;