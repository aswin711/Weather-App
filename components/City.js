import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import Details from './Details';
import Forecast from './Forecast';
import Graph from './Graph';
import Label from './Label';

const SCREEN_WIDTH = Dimensions.get('window').width;

class City extends Component {

    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        };
    }

    componentDidMount(){
        //this.fetchData();
    }
    

    fetchCity(){
        this.props.getWeatherByCityId(this.props.data.id);
        this.props.getForecastByCityId(this.props.data.id);
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchCity().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        
           
        console.log(this.props.data);
        const { name, main, weather, wind, visibility } = this.props.data.weather;
        return(
           
            <ScrollView style={styles.container} 
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    />
             }>
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
        width: SCREEN_WIDTH,
        marginBottom: 20
    },
}


export default connect(null,actions)(City);