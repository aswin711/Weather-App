import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';
import _ from 'lodash';
import { countryCode } from '../utils/countrycode.json';

class ListCity extends Component {


    getCountry = (code) => {
        console.log(countryCode);
        _.map(countryCode, country => {
           
            if ( country.code === code ){
                return (
                    <Text 
                        style={this.styles.countryNameStyle}
                    >
                    {country.name}
                    </Text>
                );
            }
        });

        return (
            <Text 
                
            >
            {code}
            </Text>
        );
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

        const { main, name, sys} = this.props.data;

        return(
           <Card>
               <View style={{ flex: 1, flexDirection: 'column'}}>
               <View style={cityDetailsStyle}>
                    <View style={cityDescriptionStyle}>
                        <Text style={cityNameStyle}>{name}</Text>
                        {this.getCountry(sys.country)}
                    </View>
                    <View style={cityTempStyle}>
                        <Text style={tempStyle}>{main.temp}°</Text>
                    </View>
                </View>
                <View style={ruleStyle}/>
                <View style={additionalDesStyle}>
                    <Text style={humidityInfoStyle}>{main.humidity}</Text>
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    cityNameStyle: {
        fontSize: 25,
        color: '#222222'
    },
    countryNameStyle: {
        fontSize: 20,
        color: '#444444'
    },
    tempStyle: {
        fontSize: 35,
        color: '#222222'
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
    }
};

export default ListCity;