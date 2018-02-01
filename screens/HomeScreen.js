import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getWeatherByCityId, getForecastByCityId} from '../actions';
import City from '../components/City';
import Forecast from '../components/Forecast';
import BottomTab from '../components/BottomTab';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        };
    }
    componentDidMount(){
        //this.fetchData();
    }

    fetchData(){
        this.props.getWeatherByCityId('1273874');
        this.props.getForecastByCityId('1273874');
    }

    onRefresh(){
        this.setState({ refreshing: true });
        this.onRefresh().then(() => {
            this.setState({ refreshing: false });
        });
    }
    render() {
            return(
                <View style={styles.container}>
                    <City 
                        cityId='1273874'
                    />
                    <BottomTab />
                </View>
            );
        }
}

const styles = {
    container: {
        flex: 1
    },
}


export default HomeScreen;