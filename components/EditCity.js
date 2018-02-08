import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import _ from 'lodash';

class ListCity extends Component {


    getCountry = (code) => {
       /* console.log(countryCode);
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
        });*/

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
               <View style={{ flex: 1, flexDirection: 'row'}}>
               <View style={styles.deleteStyle}>
                    <Button 
                        title="Delete"
                        onPress={this.props.delete}
                    />
               </View>
               <View style={cityDetailsStyle}>
                        <Text style={cityNameStyle}>{name}</Text>
                        {this.getCountry(sys.country)}
                </View>
               </View>
                 
           </Card>
        );
    }
}

const styles = {
    cityDetailsStyle: {
        flexDirection: 'column',
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
    deleteStyle: {
        flex: 0.3
    }
};

export default ListCity;