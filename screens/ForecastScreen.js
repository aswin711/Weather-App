import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Image,
    ScrollView,
    Animated, 
    StyleSheet} from 'react-native';
import _ from 'lodash';
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

    renderHeader = (list) => {
        const listLen = list.length;
        const startDate = list[0].date;
        const endDate = list[listLen - 1].date;
        const startDate_split = startDate.split("-");
        const endDate_split = endDate.split("-");
        const range = `${startDate_split[2]}/${startDate_split[1]} - ${endDate_split[2]}/${endDate_split[1]}`;
        return(
             <View style={styles.headerStyle}>
                 <Text style={styles.headerText}>{listLen} Days Forecast</Text>
                 <Text style={styles.headerRangeText}>{range}</Text>
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
        const { forecast, theme } = params;
       console.log(forecast);
        return(
            <View style={{ flex: 1}}>
                <Animated.View style={{ height: headerHeight, opacity: headerTitleOpacity, elevation: headerElevation, backgroundColor: theme[0] }}>
                    {this.renderHeader(forecast)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 20
    },
    titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    titleText: {
        fontSize: 20,
        color: '#444444'
    },
    rangeText: {
        fontSize: 16,
        color: '#999999'
    },
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    headerText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '300'
    },
    headerRangeText: {
        fontSize: 14,
        color: 'white'
    },
    closeIcon: {
        height: 35,
        width: 35
    }
});

export default ForecastScreen;