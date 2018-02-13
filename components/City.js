import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl, Dimensions, ToolbarAndroid, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
import Details from './Details';
import Forecast from './Forecast';
import Graph from './Graph';
import Label from './Label';

const SCREEN_WIDTH = Dimensions.get('window').width;
const THEME_COLOR = '#70BDC6';
class City extends Component {

    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            scrollY: new Animated.Value(0)
        };
    }
    
    fetchCity(){
    
       this.props.fetchData(this.props.data.id);
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchCity();
        this.setState({ refreshing: false });
    }

    get24HourForecast(){
        const { list } = this.props.data.forecast;
        _.map(list, single => {
            const { dt, dt_txt, main, weather} = single;
        });
    }

    
  convert24To12 = (time) => {
    switch(time){
      case '00:00':
          return '12am';
      case '03:00':
          return '3am';
      case '06:00':
          return '6am';
      case '09:00':
          return '9am';
      case '12:00':
          return '12pm';
      case '15:00':
          return '3pm';
      case '18:00':
          return '6pm';
      case '21:00':
          return '9pm';
      default:
          return '12am';
    }
  }

    getPlotPoints = () => {
        let plot = [];
        let list = this.props.data.forecast.list.slice(0,8);
        let low = 0;
        let high = 0;
        _.map(list,(value,index) => {
            let time = value.dt_txt.split(" ");
            let xlabel = time[1].substr(0,5);
            y_label = parseInt(value.main.temp);
            if ( low < y_label ) {
              low = y_label;
            }
            if ( high > y_label ){
              high = y_label;
            }
            plot.push({x: this.convert24To12(xlabel),y: y_label});
        });

        return { plot, domain: { y: [low-10, high-10 ]}, range: { y: [low-10, high-10 ]} };
    }

    renderContainer() {
        const HEADER_COLLAPSED_HEIGHT = 60;
        const HEADER_EXPANDED_HEIGHT = 300;
        
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
          });
          const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          });
          const heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
          });

        const { name, main, weather, wind, visibility } = this.props.data.weather;
        const { list } = this.props.data.forecast;
        if (list !== 'undefined') {
            return(
    
                <View style={styles.container}>
                    <Animated.View style={{ height: headerHeight, width: SCREEN_WIDTH,
                        backgroundColor: THEME_COLOR
                        }} >
                        <Animated.View
                            style={{ opacity: heroTitleOpacity}}
                        >
                        <Label 
                            city={ name }
                            temp={ main.temp }
                            status={ weather[0] }
                        />

                        </Animated.View>
                        <Animated.View
                            style={{ height: HEADER_COLLAPSED_HEIGHT, opacity: headerTitleOpacity}}
                        />
                    </Animated.View>
                    <ScrollView
                     horizontal={false}
                     refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        />
                        
                    }
                     onScroll={Animated.event(
                         [{ nativeEvent: {
                             contentOffset: { y: this.state.scrollY },
                         }}]
                     )}
                     scrollEventThrottle={16}
                    >
                        <Forecast 
                            data={ list }
                            currentTemp={ main.temp }
                            forecast={ this.props.forecast }
                            navigation={ this.props.navigation }
                        />
                        <Graph 
                            title="24 Hours Forecast"
                            data={this.getPlotPoints()}
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
}

    render() {  
        const HEADER_HEIGHT = 300;
         return(
             <View>
                  {this.renderContainer()}
             </View> 
         );
        
    } 
}

const styles = {
    container: {
       flex: 1,
        width: SCREEN_WIDTH,
    },
    headerStyle: {
        backgroundColor: THEME_COLOR
    }
}


export default connect(null,actions)(City);