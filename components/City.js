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
        this.fetchCity();
        this.setState({ refreshing: false });
    }

    get24HourForecast(){
        const { list } = this.props.data.forecast;
        const currentTime = Date.now() / 1000 ;
        const day = 24 * 3600 ;
        _.map(list, single => {
            const { dt, dt_txt, main, weather} = single;
            console.log(dt_txt,main.temp);
        });

    }

    renderGraph = (list) => {
        if (list.length > 0){
            return(
                <Graph 
                data={list.slice(0,6)}
            />
            );
        }
        return <View />;
       
    }

    render() {
        
           
        //console.log(this.props.data);
        //console.log(new Date().getMinutes() );
        //this.get24HourForecast();
        const { name, main, weather, wind, visibility } = this.props.data.weather;
        const { list } = this.props.data.forecast;
        if (list !== 'undefined') {
            return(
           
                <View 
                    style={styles.container}
                >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        />
                        
                 }>
                    <Label 
                        city={ name }
                        temp={ main.temp }
                        status={ weather[0] }
                    />
                    <Forecast 
                        data={ this.props.data.forecast }
                        currentTemp={ main.temp }
                        forecast={ this.props.forecast }
                        navigation={ this.props.navigation }
                    />
                   <Graph 
                    data={list.slice(0,6)}
                />
                    <Details 
                        wind={ wind }
                        pressure={ main.pressure }
                        uv={ visibility }
                        humidity={ main.humidity }
                    />
                </ScrollView>
                </View>
               
                
            );
        }
        return <View />
        
    } 
}

const styles = {
    container: {
       flex: 1,
        width: SCREEN_WIDTH,
    },
}


export default connect(null,actions)(City);