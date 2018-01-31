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
        this.fetchData();
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
        console.log(this.props.weather, this.props.forecast);
        if( Object.keys(this.props.weather).length !== 0){
            return(
                <View style={styles.container}>
                <ScrollView 
            
                    refreshControl={
                            <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            />
                    }
                  
                >
                    <City 
                        data={this.props.weather}
                    />
                </ScrollView>
                <BottomTab />
                </View>
            );
        } else {
            return <View/>;
        }
        
    }
}

const styles = {
    container: {
        flex: 1
    },
}

function mapStateToProps(state){
    return { weather: state.home.weather, forecast: state.home.forecast };
}

export default connect(mapStateToProps,{ getWeatherByCityId, getForecastByCityId} )(HomeScreen);