import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getWeatherByCityId } from '../actions';
import City from '../components/City';
import Forecast from '../components/Forecast';
import BottomTab from '../components/BottomTab';

class HomeScreen extends Component {
    componentDidMount(){
        this.props.getWeatherByCityId('1273874');
    }
    render() {
        return(
            <View style={styles.container}>
                <City 
                    data={this.props.data}
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

function mapStateToProps(state){
    return { data: state.home };
}

export default connect(mapStateToProps,{ getWeatherByCityId })(HomeScreen);