import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import { code } from '../utils/country_code';
import { getCountry } from '../utils/commonUtils';

class ListCity extends Component {


   /* getCountry = (country_code) => {
        let countryName = "";
        code.map(country => {
            if (country.code === country_code){
                countryName = country.name;
            }
        });

        return countryName;
    }*/

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
        const country = getCountry(sys.country);
        return(
           <Card style={{ elevation: 5 }}>
               <View style={{ flex: 1, flexDirection: 'row', height: 50}}>
               <View style={styles.deleteStyle}>
                   <TouchableOpacity
                    onPress={this.props.delete}
                   >
                       <Icon
                            name="md-remove-circle"
                            color="#c43a31"
                            size={30}
                            />
                   </TouchableOpacity>
               </View>
               <View style={cityDetailsStyle}>
                        <Text style={cityNameStyle}>{name}</Text>
                        <Text style={countryNameStyle}>{country}</Text>
                </View>
               </View>
                 
           </Card>
        );
    }
}

const styles = {
    cityDetailsStyle: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 15
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
        fontSize: 16,
        color: '#999999'
    },
    deleteStyle: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15
    }
};

export default ListCity;