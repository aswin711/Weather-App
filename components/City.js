import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import Details from './Details';
import Forecast from './Forecast';
import Graph from './Graph';
import Label from './Label';

class City extends Component {
    render() {
        const { weather, main, visibility, wind, name } = this.props.data;
        console.log( weather,main,visibility,wind,name);
        return(
            <ScrollView style={styles.container} >
                <Label 
                    city={ name }
                    temp={ main.temp }
                    status={ weather[0].main }
                />
                <Forecast />
                <Graph />
                <Details 
                    wind={ wind }
                    pressure={ main.pressure }
                    uv={ visibility }
                    humidity={ main.humidity }
                />
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingBottom: 75,
        marginBottom: 20
    },
}

export default City;