import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    RefreshControl, 
    FlatList,
    ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import City from '../components/City';
import CityList from '../components/CityList';
import Forecast from '../components/Forecast';
import BottomTab from '../components/BottomTab';
import Slides from '../components/Slides';
import CustomScroll from '../components/CustomScroll';
const THEME_COLOR = '#70BDC6';
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
        if (this.props.cities.length === 0){
            this.props.navigation.navigate('location',{theme: THEME_COLOR});
        } else {
            this.props.addPendingData([]);
        }
    }

     fetchData(){
         _.map(this.props.cities,city => {
           this.props.fetchData(city.id);
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
        }
    }
    renderEmptyComponent = () => {
        return(
            <View style={styles.container }>
                <Text style={styles.emptyText}>No cities added yet!!!</Text>
            </View>
        );
    }
    renderSlides(){
                return (
                    <FlatList
                        pagingEnabled
                        data={this.props.data}
                        horizontal
                        alwaysBounceVertical={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={this.renderEmptyComponent()}
                        keyExtractor={item => item.id}
                        renderItem={item => this.renderCity(item)}
                       
                    />
                );
    }
    render() {
        console.log(this.props.data);
            return(
                <View style={styles.container}>
                   <CityList 
                        navigation={this.props.navigation}
                   />
                </View>
            );
        }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 18,
        color: '#999999',
        fontWeight: "300"
    }
}
function mapStateToProps(state){
    return { data: state.home, cities: state.city };
}

export default connect(mapStateToProps,actions)(HomeScreen);