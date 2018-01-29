import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Forecast extends Component {
    render() {
        return(
            <View style={styles.container}>

               <View style={styles.rowStyle}>
                <Text style={styles.textStyle}>Yesterday</Text>
                <Text style={styles.textStyle}>Clear</Text>
                <Text style={styles.textStyle}>31/22</Text>
               </View>
               <View style={styles.lineStyle} />

               <View style={styles.rowStyle}>
                <Text style={styles.textStyle}>Yesterday</Text>
                <Text style={styles.textStyle}>Clear</Text>
                <Text style={styles.textStyle}>31/22</Text>
               </View>
               <View style={styles.lineStyle} />

               <View style={styles.rowStyle}>
                <Text style={styles.textStyle}>Yesterday</Text>
                <Text style={styles.textStyle}>Clear</Text>
                <Text style={styles.textStyle}>31/22</Text>
               </View>
               <View style={styles.lineStyle} />

               <View style={styles.labelStyle}>
                    <Text style={styles.labelTextStyle}>5 Days Forecast</Text>
               </View>

            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5,
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 10
    },
    textStyle: {
        fontSize: 16,
        flex: 1,
        color: '#444444',
        padding: 5
    },
    lineStyle: {
        height: 0.5,
        backgroundColor: '#e1e1e1'
    },
    labelStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10   
    },
    labelTextStyle: {
        fontSize: 14,
        color: '#444444'
    }
}

export default Forecast;