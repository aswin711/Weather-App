import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import City from '../components/City';
import Forecast from '../components/Forecast';
import BottomTab from '../components/BottomTab';
import Slides from '../components/Slides';

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
        this.fetchData();
    }

     fetchData(){
          cities.map(city => {
            this.props.getWeatherByCityId(city.cityId);
            this.props.getForecastByCityId(city.cityId);
        });    
    }

    openCitiesScreen = () => {
        this.props.navigation.navigate('cities');
    }
   
    renderCity = (item) => {
        if (item.item.id > 0 ){
            console.log(item.item);
            return(
                <City 
                    data={item.item}
                   
                />
            );
        } else {
            console.log(item.item);
            return <View/>;
        }
        
    }
    renderSlides(){
        if(this.props.data) {
            console.log(this.props.data);
            return (
                <FlatList
                    pagingEnabled
                    data={this.props.data}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={item => this.renderCity(item)}
                />
            );
        }
       
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
    return { data: state.home };
}

export default connect(mapStateToProps,actions)(HomeScreen);