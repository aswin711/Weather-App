import React, { Component } from 'react';
import { 
    ScrollView, 
    Text, 
    View, 
    RefreshControl, 
    Dimensions, 
    ToolbarAndroid, 
    Animated,
    Image, 
    TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import * as actions from '../actions';
import Details from './Details';
import Forecast from './Forecast';
import Graph from './Graph';
import Label from './Label';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const THEME_COLOR = '#70BDC6';
const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
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

    getCityIndex = (cityId) => {
        let pos = 0;
        this.props.home.map((city,index) => {
            if(city.id === cityId){
                pos = index;
            }
        });
        return pos;
    }

    getBanner = (id) => {
        switch(this.getCityIndex(id)){
            case 0:
                return colors.moonPurple;
            case 1:
                return colors.shifter;
            case 2:
                return colors.quepal;
            case 3:
                return colors.orangeFun;
            default:
                return colors.moonPurple;
        }
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
        let weather = [];
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
            weather.push(value.weather[0]);
        });

        const scale = parseInt( (high - low ) / 4 );

        return { plot, domain: { y: [low-10, high-10 ]}, range: { y: [low-10, high-10 ]}, scale, weather };
    }

    renderContainer() {
        const HEADER_COLLAPSED_HEIGHT = 60;
        const HEADER_EXPANDED_HEIGHT = 350;
        
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
          });
          const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          });
          const heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
          });

        const { name, main, weather, wind, visibility } = this.props.data.weather;
        const { list } = this.props.data.forecast;
        const headerText = `${name} ${parseInt(main.temp)}°`;
       
        if (list !== 'undefined') {
            return(
    
                <View style={styles.container}>
                  
                    <Animated.View
                        style={[ styles.headerStyle , { height: headerHeight, opacity: headerTitleOpacity}]}
                    >
                            <View  style={styles.headerView}>
                                <Image
                                style={styles.iconImage}
                                source={{ uri: `${IMG_URL}${weather[0].icon}${IMG_EXT}`}} 
                                />
                                <Text style={styles.headerText}>{headerText}</Text>
                            </View>
                    
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
                     <Label 
                            height={HEADER_EXPANDED_HEIGHT}
                            theme={this.getBanner(this.props.data.id)}
                            city={ name }
                            temp={ parseInt(main.temp) }
                            status={ weather[0] }
                            navigation={ this.props.navigation }
                            plotPoints={this.getPlotPoints()}
                        />
                        <Forecast 
                            data={ list }
                            currentTemp={ main.temp }
                            forecast={ this.props.forecast }
                            navigation={ this.props.navigation }
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
        flexDirection: 'row',
        backgroundColor: '#f5f7fa',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    headerText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#444',
        justifyContent: 'center',
        fontWeight: '300'
    },
    menuView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 10
    }
}

function mapStateToProps(state){
    return {home: state.home};
}

export default connect(mapStateToProps,actions)(City);