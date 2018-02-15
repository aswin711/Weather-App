import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Image,
    ScrollView,
    Animated } from 'react-native';
import _ from 'lodash';
import WelcomeScreen from './WelcomeScreen';
import WeatherCard from '../components/WeatherCard';

class ForecastScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            scrollY: new Animated.Value(0)
        };
    }
    static navigationOptions = {
        header: null
    };

    renderDateRange = (list) => {
       const listLen = list.length;
       const startDate = list[0].date;
       const endDate = list[listLen - 1].date;
       const startDate_split = startDate.split("-");
       const endDate_split = endDate.split("-");
       const range = `${startDate_split[2]}/${startDate_split[1]} - ${endDate_split[2]}/${endDate_split[1]}`;
       return(
            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>{listLen} Days Forecast</Text>
                <Text style={styles.rangeText}>{range}</Text>
            </View>
       );
    }

    renderWeatherBlock = (item) => {
        return (
            <WeatherCard
                data={item}
            />
        );
       
    }

    render() {
        const HEADER_COLLAPSED_HEIGHT = 60;
        const HEADER_EXPANDED_HEIGHT = 350;
        const FOOTER_HEIGHT = 40;
        const HEADER_ELEVATION = 5;
        
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
        const footerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [FOOTER_HEIGHT, 0],
            extrapolate: 'clamp'
          });
        const headerElevation= this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, HEADER_ELEVATION],
            extrapolate: 'clamp'
          });

        const { params } = this.props.navigation.state;
        const { forecast } = params;
       console.log(forecast);
        return(
            <View style={{ flex: 1}}>
                <Animated.View style={{ height: headerHeight, opacity: headerTitleOpacity, elevation: headerElevation }}>
                    {this.renderDateRange(forecast)}
                </Animated.View>
                <ScrollView 
                    style={styles.container}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: { y: this.state.scrollY },
                        }}]
                    )}
                    scrollEventThrottle={16}
                >
                    {this.renderDateRange(forecast)}
                    <FlatList
                        data={forecast}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => this.renderWeatherBlock(item)}
                    />
                </ScrollView>
                <Animated.View style={{ alignItems: 'center', justifyContent: 'flex-end', height: footerHeight, opacity: heroTitleOpacity}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image 
                            style={styles.closeIcon}
                            source={require("../utils/img/ic_close.png")}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
           
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 20
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    titleText: {
        fontSize: 16,
        color: '#444444'
    },
    rangeText: {
        fontSize: 14,
        color: '#999999'
    },
    closeIcon: {
        height: 35,
        width: 35
    }
}

export default ForecastScreen;