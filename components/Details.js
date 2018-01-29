import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Details extends Component {
    render() {
        const { wind, pressure, uv, humidity } = this.props;
        return(
            <View style={styles.container}>
                <Text>Details</Text>
                <View style={styles.innerContainerStyle}>
                    <View style={styles.propertyViewStyle}>
                        <View style={styles.singlePropertyViewStyle}>
                            <Text style={styles.propertyNameStyle}>WIND</Text>
                            <Text style={styles.propertyValueStyle}>{ wind.speed }m/s, { wind.deg}°</Text>
                        </View>
                        <View style={styles.singlePropertyViewStyle}>
                        <Text style={styles.propertyNameStyle}>PRESSURE</Text>
                        <Text style={styles.propertyValueStyle}>{ pressure }hPa</Text>
                    </View>
                    </View>
                    <View style={styles.propertyViewStyle}>
                        <View style={styles.singlePropertyViewStyle}>
                            <Text style={styles.propertyNameStyle}>UV INDEX</Text>
                            <Text style={styles.propertyValueStyle}>{ uv }m</Text>
                        </View>
                        <View style={styles.singlePropertyViewStyle}>
                        <Text style={styles.propertyNameStyle}>HUMIDITY</Text>
                        <Text style={styles.propertyValueStyle}>{ humidity }%</Text>
                    </View>
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
        marginTop: 10
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
        borderWidth: 0.5,
        padding: 5,
        borderColor: '#e1e1e1'
    },
    propertyNameStyle: {
        fontSize: 12,
        color: '#d1d1d1'
    },
    propertyValueStyle: {
        fontSize: 13,
        color: '#222222'
    }
}
export default Details;