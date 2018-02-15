import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    RefreshControl, 
    FlatList,
    ActivityIndicator,
    StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import City from '../components/City';
import CityList from '../components/CityList';
import Forecast from '../components/Forecast';
import BottomTab from '../components/BottomTab';
import { defaultTheme } from '../utils/theme';

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
            this.props.navigation.navigate('location',{theme: defaultTheme[0]});
        } else {
            this.props.addPendingData([]);
        }
    }

    
    render() {
            return(
                <View style={styles.container}>
                   <CityList 
                        navigation={this.props.navigation}
                   />
                </View>
            );
           
        }
}

const styles = StyleSheet.create({
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
});

function mapStateToProps(state){
    return { data: state.home, cities: state.city };
}

export default connect(mapStateToProps,actions)(HomeScreen);