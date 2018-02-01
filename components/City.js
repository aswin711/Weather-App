import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Details from './Details';
import Forecast from './Forecast';
import Graph from './Graph';
import Label from './Label';

class City extends Component {

    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        };
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        this.props.getWeatherByCityId(this.props.cityId);
        this.props.getForecastByCityId(this.props.cityId);
    }

    onRefresh(){
        this.setState({ refreshing: true });
        this.onRefresh().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        if( Object.keys(this.props.weather).length !== 0){
            const { name, main, weather, wind, visibility } = this.props.weather;
        return(
           
            <ScrollView style={styles.container} 
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    />
             }>
                <Label 
                    city={ name }
                    temp={ main.temp }
                    status={ weather[0].main }
                />
                <Forecast />
                <Graph />
                <Details 
                    wind={ wind }
                    pressure={ main.pressure }
                    uv={ visibility }
                    humidity={ main.humidity }
                />
            </ScrollView>
            
        );
    } else {
        return <View/>;
    }
    }
}

const styles = {
    container: {
        flex: 1,
        paddingBottom: 75,
        marginBottom: 20
    },
}

function mapStateToProps(state){
    return { weather: state.home.weather, forecast: state.home.forecast };
}

export default connect(mapStateToProps,actions)(City);