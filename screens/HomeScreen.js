import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    RefreshControl, 
    FlatList,
    ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import City from '../components/City';
import Forecast from '../components/Forecast';
import BottomTab from '../components/BottomTab';
import Slides from '../components/Slides';
import CustomScroll from '../components/CustomScroll';

const cities = [
    { cityId: '1273874' },
    { cityId: '1283710' },
    { cityId: '1269750' },
    { cityId: '1271231' }
];

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        };
    }

    static navigationOptions = {
        header: null
    };
    componentDidMount(){
        if (this.props.cities.length > 0){
            this.fetchData();
        } else {
            this.props.navigation.navigate('location');
        }
      
    }

     fetchData(){
         _.map(this.props.cities,city => {
             console.log(city);
            this.props.getWeatherByCityId(city.id);
            this.props.getForecastByCityId(city.id);
         });
         /* cities.map(city => {
            this.props.getWeatherByCityId(city.cityId);
            this.props.getForecastByCityId(city.cityId);
        }); */   
    }

    openCitiesScreen = () => {
        this.props.navigation.navigate('cities');
    }

    openForeCastScreen = () => {
        this.props.navigation.navigate('forecast',{forecast: this.props.data.forecast });
    }
   
    renderCity = (item) => {
        if (item.item.id > 0 ){
            return(
                <City 
                    data={item.item}
                    forecast={() => this.openForeCastScreen()}
                    navigation={this.props.navigation}
                />
            );
        } else {
            return <View/>;
        }
        
    }
    renderSlides(){
                return (
                    <FlatList
                        pagingEnabled
                        data={this.props.data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={item => this.renderCity(item)}
                       
                    />
                );
    }
    render() {
            return(
                <View style={styles.container}>
                    {this.renderSlides()}
                    <BottomTab 
                         add={ () => this.openCitiesScreen()}
                    />
                </View>
            );
        }
}

const styles = {
    container: {
        flex: 1
    },
}
function mapStateToProps(state){
    return { data: state.home, cities: state.city };
}

export default connect(mapStateToProps,actions)(HomeScreen);