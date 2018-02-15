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
    TouchableOpacity,
    StyleSheet} from 'react-native';
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
import { SCREEN_WIDTH } from '../utils/deviceUtils';
import { IMG_URL, PNG_EXT, getBanner, getPlotPoints } from '../utils/commonUtils';

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

    renderContainer() {
        const HEADER_COLLAPSED_HEIGHT = 60;
        const HEADER_EXPANDED_HEIGHT = 350;
        
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
          });
          const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 60],
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
        const imUrl = `${IMG_URL}${weather[0].icon}${PNG_EXT}`;
        const theme = getBanner(this.props.data.id,this.props.home);
        const plotPoints = getPlotPoints(this.props.data.forecast.list,8);
        if (list !== 'undefined') {
            return(
    
                <View style={styles.container}>
                  
                    <Animated.View
                        style={[ styles.headerStyle , { height: headerHeight, opacity: headerTitleOpacity}]}
                    >
                            <View  style={styles.headerView}>
                                <Image
                                    style={styles.iconImage}
                                    source={{ uri: imUrl }} 
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
                            theme={theme}
                            city={ name }
                            temp={ parseInt(main.temp) }
                            status={ weather[0] }
                            navigation={ this.props.navigation }
                            plotPoints={plotPoints}
                        />
                        <Forecast 
                            data={ list }
                            theme={theme}
                            currentTemp={ main.temp }
                            forecast={ this.props.forecast }
                            navigation={ this.props.navigation }
                        />
                        <Details 
                            theme={theme}
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
         return(
             <View>
                  {this.renderContainer()}
             </View> 
         );
        
    } 
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
        width: SCREEN_WIDTH,
    },
    headerStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
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
});

function mapStateToProps(state){
    return {home: state.home};
}

export default connect(mapStateToProps,actions)(City);