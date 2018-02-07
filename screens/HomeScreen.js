import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    RefreshControl, 
    FlatList,
    ActivityIndicator } from 'react-native';
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
       
            if (this.props.data.length > 2){
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
            } else {
                return <View/>;
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